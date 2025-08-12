from pocketflow import Flow, Node

from log import get_logger
from nodes import (FlexibilityMusclesNode, FlexibilityNameNode,
                   FlexibilityStepsNode, LLMQueryNode, NoValidMusclesError,
                   SaveExerciseNode, StrengthMusclesNode, StrengthNameNode,
                   StrengthStepsNode)

LOGGER = get_logger(__name__)


class StrengthNode(Node):
    def prep(self, shared):
        # Get the query from shared store
        return shared.get("query", "")

    def exec(self, query):
        try:
            # Create a flow of strength-specific nodes
            steps_node = StrengthStepsNode()
            muscles_node = StrengthMusclesNode()
            name_node = StrengthNameNode()

            # Define the flow
            steps_node >> muscles_node >> name_node

            # Create the flow
            flow = Flow(start=steps_node)

            # Initialize shared store with the query
            strength_shared = {"query": query}

            # Run the flow
            flow.run(strength_shared)

            # Calculate total cost from sub-flow if available
            total_cost = 0
            if "cost" in strength_shared:
                total_cost = sum(strength_shared["cost"].values())

            return {"response": strength_shared, "cost": total_cost}

        except NoValidMusclesError as e:
            LOGGER.error(f"Muscle identification failed: {e}")
            # Return error information instead of normal response
            return {
                "response": {
                    "error": True,
                    "error_message": str(e),
                    "error_type": "no_muscles",
                },
                "cost": 0,
            }

    def post(self, shared, prep_res, exec_res):
        strength_shared = exec_res["response"]

        # Check if there was an error
        if isinstance(strength_shared, dict) and strength_shared.get("error"):
            shared["processing_error"] = strength_shared
            return "error"  # Return error action to stop normal flow

        # Store the results in the shared store
        exercise_name = strength_shared.get("exercise_name", "Unknown")
        steps = strength_shared.get("steps", [])
        muscles = strength_shared.get("muscles", [])

        # Store in shared for SaveExerciseNode to use
        shared["exercise_name"] = exercise_name
        shared["steps"] = steps
        shared["muscles"] = muscles

        # Initialize cost tracking if not present
        if "cost" not in shared:
            shared["cost"] = {}

        # Store the cost for this node
        shared["cost"][self.__class__.__name__] = exec_res["cost"]

        # If the sub-flow has costs, merge them into the main flow's costs
        if "cost" in strength_shared:
            for node_name, node_cost in strength_shared["cost"].items():
                shared["cost"][node_name] = node_cost

        return "default"


class CardioNode(Node):
    def exec(self, _):
        result = "Processing cardio exercise request"
        return {"response": result, "cost": 0}  # No LLM call, so cost is 0

    def post(self, shared, prep_res, exec_res):
        shared["result"] = exec_res["response"]

        # Initialize cost tracking if not present
        if "cost" not in shared:
            shared["cost"] = {}

        # Store the cost for this node
        shared["cost"][self.__class__.__name__] = exec_res["cost"]

        return "default"


class FlexibilityNode(Node):
    def prep(self, shared):
        # Get the query from shared store
        return shared.get("query", "")

    def exec(self, query):
        try:
            # Create a flow of flexibility-specific nodes
            steps_node = FlexibilityStepsNode()
            muscles_node = FlexibilityMusclesNode()
            name_node = FlexibilityNameNode()

            # Define the flow
            steps_node >> muscles_node >> name_node

            # Create the flow
            flow = Flow(start=steps_node)

            # Initialize shared store with the query
            flex_shared = {"query": query}

            # Run the flow
            flow.run(flex_shared)

            # Calculate total cost from sub-flow if available
            total_cost = 0
            if "cost" in flex_shared:
                total_cost = sum(flex_shared["cost"].values())

            return {"response": flex_shared, "cost": total_cost}

        except NoValidMusclesError as e:
            LOGGER.error(f"Muscle identification failed: {e}")
            # Return error information instead of normal response
            return {
                "response": {
                    "error": True,
                    "error_message": str(e),
                    "error_type": "no_muscles",
                },
                "cost": 0,
            }

    def post(self, shared, prep_res, exec_res):
        flex_shared = exec_res["response"]

        # Check if there was an error
        if isinstance(flex_shared, dict) and flex_shared.get("error"):
            shared["processing_error"] = flex_shared
            return "error"  # Return error action to stop normal flow

        # Store the results in the shared store
        exercise_name = flex_shared.get("exercise_name", "Unknown")
        steps = flex_shared.get("steps", [])
        muscles = flex_shared.get("muscles", [])

        # Store in shared for SaveExerciseNode to use
        shared["exercise_name"] = exercise_name
        shared["steps"] = steps
        shared["muscles"] = muscles

        # Initialize cost tracking if not present
        if "cost" not in shared:
            shared["cost"] = {}

        # Store the cost for this node
        shared["cost"][self.__class__.__name__] = exec_res["cost"]

        # If the sub-flow has costs, merge them into the main flow's costs
        if "cost" in flex_shared:
            for node_name, node_cost in flex_shared["cost"].items():
                shared["cost"][node_name] = node_cost

        return "default"


def create_exercise_flow():
    """Create and return the main exercise processing flow."""
    # Create nodes
    llm_query_node = LLMQueryNode()
    strength_node = StrengthNode()
    cardio_node = CardioNode()
    flexibility_node = FlexibilityNode()
    save_node = SaveExerciseNode()

    # Define the transitions between nodes using the action-based syntax
    llm_query_node - "strength" >> strength_node
    llm_query_node - "cardio" >> cardio_node
    llm_query_node - "flexibility" >> flexibility_node

    # Add save node after each exercise type node
    strength_node >> save_node
    cardio_node >> save_node
    flexibility_node >> save_node

    # Create flow with the start node
    return Flow(start=llm_query_node)
