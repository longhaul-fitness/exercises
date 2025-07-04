import os
import sys
from collections import defaultdict

import pandas as pd
import pytest
from fuzzywuzzy import fuzz

# Add the src directory to the Python path
sys.path.append(os.path.join(os.path.dirname(__file__), "../src"))

from exercise_agent import FlexibilityNameNode

# Test cases
test_cases = [
    {
        "input": {
            "query": "Yoga Block Chest Stretch",
            "steps": [
                "Lie on your side with your top leg supported by a yoga block or foam roller.",
                "Extend both arms straight in front of you, palms together.",
                "Lift your top arm up towards the ceiling while keeping your legs stable. Your gaze should follow the top arm while it travels.",
                "Rotate your upper body, moving your top arm behind your back, face twisted towards the top arm, without lifting your leg off the support.",
                "Hold the pose for the desired amount of time before repeating the exercise on the other side.",
            ],
        },
        "expected_output": "One-Arm Lying Spine Twist – Yoga Block",
    },
    {
        "input": {
            "query": "Bicep Stretch",
            "steps": [
                "Raise one arm to shoulder height next to your body.",
                "Rotate your wrist so your palm faces down.",
                "Place your palm firmly against a doorframe, squat rack, or wall.",
                "Twist your body away from your anchored arm to stretch your biceps.",
                "Hold the stretch for the desired time and switch to the other side.",
            ],
        },
        "expected_output": "One-Arm Shoulder-Height Bicep Stretch",
    },
    {
        "input": {
            "query": "Isometric Shoulder Flexion",
            "steps": [
                "Stand facing a wall with your elbows straight and aligned below your shoulders.",
                "Place your palms on the wall with fingers pointing forward.",
                "Press your palms into the wall, gradually increasing the force over 3 seconds.",
                "Hold the maximal push for 5-7 seconds without moving your elbows.",
                "Slowly decrease the pressure back to rest over 3 seconds.",
                "Repeat the exercise for the desired amount of time.",
            ],
        },
        "expected_output": "Low Arms Rotator Cuff Forward Wall Press",
    },
]

# Models to test
models_to_test = [
    "bedrock-claude-v3.5-sonnet",
    "bedrock-claude-v3.7-sonnet",
    "gpt-4.1",
    "nova-lite",
    "nova-micro",
    "nova-pro",
    "o4-mini",
]

# Global score tracker
model_scores = defaultdict(list)


@pytest.fixture(scope="module", autouse=True)
def score_tracker():
    """Fixture to track scores across tests"""
    # Setup - runs before tests
    yield

    # Teardown - runs after all tests complete
    if model_scores:
        # Create a DataFrame with the results
        df = pd.DataFrame(model_scores)

        # Calculate average scores per model
        avg_scores = df.mean()

        # Create a summary
        summary = [
            "\n=== Model Performance Summary ===",
            f"{df}",
            "\nAverage scores:",
            f"{avg_scores}",
            f"\nBest performing model: {avg_scores.idxmax()} (Score: {avg_scores.max():.2f})",
        ]

        # Print the summary (will be captured in pytest output)
        print("\n".join(summary))

        # Save results to CSV
        df.to_csv("model_test_results.csv")


@pytest.mark.llm
@pytest.mark.parametrize("test_case", test_cases)
@pytest.mark.parametrize("model_name", models_to_test)
def test_flexibility_name_node(test_case, model_name, score_tracker):
    # Prepare the input data for exec
    prep_data = {
        "query": test_case["input"]["query"],
        "steps": test_case["input"]["steps"],
        "model_name": model_name,
    }

    # Run the node's prep and exec methods
    node = FlexibilityNameNode()
    result = node.exec(prep_data)

    # Calculate similarity score
    similarity_score = fuzz.token_sort_ratio(result, test_case["expected_output"])

    # Store the score
    test_id = f"{test_case['input']['query'][:20]}"
    model_scores[model_name].append(similarity_score)

    # Print current test result
    print(f"\nTest: {test_id}, Model: {model_name}")
    print(f"Expected: {test_case['expected_output']}")
    print(f"Got: {result}")
    print(f"Score: {similarity_score}")

    # Assert a minimum threshold for the test to pass
    assert similarity_score >= 50, f"Similarity too low: {similarity_score}%"
