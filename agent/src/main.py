#!/usr/bin/env -S uv run
# /// script
# requires-python = ">=3.13"
# dependencies = [
#    "boto3>=1.39.11",
#     "litellm<1.75",
#     "pocketflow>=0.0.2",
# ]
# ///

import sys

from flows import create_exercise_flow


def main():
    # Check if an argument was provided
    if len(sys.argv) > 1:
        # Join all arguments to handle multi-word queries
        query = " ".join(sys.argv[1:])
    else:
        # Default query if none provided
        query = "Bench Press"

    # Create and run the flow
    flow = create_exercise_flow()

    # Initialize shared store with the user query
    shared = {"query": query}

    # Run the flow
    flow.run(shared)

    # Return response based on the result
    response = "Complete."

    # Add save information
    if "save_result" in shared:
        save_info = shared["save_result"]
        response += f"\n\nExercise saved to {save_info['file']}"

    # Add cost information if available
    if "cost" in shared:
        total_cost = sum(shared["cost"].values())
        response += f"\n\nTotal LLM cost: ${total_cost:.6f}"
        response += "\n\nCost breakdown:"
        for node, cost in shared["cost"].items():
            if cost > 0:
                response += f"\n- {node}: ${cost:.6f}"

    print(response)
    return response


if __name__ == "__main__":
    main()
