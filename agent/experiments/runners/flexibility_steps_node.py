import os
import sys
from typing import Any, Dict, List, Optional

# Add the src directory to the Python path
sys.path.append(os.path.join(os.path.dirname(__file__), "../../src"))
sys.path.append(os.path.join(os.path.dirname(__file__), "../utils"))

from experiment_utils import (DEFAULT_MODELS, run_node_experiments,
                              save_json_results)

from nodes import FlexibilityStepsNode


def prepare_steps_node_input(test_case: Dict[str, Any], model: str) -> Dict[str, Any]:
    """Prepare input data for FlexibilityStepsNode."""
    return {
        "query": test_case["input"]["name"],
        "model_name": model,
    }


def run_flexibility_steps_node(
    models: Optional[List[str]] = None,
    test_case_id: Optional[str] = None,
    data_path: Optional[str] = None,
) -> List[Dict[str, Any]]:
    """
    Run FlexibilityStepsNode with specified models and test cases.

    Args:
        models: List of model names to test. If None, uses DEFAULT_MODELS.
        test_case_id: Specific test case UUID to run. If None, runs all test cases.
        data_path: Path to test data JSON file. If None, uses default path.

    Returns:
        List of result dictionaries containing model, test_case_id, input, expected, actual, etc.
    """
    return run_node_experiments(
        node_class=FlexibilityStepsNode,
        expected_field="expected_steps",
        input_preparer=prepare_steps_node_input,
        models=models,
        test_case_id=test_case_id,
        data_path=data_path,
    )


def main():
    """CLI interface for running the flexibility steps node experiments."""
    import argparse

    parser = argparse.ArgumentParser(description="Run FlexibilityStepsNode experiments")
    parser.add_argument("--model", type=str, help="Single model to test")
    parser.add_argument("--models", nargs="+", help="List of models to test")
    parser.add_argument(
        "--test-case-id", type=str, help="Specific test case UUID to run"
    )
    parser.add_argument("--data-path", type=str, help="Path to test data JSON file")
    parser.add_argument("--output", type=str, help="Output file for results (JSON)")

    args = parser.parse_args()

    # Determine which models to use
    models = None
    if args.model:
        models = [args.model]
    elif args.models:
        models = args.models

    # Run the experiments
    results = run_flexibility_steps_node(
        models=models, test_case_id=args.test_case_id, data_path=args.data_path
    )

    # Save results to file
    if args.output:
        # Use custom output path
        import json

        with open(args.output, "w") as f:
            json.dump(results, f, indent=2)
        print(f"Results saved to {args.output}")
    else:
        # Use default results directory structure
        filepath = save_json_results(
            results, models or DEFAULT_MODELS, "flexibility_steps_node"
        )
        print(f"Results saved to {filepath}")

    # Print summary to console
    print(f"\nRan {len(results)} experiments")
    print(f"Successful: {sum(1 for r in results if r['success'])}")
    print(f"Failed: {sum(1 for r in results if not r['success'])}")


if __name__ == "__main__":
    main()
