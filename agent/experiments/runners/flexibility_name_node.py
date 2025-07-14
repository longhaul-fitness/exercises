import json
import os
import sys
from datetime import datetime
from typing import List, Dict, Any, Optional

# Add the src directory to the Python path
sys.path.append(os.path.join(os.path.dirname(__file__), "../../src"))

from nodes import FlexibilityNameNode

DEFAULT_MODELS = [
    "bedrock/amazon.nova-lite-v1:0",
    "bedrock/amazon.nova-micro-v1:0",
    "bedrock/amazon.nova-pro-v1:0",
    "bedrock/us.anthropic.claude-3-7-sonnet-20250219-v1:0",
    "bedrock/us.anthropic.claude-sonnet-4-20250514-v1:0",
    "bedrock/us.meta.llama3-2-3b-instruct-v1:0",
]

def load_test_data(data_path: str = None) -> List[Dict[str, Any]]:
    """Load test data from JSON file."""
    if data_path is None:
        data_path = os.path.join(os.path.dirname(__file__), "../data/flexibility.json")

    with open(data_path, 'r') as f:
        return json.load(f)

def sanitize_model_name(model_name: str) -> str:
    """Sanitize model name for use in filename."""
    return model_name.replace('/', '-').replace(':', '-').replace('.', '-')

def generate_filename(models: List[str], timestamp: str) -> str:
    """Generate filename based on models used."""
    if len(models) == len(DEFAULT_MODELS) and set(models) == set(DEFAULT_MODELS):
        return f"{timestamp}_all-models.json"
    elif len(models) == 1:
        return f"{timestamp}_{sanitize_model_name(models[0])}.json"
    else:
        return f"{timestamp}_select-models.json"

def save_results(results: List[Dict[str, Any]], models: List[str]) -> str:
    """Save results to JSON file and return the filepath."""
    # Create timestamp (local time, no colons)
    timestamp = datetime.now().strftime("%Y-%m-%dT%H%M%S")

    # Generate filename
    filename = generate_filename(models, timestamp)

    # Create results directory structure
    results_dir = os.path.join(os.path.dirname(__file__), "../results/flexibility_name_node/runs")
    os.makedirs(results_dir, exist_ok=True)

    # Save results
    filepath = os.path.join(results_dir, filename)
    with open(filepath, 'w') as f:
        json.dump(results, f, indent=2)

    return filepath

def run_flexibility_name_node(
    models: Optional[List[str]] = None,
    test_case_id: Optional[str] = None,
    data_path: Optional[str] = None
) -> List[Dict[str, Any]]:
    """
    Run FlexibilityNameNode with specified models and test cases.

    Args:
        models: List of model names to test. If None, uses DEFAULT_MODELS.
        test_case_id: Specific test case UUID to run. If None, runs all test cases.
        data_path: Path to test data JSON file. If None, uses default path.

    Returns:
        List of result dictionaries containing model, test_case_id, input, expected, actual, etc.
    """
    # Use default models if none specified
    if models is None:
        models = DEFAULT_MODELS

    # Load test data
    test_data = load_test_data(data_path)

    # Filter to specific test case if requested
    if test_case_id is not None:
        matching_cases = [case for case in test_data if case["id"] == test_case_id]
        if not matching_cases:
            available_ids = [case["id"] for case in test_data]
            raise ValueError(f"test_case_id {test_case_id} not found. Available IDs: {available_ids}")
        test_data = matching_cases

    results = []
    node = FlexibilityNameNode()

    for model in models:
        for idx, test_case in enumerate(test_data):
            # Prepare input data
            prep_data = {
                "query": test_case["input"]["query"],
                "steps": test_case["input"]["steps"],
                "model_name": model,
            }

            try:
                # Execute the node
                result = node.exec(prep_data)
                actual_output = result["response"]

                # Store result
                results.append({
                    "model": model,
                    "test_case_id": test_case["id"],
                    "query": test_case["input"]["query"],
                    "steps": test_case["input"]["steps"],
                    "expected": test_case["expected_output"],
                    "actual": actual_output,
                    "success": True,
                    "error": None
                })

            except Exception as e:
                # Store error result
                results.append({
                    "model": model,
                    "test_case_id": test_case["id"],
                    "query": test_case["input"]["query"],
                    "steps": test_case["input"]["steps"],
                    "expected": test_case["expected_output"],
                    "actual": None,
                    "success": False,
                    "error": str(e)
                })

    return results

def main():
    """CLI interface for running the flexibility name node experiments."""
    import argparse

    parser = argparse.ArgumentParser(description="Run FlexibilityNameNode experiments")
    parser.add_argument("--model", type=str, help="Single model to test")
    parser.add_argument("--models", nargs="+", help="List of models to test")
    parser.add_argument("--test-case-id", type=str, help="Specific test case UUID to run")
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
    results = run_flexibility_name_node(
        models=models,
        test_case_id=args.test_case_id,
        data_path=args.data_path
    )

    # Save results to file
    if args.output:
        # Use custom output path
        with open(args.output, 'w') as f:
            json.dump(results, f, indent=2)
        print(f"Results saved to {args.output}")
    else:
        # Use default results directory structure
        filepath = save_results(results, models or DEFAULT_MODELS)
        print(f"Results saved to {filepath}")

    # Print summary to console
    print(f"\nRan {len(results)} experiments")
    print(f"Successful: {sum(1 for r in results if r['success'])}")
    print(f"Failed: {sum(1 for r in results if not r['success'])}")

if __name__ == "__main__":
    main()
