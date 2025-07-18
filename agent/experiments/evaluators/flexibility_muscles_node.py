import json
import os
import sys
from datetime import datetime
from typing import Any, Dict, List, Optional

# Add the src directory to the Python path
sys.path.append(os.path.join(os.path.dirname(__file__), "../../src"))
sys.path.append(os.path.join(os.path.dirname(__file__), "../utils"))

import litellm
from scoring import calculate_fuzzy_metrics


class EmbeddingClient:
    """Simple embedding client using litellm."""

    def __init__(self, model: str = "bedrock/amazon.titan-embed-text-v2:0"):
        self.model = model

    def get_embedding(self, text: str) -> List[float]:
        """Get embedding for a text string."""
        response = litellm.embedding(model=self.model, input=[text])
        return response.data[0].embedding


def load_runner_results(input_path: str) -> List[Dict[str, Any]]:
    """Load results from the runner JSON file."""
    with open(input_path, "r") as f:
        return json.load(f)


def find_results_files(
    test_case_id: Optional[str] = None, results_dir: Optional[str] = None
) -> List[str]:
    """Find matching results files based on criteria."""
    if results_dir is None:
        results_dir = os.path.join(
            os.path.dirname(__file__), "../results/flexibility_muscles_node/runs"
        )

    if not os.path.exists(results_dir):
        return []

    # Get all JSON files in the results directory
    json_files = [f for f in os.listdir(results_dir) if f.endswith(".json")]

    # Sort by modification time, most recent first
    json_files.sort(
        key=lambda f: os.path.getmtime(os.path.join(results_dir, f)), reverse=True
    )

    return [os.path.join(results_dir, f) for f in json_files]


def evaluate_results(
    results: List[Dict[str, Any]], embedding_client: EmbeddingClient
) -> List[Dict[str, Any]]:
    """Evaluate results using fuzzy F1 scoring."""
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
                        "error": "No actual output to evaluate",
                    },
                }
            )
            continue

        try:
            # Handle muscle data structure - convert to comparable format
            if isinstance(expected, dict):
                # Extract all muscles from expected structure
                expected_muscles = []
                if "primaryMuscles" in expected:
                    expected_muscles.extend(expected["primaryMuscles"])
                if "secondaryMuscles" in expected:
                    expected_muscles.extend(expected["secondaryMuscles"])
            else:
                expected_muscles = (
                    expected if isinstance(expected, list) else [expected]
                )

            if isinstance(actual, dict):
                # Extract all muscles from actual structure
                actual_muscles = []
                if "primaryMuscles" in actual:
                    actual_muscles.extend(actual["primaryMuscles"])
                if "secondaryMuscles" in actual:
                    actual_muscles.extend(actual["secondaryMuscles"])
            else:
                actual_muscles = actual if isinstance(actual, list) else [actual]

            # Calculate fuzzy metrics using semantic similarity
            metrics = calculate_fuzzy_metrics(
                true_list=expected_muscles,
                pred_list=actual_muscles,
                embedding_client=embedding_client,
            )

            evaluated_results.append(
                {
                    **result,
                    "evaluation": {
                        "f1_score": metrics.f1,
                        "precision": metrics.precision,
                        "recall": metrics.recall,
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
                        "error": f"Evaluation error: {str(e)}",
                    },
                }
            )

    return evaluated_results


def save_evaluation_results(results: List[Dict[str, Any]], source_filename: str) -> str:
    """Save evaluation results to JSON file and return the filepath."""
    # Create timestamp (local time, no colons)
    timestamp = datetime.now().strftime("%Y-%m-%dT%H%M%S")

    # Generate filename based on source file
    base_name = os.path.splitext(os.path.basename(source_filename))[0]
    filename = f"{timestamp}_{base_name}_evaluated.json"

    # Create results directory structure
    results_dir = os.path.join(
        os.path.dirname(__file__), "../results/flexibility_muscles_node/evaluations"
    )
    os.makedirs(results_dir, exist_ok=True)

    # Save results
    filepath = os.path.join(results_dir, filename)
    with open(filepath, "w") as f:
        json.dump(results, f, indent=2)

    return filepath


def run_flexibility_muscles_evaluator(
    test_case_id: Optional[str] = None,
    input_path: Optional[str] = None,
    embedding_model: str = "bedrock/amazon.titan-embed-text-v2:0",
) -> List[Dict[str, Any]]:
    """
    Evaluate FlexibilityMusclesNode results using fuzzy F1 scoring.

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
        results = load_runner_results(input_path)
        source_filename = input_path
    else:
        # Find and load matching results files
        results_files = find_results_files(test_case_id=test_case_id)
        if not results_files:
            raise ValueError("No results files found matching the criteria")

        # Load the most recent file
        source_filename = results_files[0]
        results = load_runner_results(source_filename)
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
    """CLI interface for running the flexibility muscles node evaluator."""
    import argparse

    parser = argparse.ArgumentParser(
        description="Evaluate FlexibilityMusclesNode results"
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
        "--output", type=str, help="Output file for evaluation results (JSON)"
    )

    args = parser.parse_args()

    # Run the evaluation
    evaluated_results, source_filename = run_flexibility_muscles_evaluator(
        test_case_id=args.test_case_id,
        input_path=args.input_path,
        embedding_model=args.embedding_model,
    )

    # Save results to file
    if args.output:
        # Use custom output path
        with open(args.output, "w") as f:
            json.dump(evaluated_results, f, indent=2)
        print(f"Evaluation results saved to {args.output}")
    else:
        # Use default results directory structure
        filepath = save_evaluation_results(evaluated_results, source_filename)
        print(f"Evaluation results saved to {filepath}")

    # Print summary to console
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

        print(f"\nEvaluated {len(evaluated_results)} results")
        print(f"Successful evaluations: {len(successful_evals)}")
        print(f"Failed evaluations: {len(evaluated_results) - len(successful_evals)}")
        print(f"Average F1 Score: {avg_f1:.4f}")
        print(f"Average Precision: {avg_precision:.4f}")
        print(f"Average Recall: {avg_recall:.4f}")
    else:
        print(f"No successful evaluations out of {len(evaluated_results)} results")


if __name__ == "__main__":
    main()
