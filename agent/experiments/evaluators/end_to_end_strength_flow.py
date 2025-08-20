"""
End-to-end evaluator for strength flow results.

Evaluates the complete output (name + steps + muscles) from end-to-end strength
flow runs against ground truth data, providing comprehensive scoring across all
components similar to individual node evaluators.
"""

import json
import os
import sys
from typing import Any, Dict, List

# Add the src directory to the Python path
sys.path.append(os.path.join(os.path.dirname(__file__), "../../src"))
sys.path.append(os.path.join(os.path.dirname(__file__), "../utils"))

import litellm
from experiment_utils import find_latest_files, save_evaluation_results
from scoring import (calculate_comprehensive_similarity,
                     calculate_exact_muscle_metrics)


class EmbeddingClient:
    """Simple embedding client using litellm."""

    def __init__(self, model: str = "bedrock/amazon.titan-embed-text-v2:0"):
        self.model = model

    def get_embedding(self, text: str) -> List[float]:
        """Get embedding for a text string."""
        response = litellm.embedding(model=self.model, input=[text])
        return response.data[0].embedding


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


def evaluate_exercise_name(
    expected_name: str, actual_name: str, embedding_client: EmbeddingClient
) -> Dict[str, Any]:
    """Evaluate exercise name using semantic and lexical similarity."""
    if not actual_name or actual_name == "Unknown":
        return {
            "semantic_similarity": 0.0,
            "lexical_similarity": {
                "ratio": 0.0,
                "partial_ratio": 0.0,
                "token_sort_ratio": 0.0,
                "token_set_ratio": 0.0,
            },
            "combined_score": 0.0,
            "error": "No exercise name generated",
        }

    try:
        return calculate_comprehensive_similarity(
            expected_name, actual_name, embedding_client
        )
    except Exception as e:
        return {
            "semantic_similarity": 0.0,
            "lexical_similarity": {
                "ratio": 0.0,
                "partial_ratio": 0.0,
                "token_sort_ratio": 0.0,
                "token_set_ratio": 0.0,
            },
            "combined_score": 0.0,
            "error": f"Name evaluation failed: {str(e)}",
        }


def evaluate_exercise_steps(
    expected_steps: List[str],
    actual_steps: List[str],
    embedding_client: EmbeddingClient,
) -> Dict[str, Any]:
    """Evaluate exercise steps using semantic similarity and step count metrics."""
    if not actual_steps or actual_steps == ["Unable to parse steps"]:
        return {
            "step_count_accuracy": 0.0,
            "semantic_similarity": 0.0,
            "combined_score": 0.0,
            "expected_count": len(expected_steps),
            "actual_count": 0,
            "error": "No steps generated or parse error",
        }

    try:
        # Step count accuracy
        expected_count = len(expected_steps)
        actual_count = len(actual_steps)
        step_count_accuracy = (
            min(actual_count / expected_count, 1.0) if expected_count > 0 else 0.0
        )

        # Semantic similarity between concatenated steps
        expected_text = " ".join(expected_steps)
        actual_text = " ".join(actual_steps)

        similarity_result = calculate_comprehensive_similarity(
            expected_text, actual_text, embedding_client
        )

        # Combined score (weight step count and semantic similarity)
        combined_score = (step_count_accuracy * 0.3) + (
            similarity_result["combined_score"] * 0.7
        )

        return {
            "step_count_accuracy": step_count_accuracy,
            "semantic_similarity": similarity_result["semantic_similarity"],
            "lexical_similarity": similarity_result["lexical_similarity"],
            "combined_score": combined_score,
            "expected_count": expected_count,
            "actual_count": actual_count,
            "error": None,
        }

    except Exception as e:
        return {
            "step_count_accuracy": 0.0,
            "semantic_similarity": 0.0,
            "combined_score": 0.0,
            "expected_count": len(expected_steps),
            "actual_count": len(actual_steps) if actual_steps else 0,
            "error": f"Steps evaluation failed: {str(e)}",
        }


def evaluate_exercise_muscles(
    expected_muscles: Dict[str, List[str]], actual_muscles: Dict[str, List[str]]
) -> Dict[str, Any]:
    """Evaluate exercise muscles using exact matching metrics."""
    if not actual_muscles or actual_muscles == ["Unable to parse muscles"]:
        return {
            "primary_precision": 0.0,
            "primary_recall": 0.0,
            "primary_f1": 0.0,
            "secondary_precision": 0.0,
            "secondary_recall": 0.0,
            "secondary_f1": 0.0,
            "combined_score": 0.0,
            "invalid_muscles": [],
            "error": "No muscles generated or parse error",
        }

    try:
        # Handle different muscle formats - convert to consistent format
        if isinstance(expected_muscles, dict):
            expected_primary = expected_muscles.get("primary", [])
            expected_secondary = expected_muscles.get("secondary", [])
        else:
            expected_primary = []
            expected_secondary = []

        if isinstance(actual_muscles, dict):
            actual_primary = actual_muscles.get("primaryMuscles", [])
            actual_secondary = actual_muscles.get("secondaryMuscles", [])
        else:
            actual_primary = []
            actual_secondary = []

        # Validate muscle names
        all_actual = actual_primary + actual_secondary
        invalid_muscles = validate_muscles(all_actual)

        # Calculate metrics for primary and secondary muscles separately
        primary_metrics = calculate_exact_muscle_metrics(
            expected_primary, actual_primary
        )
        secondary_metrics = calculate_exact_muscle_metrics(
            expected_secondary, actual_secondary
        )

        # Calculate weighted F1 score (70% primary, 30% secondary) as combined score
        combined_score = (0.7 * primary_metrics["f1"]) + (0.3 * secondary_metrics["f1"])

        return {
            "primary_precision": primary_metrics["precision"],
            "primary_recall": primary_metrics["recall"],
            "primary_f1": primary_metrics["f1"],
            "secondary_precision": secondary_metrics["precision"],
            "secondary_recall": secondary_metrics["recall"],
            "secondary_f1": secondary_metrics["f1"],
            "combined_score": combined_score,
            "invalid_muscles": invalid_muscles,
            "error": None,
        }

    except Exception as e:
        return {
            "primary_precision": 0.0,
            "primary_recall": 0.0,
            "primary_f1": 0.0,
            "secondary_precision": 0.0,
            "secondary_recall": 0.0,
            "secondary_f1": 0.0,
            "combined_score": 0.0,
            "invalid_muscles": [],
            "error": f"Muscles evaluation failed: {str(e)}",
        }


def evaluate_end_to_end_results(
    results: List[Dict[str, Any]], embedding_client: EmbeddingClient
) -> List[Dict[str, Any]]:
    """
    Evaluate end-to-end strength flow results.

    Combines evaluation of:
    - Exercise name (semantic + lexical similarity)
    - Exercise steps (semantic similarity + step count)
    - Exercise muscles (exact matching + validation)

    Returns comprehensive scores for each component plus overall score.
    """
    evaluated_results = []

    for result in results:
        if not result["success"]:
            # Handle failed executions
            evaluation = {
                "name_evaluation": {
                    "semantic_similarity": 0.0,
                    "lexical_similarity": {
                        "ratio": 0.0,
                        "partial_ratio": 0.0,
                        "token_sort_ratio": 0.0,
                        "token_set_ratio": 0.0,
                    },
                    "combined_score": 0.0,
                    "error": "Flow execution failed",
                },
                "steps_evaluation": {
                    "step_count_accuracy": 0.0,
                    "semantic_similarity": 0.0,
                    "combined_score": 0.0,
                    "expected_count": len(result["expected"].get("steps", [])),
                    "actual_count": 0,
                    "error": "Flow execution failed",
                },
                "muscles_evaluation": {
                    "primary_precision": 0.0,
                    "primary_recall": 0.0,
                    "primary_f1": 0.0,
                    "secondary_precision": 0.0,
                    "secondary_recall": 0.0,
                    "secondary_f1": 0.0,
                    "combined_score": 0.0,
                    "invalid_muscles": [],
                    "error": "Flow execution failed",
                },
                "overall_score": 0.0,
                "error": result.get("error", "Unknown execution error"),
            }
        else:
            # Evaluate successful executions
            expected = result["expected"]
            actual = result["actual"]

            # Evaluate each component
            name_eval = evaluate_exercise_name(
                expected["name"], actual["exercise_name"], embedding_client
            )

            steps_eval = evaluate_exercise_steps(
                expected["steps"], actual["steps"], embedding_client
            )

            muscles_eval = evaluate_exercise_muscles(
                expected["muscles"], actual["muscles"]
            )

            # Calculate overall score (weighted combination)
            name_score = name_eval["combined_score"]
            steps_score = steps_eval["combined_score"]
            muscles_score = muscles_eval["combined_score"]

            # Weight: name (30%), steps (35%), muscles (35%)
            overall_score = (
                (name_score * 0.30) + (steps_score * 0.35) + (muscles_score * 0.35)
            )

            evaluation = {
                "name_evaluation": name_eval,
                "steps_evaluation": steps_eval,
                "muscles_evaluation": muscles_eval,
                "overall_score": overall_score,
                "error": None,
            }

        # Add evaluation to result
        evaluated_results.append({**result, "evaluation": evaluation})

    return evaluated_results


def main():
    """CLI interface for evaluating end-to-end strength flow results."""
    import argparse

    parser = argparse.ArgumentParser(
        description="Evaluate end-to-end strength flow results"
    )
    parser.add_argument(
        "--input", type=str, help="Path to results JSON file to evaluate"
    )
    parser.add_argument("--output", type=str, help="Output file for evaluation results")

    args = parser.parse_args()

    # Find input file
    if args.input:
        input_file = args.input
    else:
        # Find the latest end-to-end strength flow results
        latest_files = find_latest_files("end_to_end_strength_flow", "runs")
        if not latest_files:
            print("No end-to-end strength flow results found")
            return
        input_file = latest_files[0]
        print(f"Using latest results file: {input_file}")

    # Load results
    with open(input_file, "r") as f:
        results = json.load(f)

    print(f"Loaded {len(results)} results from {input_file}")

    # Initialize embedding client
    embedding_client = EmbeddingClient()

    # Evaluate results
    print("Evaluating results...")
    evaluated_results = evaluate_end_to_end_results(results, embedding_client)

    # Save evaluation results
    if args.output:
        output_file = args.output
        with open(output_file, "w") as f:
            json.dump(evaluated_results, f, indent=2)
        print(f"Evaluation results saved to {output_file}")
    else:
        output_file = save_evaluation_results(
            evaluated_results, input_file, "end_to_end_strength_flow"
        )
        print(f"Evaluation results saved to {output_file}")

    # Print summary
    successful_evals = [
        r for r in evaluated_results if r["success"] and not r["evaluation"]["error"]
    ]

    if successful_evals:
        # Calculate averages
        avg_overall = sum(
            r["evaluation"]["overall_score"] for r in successful_evals
        ) / len(successful_evals)
        avg_name = sum(
            r["evaluation"]["name_evaluation"]["combined_score"]
            for r in successful_evals
        ) / len(successful_evals)
        avg_steps = sum(
            r["evaluation"]["steps_evaluation"]["combined_score"]
            for r in successful_evals
        ) / len(successful_evals)
        avg_muscles = sum(
            r["evaluation"]["muscles_evaluation"]["combined_score"]
            for r in successful_evals
        ) / len(successful_evals)

        print("\nEvaluation Summary:")
        print(
            f"Evaluated: {len(successful_evals)}/{len(evaluated_results)} successful results"
        )
        print(f"Average Overall Score: {avg_overall:.3f}")
        print(f"Average Name Score: {avg_name:.3f}")
        print(f"Average Steps Score: {avg_steps:.3f}")
        print(f"Average Muscles Score: {avg_muscles:.3f}")
    else:
        print("\nNo successful results to evaluate")


if __name__ == "__main__":
    main()
