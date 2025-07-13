from pocketflow import Flow
from nodes import (
    LLMQueryNode,
    StrengthNode,
    CardioNode,
    FlexibilityNode,
    SaveExerciseNode
)

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
