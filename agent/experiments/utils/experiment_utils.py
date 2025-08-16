import json
import os
import re
from datetime import datetime
from typing import Any, Dict, List, Optional

DEFAULT_MODELS = [
    "bedrock/amazon.nova-lite-v1:0",
    "bedrock/amazon.nova-micro-v1:0",
    "bedrock/us.amazon.nova-premier-v1:0",
    "bedrock/amazon.nova-pro-v1:0",
    "bedrock/us.anthropic.claude-3-7-sonnet-20250219-v1:0",
    "bedrock/us.anthropic.claude-sonnet-4-20250514-v1:0",
]


def extract_json_from_response(response: str) -> str:
    """
    Extract JSON content from LLM response, handling markdown code blocks and finding JSON within text.

    Args:
        response: Raw LLM response that may contain ```json delimiters or other text

    Returns:
        Clean JSON string without markdown delimiters
    """
    # Strip whitespace
    response = response.strip()

    # First, try to find JSON within curly braces using regex
    # This handles cases where JSON is embedded in other text
    json_pattern = r"\{[^{}]*(?:\{[^{}]*\}[^{}]*)*\}"
    json_matches = re.findall(json_pattern, response, re.DOTALL)

    if json_matches:
        # Return the first (and likely only) JSON object found
        return json_matches[0].strip()

    # Fallback: Remove markdown code block delimiters if present
    if response.startswith("```json"):
        response = response[7:]  # Remove ```json
    elif response.startswith("```"):
        response = response[3:]  # Remove ```

    if response.endswith("```"):
        response = response[:-3]  # Remove trailing ```

    # Strip any remaining whitespace
    return response.strip()


def load_json_data(data_path: str) -> List[Dict[str, Any]]:
    """Load JSON data from file."""
    with open(data_path, "r") as f:
        return json.load(f)


def sanitize_model_name(model_name: str) -> str:
    """Sanitize model name for use in filename."""
    return model_name.replace("/", "-").replace(":", "-").replace(".", "-")


def generate_timestamped_filename(models: List[str], timestamp: str) -> str:
    """Generate filename based on models used and timestamp."""
    if len(models) == len(DEFAULT_MODELS) and set(models) == set(DEFAULT_MODELS):
        return f"{timestamp}_all-models.json"
    elif len(models) == 1:
        return f"{timestamp}_{sanitize_model_name(models[0])}.json"
    else:
        return f"{timestamp}_select-models.json"


def create_results_directory(node_type: str, subdir: str = "runs") -> str:
    """Create and return the results directory path for a given node type."""
    results_dir = os.path.join(
        os.path.dirname(__file__), f"../results/{node_type}/{subdir}"
    )
    os.makedirs(results_dir, exist_ok=True)
    return results_dir


def save_json_results(
    results: List[Dict[str, Any]], models: List[str], node_type: str
) -> str:
    """Save results to JSON file and return the filepath."""
    # Create timestamp (local time, no colons)
    timestamp = datetime.now().strftime("%Y-%m-%dT%H%M%S")

    # Generate filename
    filename = generate_timestamped_filename(models, timestamp)

    # Create results directory
    results_dir = create_results_directory(node_type, "runs")

    # Save results
    filepath = os.path.join(results_dir, filename)
    with open(filepath, "w") as f:
        json.dump(results, f, indent=2)

    return filepath


def find_latest_files(
    node_type: str, subdir: str = "runs", test_case_id: Optional[str] = None
) -> List[str]:
    """Find matching results files based on criteria, sorted by most recent first."""
    results_dir = os.path.join(
        os.path.dirname(__file__), f"../results/{node_type}/{subdir}"
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


def save_evaluation_results(
    results: List[Dict[str, Any]], source_filename: str, node_type: str
) -> str:
    """Save evaluation results to JSON file and return the filepath."""
    # Create timestamp (local time, no colons)
    timestamp = datetime.now().strftime("%Y-%m-%dT%H%M%S")

    # Generate filename based on source file
    base_name = os.path.splitext(os.path.basename(source_filename))[0]
    filename = f"{timestamp}_{base_name}_evaluated.json"

    # Create results directory structure
    results_dir = create_results_directory(node_type, "evaluations")

    # Save results
    filepath = os.path.join(results_dir, filename)
    with open(filepath, "w") as f:
        json.dump(results, f, indent=2)

    return filepath


def run_node_experiments(
    node_class,
    expected_field: str,
    input_preparer,
    models: Optional[List[str]] = None,
    test_case_id: Optional[str] = None,
    data_path: Optional[str] = None,
) -> List[Dict[str, Any]]:
    """
    Generic function to run node experiments with specified models and test cases.

    Args:
        node_class: The Node class to instantiate and test
        expected_field: Field name in test data containing expected output
        input_preparer: Function that takes (test_case, model) and returns prep_data
        models: List of model names to test. If None, uses DEFAULT_MODELS.
        test_case_id: Specific test case UUID to run. If None, runs all test cases.
        data_path: Path to test data JSON file. If None, uses default path.

    Returns:
        List of result dictionaries containing model, test_case_id, input, expected, actual, etc.
    """
    import time

    # Use default models if none specified
    if models is None:
        models = DEFAULT_MODELS

    # Load test data
    if data_path is None:
        data_path = os.path.join(os.path.dirname(__file__), "../data/flexibility.json")
    test_data = load_json_data(data_path)

    # Filter to specific test case if requested
    if test_case_id is not None:
        matching_cases = [case for case in test_data if case["id"] == test_case_id]
        if not matching_cases:
            available_ids = [case["id"] for case in test_data]
            raise ValueError(
                f"test_case_id {test_case_id} not found. Available IDs: {available_ids}"
            )
        test_data = matching_cases

    results = []
    node = node_class()

    for model in models:
        for test_case in test_data:
            # Prepare input data using the provided function
            prep_data = input_preparer(test_case, model)

            try:
                # Execute the node with timing
                start_time = time.time()
                result = node.exec(prep_data)
                execution_time_ms = int((time.time() - start_time) * 1000)

                actual_output = result["response"]
                cost = result.get("cost", 0)

                # Create input dict from prep_data, excluding model_name
                input_data = {k: v for k, v in prep_data.items() if k != "model_name"}

                # Store result
                results.append(
                    {
                        "model": model,
                        "test_case_id": test_case["id"],
                        "input": input_data,
                        "output": {
                            "expected": test_case["expected"][expected_field],
                            "actual": actual_output,
                        },
                        "metadata": {
                            "execution_time_ms": execution_time_ms,
                            "cost": f"{cost:.10f}",
                        },
                        "success": True,
                        "error": None,
                    }
                )

            except Exception as e:
                # Create input dict from prep_data, excluding model_name
                input_data = {k: v for k, v in prep_data.items() if k != "model_name"}

                # Store error result
                results.append(
                    {
                        "model": model,
                        "test_case_id": test_case["id"],
                        "input": input_data,
                        "output": {
                            "expected": test_case["expected"][expected_field],
                            "actual": None,
                        },
                        "metadata": {"execution_time_ms": None, "cost": None},
                        "success": False,
                        "error": str(e),
                    }
                )

    return results
