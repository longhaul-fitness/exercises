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
from log import get_logger

LOGGER = get_logger(__name__)


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

    try:
        # Run the flow
        flow.run(shared)

        # Check if there was a processing error
        if "processing_error" in shared:
            error_info = shared["processing_error"]
            error_message = error_info.get("error_message", "Unknown error occurred")

            if "no primary muscles identified" in error_message.lower():
                user_message = (
                    f"Unable to identify muscle groups for '{shared.get('query', 'this exercise')}'. "
                    "This exercise may not be supported by our current classification system. "
                    "Please try a different exercise."
                )
            else:
                user_message = f"Error processing exercise: {error_message}"

            LOGGER.error(f"Processing error: {user_message}")
            return user_message

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

        LOGGER.info(response)
        return response

    except Exception as e:
        LOGGER.error(f"Unexpected error in main flow: {e}")
        return f"An unexpected error occurred: {e}"


if __name__ == "__main__":
    main()
