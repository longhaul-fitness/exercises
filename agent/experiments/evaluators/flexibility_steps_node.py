import json
import os
import sys
from typing import Any, Dict, List, Optional

# Add the src directory to the Python path
sys.path.append(os.path.join(os.path.dirname(__file__), "../../src"))
sys.path.append(os.path.join(os.path.dirname(__file__), "../utils"))

import litellm
from experiment_utils import (find_latest_files, load_json_data,
                              save_evaluation_results)
from scoring import calculate_semantic_step_metrics


class EmbeddingClient:
    """Simple embedding client using litellm."""

    def __init__(self, model: str = "bedrock/amazon.titan-embed-text-v2:0"):
        self.model = model

    def get_embedding(self, text: str) -> List[float]:
        """Get embedding for a text string."""
        response = litellm.embedding(model=self.model, input=[text])
        return response.data[0].embedding


def evaluate_results(
    results: List[Dict[str, Any]],
    embedding_client: EmbeddingClient,
    threshold: float = 0.5,
) -> List[Dict[str, Any]]:
    """Evaluate results using semantic step matching."""
    evaluated_results = []

    for result in results:
        if not result["success"]:
            # Skip failed results
            evaluated_results.append(
                {
                    **result,
                    "evaluation": {
                        "f1_score": 0.0,
                        "precision": 0.0,
                        "recall": 0.0,
                        "matched_pairs": 0,
                        "total_expected": 0,
                        "total_actual": 0,
                        "avg_match_similarity": 0.0,
                        "error": "Original execution failed",
                    },
                }
            )
            continue

        expected = result["output"]["expected"]
        actual = result["output"]["actual"]

        if actual is None:
            evaluated_results.append(
                {
                    **result,
                    "evaluation": {
                        "f1_score": 0.0,
                        "precision": 0.0,
                        "recall": 0.0,
                        "matched_pairs": 0,
                        "total_expected": len(expected) if expected else 0,
                        "total_actual": 0,
                        "avg_match_similarity": 0.0,
                        "error": "No actual output to evaluate",
                    },
                }
            )
            continue

        try:
            # Ensure we have lists of strings
            expected_steps = expected if isinstance(expected, list) else []
            actual_steps = actual if isinstance(actual, list) else []

            # Filter out empty strings
            expected_steps = [step for step in expected_steps if step and step.strip()]
            actual_steps = [step for step in actual_steps if step and step.strip()]

            # Calculate semantic step metrics
            metrics = calculate_semantic_step_metrics(
                expected_steps=expected_steps,
                actual_steps=actual_steps,
                embedding_client=embedding_client,
                threshold=threshold,
            )

            evaluated_results.append(
                {
                    **result,
                    "evaluation": {
                        "f1_score": metrics.f1,
                        "precision": metrics.precision,
                        "recall": metrics.recall,
                        "matched_pairs": metrics.matched_pairs,
                        "total_expected": metrics.total_expected,
                        "total_actual": metrics.total_actual,
                        "avg_match_similarity": metrics.avg_match_similarity,
                        "error": None,
                    },
                }
            )

        except Exception as e:
            evaluated_results.append(
                {
                    **result,
                    "evaluation": {
                        "f1_score": 0.0,
                        "precision": 0.0,
                        "recall": 0.0,
                        "matched_pairs": 0,
                        "total_expected": len(expected) if expected else 0,
                        "total_actual": len(actual) if actual else 0,
                        "avg_match_similarity": 0.0,
                        "error": f"Evaluation error: {str(e)}",
                    },
                }
            )

    return evaluated_results


def run_flexibility_steps_evaluator(
    test_case_id: Optional[str] = None,
    input_path: Optional[str] = None,
    embedding_model: str = "bedrock/amazon.titan-embed-text-v2:0",
    threshold: float = 0.5,
) -> List[Dict[str, Any]]:
    """
    Evaluate FlexibilityStepsNode results using semantic step matching.

    Args:
        test_case_id: Specific test case UUID to evaluate. If None, evaluates all.
        input_path: Path to specific results JSON file. If None, finds files automatically.
        embedding_model: Model to use for generating embeddings.
        threshold: Minimum similarity score to consider a valid match.

    Returns:
        List of evaluated result dictionaries with added evaluation metrics.
    """
    # Load results
    if input_path:
        # Load specific results file
        results = load_json_data(input_path)
        source_filename = input_path
    else:
        # Find and load matching results files
        results_files = find_latest_files(
            "flexibility_steps_node", "runs", test_case_id
        )
        if not results_files:
            raise ValueError("No results files found matching the criteria")

        # Load the most recent file
        source_filename = results_files[0]
        results = load_json_data(source_filename)
        print(f"Loaded results from: {source_filename}")

    # Filter results by test_case_id if specified
    if test_case_id:
        results = [r for r in results if r["test_case_id"] == test_case_id]

    if not results:
        raise ValueError("No results found matching the specified criteria")

    # Initialize embedding client
    embedding_client = EmbeddingClient(model=embedding_model)

    # Evaluate results
    evaluated_results = evaluate_results(results, embedding_client, threshold)

    return evaluated_results, source_filename


def main():
    """CLI interface for running the flexibility steps node evaluator."""
    import argparse

    parser = argparse.ArgumentParser(
        description="Evaluate FlexibilityStepsNode results"
    )
    parser.add_argument(
        "--test-case-id", type=str, help="Specific test case UUID to evaluate"
    )
    parser.add_argument(
        "--input-path", type=str, help="Path to specific runner results JSON file"
    )
    parser.add_argument(
        "--embedding-model",
        type=str,
        default="bedrock/amazon.titan-embed-text-v2:0",
        help="Model to use for embeddings",
    )
    parser.add_argument(
        "--threshold",
        type=float,
        default=0.5,
        help="Minimum similarity score to consider a valid match",
    )
    parser.add_argument(
        "--output", type=str, help="Output file for evaluation results (JSON)"
    )
    parser.add_argument(
        "--stdout", action="store_true", help="Output results to stdout instead of file"
    )

    args = parser.parse_args()

    # Run the evaluation
    evaluated_results, source_filename = run_flexibility_steps_evaluator(
        test_case_id=args.test_case_id,
        input_path=args.input_path,
        embedding_model=args.embedding_model,
        threshold=args.threshold,
    )

    # Handle output
    if args.stdout:
        # Output directly to stdout
        print(json.dumps(evaluated_results, indent=2))
    elif args.output:
        # Use custom output path
        with open(args.output, "w") as f:
            json.dump(evaluated_results, f, indent=2)
        print(f"Evaluation results saved to {args.output}")
    else:
        # Use default results directory structure
        filepath = save_evaluation_results(
            evaluated_results, source_filename, "flexibility_steps_node"
        )
        print(f"Evaluation results saved to {filepath}")

    # Print summary to console (only if not outputting to stdout)
    if not args.stdout:
        successful_evals = [
            r for r in evaluated_results if r["evaluation"]["error"] is None
        ]
        if successful_evals:
            avg_f1 = sum(r["evaluation"]["f1_score"] for r in successful_evals) / len(
                successful_evals
            )
            avg_precision = sum(
                r["evaluation"]["precision"] for r in successful_evals
            ) / len(successful_evals)
            avg_recall = sum(r["evaluation"]["recall"] for r in successful_evals) / len(
                successful_evals
            )
            avg_match_sim = sum(
                r["evaluation"]["avg_match_similarity"] for r in successful_evals
            ) / len(successful_evals)

            total_matches = sum(
                r["evaluation"]["matched_pairs"] for r in successful_evals
            )
            total_expected = sum(
                r["evaluation"]["total_expected"] for r in successful_evals
            )
            total_actual = sum(
                r["evaluation"]["total_actual"] for r in successful_evals
            )

            print(f"\nEvaluated {len(evaluated_results)} results")
            print(f"Successful evaluations: {len(successful_evals)}")
            print(
                f"Failed evaluations: {len(evaluated_results) - len(successful_evals)}"
            )
            print(f"Average F1 Score: {avg_f1:.4f}")
            print(f"Average Precision: {avg_precision:.4f}")
            print(f"Average Recall: {avg_recall:.4f}")
            print(f"Average Match Similarity: {avg_match_sim:.4f}")
            print(f"Total Matched Pairs: {total_matches}")
            print(f"Total Expected Steps: {total_expected}")
            print(f"Total Actual Steps: {total_actual}")
        else:
            print(f"No successful evaluations out of {len(evaluated_results)} results")


if __name__ == "__main__":
    main()
