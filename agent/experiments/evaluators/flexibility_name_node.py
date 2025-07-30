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
from scoring import calculate_comprehensive_similarity


class EmbeddingClient:
    """Simple embedding client using litellm."""

    def __init__(self, model: str = "bedrock/amazon.titan-embed-text-v2:0"):
        self.model = model

    def get_embedding(self, text: str) -> List[float]:
        """Get embedding for a text string."""
        response = litellm.embedding(model=self.model, input=[text])
        return response.data[0].embedding


def evaluate_results(
    results: List[Dict[str, Any]], embedding_client: EmbeddingClient
) -> List[Dict[str, Any]]:
    """Evaluate results using semantic and lexical similarity scoring."""
    evaluated_results = []

    for result in results:
        if not result["success"]:
            # Skip failed results
            evaluated_results.append(
                {
                    **result,
                    "evaluation": {
                        "semantic_similarity": 0.0,
                        "lexical_similarity": {
                            "ratio": 0.0,
                            "partial_ratio": 0.0,
                            "token_sort_ratio": 0.0,
                            "token_set_ratio": 0.0,
                        },
                        "combined_score": 0.0,
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
                        "semantic_similarity": 0.0,
                        "lexical_similarity": {
                            "ratio": 0.0,
                            "partial_ratio": 0.0,
                            "token_sort_ratio": 0.0,
                            "token_set_ratio": 0.0,
                        },
                        "combined_score": 0.0,
                        "error": "No actual output to evaluate",
                    },
                }
            )
            continue

        try:
            # Calculate comprehensive similarity scores
            similarity_scores = calculate_comprehensive_similarity(
                expected=expected,
                actual=actual,
                embedding_client=embedding_client,
            )

            evaluated_results.append(
                {
                    **result,
                    "evaluation": {
                        "semantic_similarity": similarity_scores["semantic_similarity"],
                        "lexical_similarity": similarity_scores["lexical_similarity"],
                        "combined_score": similarity_scores["combined_score"],
                        "error": None,
                    },
                }
            )

        except Exception as e:
            evaluated_results.append(
                {
                    **result,
                    "evaluation": {
                        "semantic_similarity": 0.0,
                        "lexical_similarity": {
                            "ratio": 0.0,
                            "partial_ratio": 0.0,
                            "token_sort_ratio": 0.0,
                            "token_set_ratio": 0.0,
                        },
                        "combined_score": 0.0,
                        "error": f"Evaluation error: {str(e)}",
                    },
                }
            )

    return evaluated_results


def run_flexibility_name_evaluator(
    test_case_id: Optional[str] = None,
    input_path: Optional[str] = None,
    embedding_model: str = "bedrock/amazon.titan-embed-text-v2:0",
) -> List[Dict[str, Any]]:
    """
    Evaluate FlexibilityNameNode results using fuzzy F1 scoring.

    Args:
        test_case_id: Specific test case UUID to evaluate. If None, evaluates all.
        input_path: Path to specific results JSON file. If None, finds files automatically.
        embedding_model: Model to use for generating embeddings.

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
        results_files = find_latest_files("flexibility_name_node", "runs", test_case_id)
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
    evaluated_results = evaluate_results(results, embedding_client)

    return evaluated_results, source_filename


def main():
    """CLI interface for running the flexibility name node evaluator."""
    import argparse

    parser = argparse.ArgumentParser(description="Evaluate FlexibilityNameNode results")
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
        "--output", type=str, help="Output file for evaluation results (JSON)"
    )
    parser.add_argument(
        "--stdout", action="store_true", help="Output results to stdout instead of file"
    )

    args = parser.parse_args()

    # Run the evaluation
    evaluated_results, source_filename = run_flexibility_name_evaluator(
        test_case_id=args.test_case_id,
        input_path=args.input_path,
        embedding_model=args.embedding_model,
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
            evaluated_results, source_filename, "flexibility_name_node"
        )
        print(f"Evaluation results saved to {filepath}")

    # Print summary to console (only if not outputting to stdout)
    if not args.stdout:
        successful_evals = [
            r for r in evaluated_results if r["evaluation"]["error"] is None
        ]
        if successful_evals:
            avg_semantic = sum(
                r["evaluation"]["semantic_similarity"] for r in successful_evals
            ) / len(successful_evals)
            avg_combined = sum(
                r["evaluation"]["combined_score"] for r in successful_evals
            ) / len(successful_evals)
            avg_lexical_token_sort = sum(
                r["evaluation"]["lexical_similarity"]["token_sort_ratio"]
                for r in successful_evals
            ) / len(successful_evals)

            print(f"\nEvaluated {len(evaluated_results)} results")
            print(f"Successful evaluations: {len(successful_evals)}")
            print(
                f"Failed evaluations: {len(evaluated_results) - len(successful_evals)}"
            )
            print(f"Average Semantic Similarity: {avg_semantic:.4f}")
            print(
                f"Average Lexical Similarity (Token Sort): {avg_lexical_token_sort:.4f}"
            )
            print(f"Average Combined Score: {avg_combined:.4f}")
        else:
            print(f"No successful evaluations out of {len(evaluated_results)} results")


if __name__ == "__main__":
    main()
