import json
import os
import sys
from typing import Any, Dict, List, Optional

# Add the src directory to the Python path
sys.path.append(os.path.join(os.path.dirname(__file__), "../../src"))
sys.path.append(os.path.join(os.path.dirname(__file__), "../utils"))

from experiment_utils import (find_latest_files, load_json_data,
                              save_evaluation_results)
from scoring import calculate_exact_muscle_metrics

# Valid muscles from the prompt
VALID_MUSCLES = {
    "abdominal",
    "bicep",
    "calf",
    "chest",
    "forearm - inner",
    "forearm - outer",
    "glute",
    "hamstring",
    "lat",
    "lower back",
    "oblique",
    "quad",
    "rotator cuff - back",
    "rotator cuff - front",
    "shoulder - back",
    "shoulder - front",
    "shoulder - side",
    "thigh - inner",
    "thigh - outer",
    "trap",
    "tricep",
}


def validate_muscles(muscles: List[str]) -> List[str]:
    """Return list of invalid muscle names."""
    return [m for m in muscles if m not in VALID_MUSCLES]


def evaluate_results(results: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    """Evaluate results using exact muscle matching with separate primary/secondary scoring."""
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
                        "primary_metrics": None,
                        "secondary_metrics": None,
                        "invalid_muscles": {"primary": [], "secondary": []},
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
                        "primary_metrics": None,
                        "secondary_metrics": None,
                        "invalid_muscles": {"primary": [], "secondary": []},
                        "error": "No actual output to evaluate",
                    },
                }
            )
            continue

        try:
            # Extract primary and secondary muscles separately
            expected_primary = (
                expected.get("primaryMuscles", []) if isinstance(expected, dict) else []
            )
            expected_secondary = (
                expected.get("secondaryMuscles", [])
                if isinstance(expected, dict)
                else []
            )

            actual_primary = (
                actual.get("primaryMuscles", []) if isinstance(actual, dict) else []
            )
            actual_secondary = (
                actual.get("secondaryMuscles", []) if isinstance(actual, dict) else []
            )

            # Check for invalid muscles (for reporting only)
            primary_invalid = validate_muscles(actual_primary)
            secondary_invalid = validate_muscles(actual_secondary)

            # Calculate metrics for primary and secondary muscles separately
            primary_metrics = calculate_exact_muscle_metrics(
                expected_primary, actual_primary
            )
            secondary_metrics = calculate_exact_muscle_metrics(
                expected_secondary, actual_secondary
            )

            # Calculate weighted F1 score (70% primary, 30% secondary)
            weighted_f1 = (0.7 * primary_metrics["f1"]) + (
                0.3 * secondary_metrics["f1"]
            )

            # Calculate weighted precision and recall
            total_expected = len(expected_primary) + len(expected_secondary)
            total_actual = len(actual_primary) + len(actual_secondary)

            if total_actual > 0:
                weighted_precision = (
                    (0.7 * primary_metrics["precision"] * len(actual_primary))
                    + (0.3 * secondary_metrics["precision"] * len(actual_secondary))
                ) / total_actual
            else:
                weighted_precision = 0.0

            if total_expected > 0:
                weighted_recall = (
                    (0.7 * primary_metrics["recall"] * len(expected_primary))
                    + (0.3 * secondary_metrics["recall"] * len(expected_secondary))
                ) / total_expected
            else:
                weighted_recall = 0.0

            evaluated_results.append(
                {
                    **result,
                    "evaluation": {
                        "f1_score": weighted_f1,
                        "precision": weighted_precision,
                        "recall": weighted_recall,
                        "primary_metrics": primary_metrics,
                        "secondary_metrics": secondary_metrics,
                        "invalid_muscles": {
                            "primary": primary_invalid,
                            "secondary": secondary_invalid,
                        },
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
                        "primary_metrics": None,
                        "secondary_metrics": None,
                        "invalid_muscles": {"primary": [], "secondary": []},
                        "error": f"Evaluation error: {str(e)}",
                    },
                }
            )

    return evaluated_results


def run_flexibility_muscles_evaluator(
    test_case_id: Optional[str] = None,
    input_path: Optional[str] = None,
) -> List[Dict[str, Any]]:
    """
    Evaluate StrengthMusclesNode results using exact muscle matching.

    Args:
        test_case_id: Specific test case UUID to evaluate. If None, evaluates all.
        input_path: Path to specific results JSON file. If None, finds files automatically.

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
            "strength_muscles_node", "runs", test_case_id
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

    # Evaluate results
    evaluated_results = evaluate_results(results)

    return evaluated_results, source_filename


def main():
    """CLI interface for running the strength muscles node evaluator."""
    import argparse

    parser = argparse.ArgumentParser(
        description="Evaluate StrengthMusclesNode results"
    )
    parser.add_argument(
        "--test-case-id", type=str, help="Specific test case UUID to evaluate"
    )
    parser.add_argument(
        "--input-path", type=str, help="Path to specific runner results JSON file"
    )
    parser.add_argument(
        "--output", type=str, help="Output file for evaluation results (JSON)"
    )

    args = parser.parse_args()

    # Run the evaluation
    evaluated_results, source_filename = run_flexibility_muscles_evaluator(
        test_case_id=args.test_case_id,
        input_path=args.input_path,
    )

    # Save results to file
    if args.output:
        # Use custom output path
        with open(args.output, "w") as f:
            json.dump(evaluated_results, f, indent=2)
        print(f"Evaluation results saved to {args.output}")
    else:
        # Use default results directory structure
        filepath = save_evaluation_results(
            evaluated_results, source_filename, "strength_muscles_node"
        )
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
