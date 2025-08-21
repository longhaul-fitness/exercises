import os
import sys
from typing import Any, Dict, List, Optional

# Add the src directory to the Python path
sys.path.append(os.path.join(os.path.dirname(__file__), "../../src"))
sys.path.append(os.path.join(os.path.dirname(__file__), "../utils"))

from experiment_utils import load_json_data, save_json_results

from flows import FlexibilityNode


def run_flexibility_flow_experiment(test_case: Dict[str, Any]) -> Dict[str, Any]:
    """
    Run a single flexibility flow experiment using config.json models.

    Args:
        test_case: Test case data with id, query, and expected results

    Returns:
        Dictionary containing experiment results
    """
    import time

    start_time = time.time()

    try:
        # Create the flexibility node (it will load models from config.json)
        flexibility_node = FlexibilityNode()

        # Initialize shared store (simulating what the main flow would do)
        shared = {"query": test_case["query"]}

        # Run the complete flexibility flow
        prep_result = flexibility_node.prep(shared)
        exec_result = flexibility_node.exec(prep_result)
        post_action = flexibility_node.post(shared, prep_result, exec_result)

        execution_time = (time.time() - start_time) * 1000  # Convert to ms

        # Extract results from shared store
        success = post_action != "error"
        error = None

        if not success:
            error = shared.get("processing_error", "Unknown error occurred")

        result = {
            "test_case_id": test_case["id"],
            "query": test_case["query"],
            "expected": test_case["expected"],
            "success": success,
            "error": error,
            "execution_time_ms": execution_time,
            "total_cost": sum(shared.get("cost", {}).values()),
            "cost_breakdown": shared.get("cost", {}),
            "actual": (
                {
                    "exercise_name": shared.get("exercise_name"),
                    "steps": shared.get("steps"),
                    "muscles": shared.get("muscles"),
                }
                if success
                else None
            ),
        }

        return result

    except Exception as e:
        execution_time = (time.time() - start_time) * 1000
        return {
            "test_case_id": test_case["id"],
            "query": test_case["query"],
            "expected": test_case["expected"],
            "success": False,
            "error": str(e),
            "execution_time_ms": execution_time,
            "total_cost": 0,
            "cost_breakdown": {},
            "actual": None,
        }


def run_end_to_end_flexibility_flow(
    test_case_id: Optional[str] = None,
    data_path: Optional[str] = None,
) -> List[Dict[str, Any]]:
    """
    Run end-to-end flexibility flow experiments using models from config.json.

    Args:
        test_case_id: Specific test case ID to run. If None, runs all test cases.
        data_path: Path to test data JSON file. If None, uses default flexibility data.

    Returns:
        List of result dictionaries containing test_case_id, expected, actual, etc.
    """
    # Load test data
    if data_path is None:
        data_path = os.path.join(os.path.dirname(__file__), "../data/flexibility.json")

    test_cases = load_json_data(data_path)

    # Filter to specific test case if requested
    if test_case_id is not None:
        test_cases = [tc for tc in test_cases if tc["id"] == test_case_id]
        if not test_cases:
            available_ids = [tc["id"] for tc in load_json_data(data_path)]
            raise ValueError(
                f"Test case {test_case_id} not found. Available IDs: {available_ids}"
            )

    results = []

    print(f"Running {len(test_cases)} flexibility flow test cases...")

    for test_case in test_cases:
        print(f"Running {test_case['id']}: {test_case['query'][:50]}...")

        # Run the experiment
        result = run_flexibility_flow_experiment(test_case)
        results.append(result)

    return results


def main():
    """CLI interface for running end-to-end flexibility flow experiments."""
    import argparse

    parser = argparse.ArgumentParser(
        description="Run end-to-end flexibility flow experiments"
    )
    parser.add_argument("--test-case-id", type=str, help="Specific test case ID to run")
    parser.add_argument("--data-path", type=str, help="Path to test data JSON file")
    parser.add_argument("--output", type=str, help="Output file for results (JSON)")

    args = parser.parse_args()

    # Run the experiments
    results = run_end_to_end_flexibility_flow(
        test_case_id=args.test_case_id, data_path=args.data_path
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
        # Note: we use "config-models" to indicate these used config.json models
        filepath = save_json_results(
            results, ["config-models"], "end_to_end_flexibility_flow"
        )
        print(f"Results saved to {filepath}")

    # Print summary to console
    successful = sum(1 for r in results if r["success"])
    total_cost = sum(r["total_cost"] for r in results)
    avg_time = (
        sum(r["execution_time_ms"] for r in results) / len(results) if results else 0
    )

    print("\nEnd-to-end flexibility flow summary:")
    print(f"Ran {len(results)} test cases")
    print(f"Successful: {successful}")
    print(f"Failed: {len(results) - successful}")
    print(f"Total cost: ${total_cost:.6f}")
    print(f"Average execution time: {avg_time:.0f}ms")

    # Show failures if any
    failures = [r for r in results if not r["success"]]
    if failures:
        print("\nFailed test cases:")
        for failure in failures:
            print(f"  {failure['test_case_id']}: {failure['error']}")


if __name__ == "__main__":
    main()
