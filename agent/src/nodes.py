import json
import os
from dataclasses import asdict, dataclass
from datetime import datetime
from typing import List, Optional

import litellm
from pocketflow import Flow, Node

from config import Configuration
from log import get_logger
from model import Model

# Load configuration
APP_CONFIG = Configuration("./config.json")

# Get module-specific logger
LOGGER = get_logger(__name__)

# Initialize the model abstraction with the models configuration
AGENT_MODELS = Model(APP_CONFIG.get_models_config())


class LLMQueryNode(Node):
    def prep(self, shared):
        # Get the query from shared store
        return shared.get("query", "")

    def exec(self, query):
        # Call LLM to analyze the query
        model = AGENT_MODELS.get_model(self.__class__.__name__)
        response = litellm.completion(
            model=model,
            messages=[
                {
                    "role": "user",
                    "content": f"Analyze this exercise name and description. Categorize the exercise as only one of these options: 'strength', 'cardio', or 'flexibility'. Return only the option: {query}",
                }
            ],
        )
        # Extract cost information
        cost = response._hidden_params.get("response_cost", 0)
        result = response.choices[0].message.content.strip().lower()
        return {"response": result, "cost": cost}

    def post(self, shared, prep_res, exec_res):
        # Store the category in shared store
        shared["category"] = exec_res["response"]

        # Initialize cost tracking if not present
        if "cost" not in shared:
            shared["cost"] = {}

        # Store the cost for this node
        shared["cost"][self.__class__.__name__] = exec_res["cost"]

        # Return the next node based on the category
        return exec_res["response"]


class StrengthNode(Node):
    def exec(self, _):
        result = "Processing strength exercise request"
        return {"response": result, "cost": 0}  # No LLM call, so cost is 0

    def post(self, shared, prep_res, exec_res):
        shared["result"] = exec_res["response"]

        # Initialize cost tracking if not present
        if "cost" not in shared:
            shared["cost"] = {}

        # Store the cost for this node
        shared["cost"][self.__class__.__name__] = exec_res["cost"]

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
        # Create a flow of flexibility-specific nodes
        steps_node = FlexibilityStepsNode()
        muscles_node = FlexibilityMusclesNode()
        name_node = FlexibilityNameNode()

        # Define the flow: name -> steps -> muscles
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

    def post(self, shared, prep_res, exec_res):
        # Get the response data
        flex_shared = exec_res["response"]

        # Store the results in the shared store
        exercise_name = flex_shared.get("exercise_name", "Unknown")
        steps = flex_shared.get("steps", [])
        muscles = flex_shared.get("muscles", [])

        # Log the exercise information
        LOGGER.info(f"Exercise: {exercise_name}\n\nSteps:\n")
        for step in steps:
            LOGGER.info(f"{step}\n")

        # Add muscles information if available
        if muscles:
            LOGGER.info(f"\nMuscles: {muscles}")

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


class FlexibilityStepsNode(Node):
    def prep(self, shared):
        # Get the exercise name and original query
        return {"query": shared.get("query", "")}

    def exec(self, prep_data):
        # Read the prompt template
        with open("prompts/flexibility-exercise-steps.md", "r") as f:
            prompt_template = f.read()

        # Call LLM to get the exercise steps
        model = AGENT_MODELS.get_model(self.__class__.__name__)
        response = litellm.completion(
            model=model,
            messages=[
                {
                    "role": "user",
                    "content": prompt_template + f"\n\nInput: {prep_data['query']}",
                }
            ],
        )

        # Extract cost information
        cost = response._hidden_params.get("response_cost", 0)

        # Parse the JSON response
        import json

        try:
            steps = json.loads(response.choices[0].message.content.strip())
            return {"response": steps, "cost": cost}
        except json.JSONDecodeError:
            return {"response": ["Unable to parse steps"], "cost": cost}

    def post(self, shared, prep_res, exec_res):
        # Store the steps in shared store
        shared["steps"] = exec_res["response"]

        # Initialize cost tracking if not present
        if "cost" not in shared:
            shared["cost"] = {}

        # Store the cost for this node
        shared["cost"][self.__class__.__name__] = exec_res["cost"]

        return "default"


class FlexibilityMusclesNode(Node):
    def prep(self, shared):
        return {"query": shared.get("query", ""), "steps": shared.get("steps", "")}

    def exec(self, prep_data):
        # Read the prompt template
        with open("prompts/flexibility-exercise-muscles.md", "r") as f:
            prompt_template = f.read()

        # Call LLM to get the exercise name
        model = AGENT_MODELS.get_model(self.__class__.__name__)
        response = litellm.completion(
            model=model,
            messages=[
                {
                    "role": "user",
                    "content": prompt_template
                    + f"\n\n{prep_data['query']}\nSteps: {prep_data['steps']}",
                }
            ],
        )

        # Extract cost information
        cost = response._hidden_params.get("response_cost", 0)

        # Parse the JSON response
        import json

        try:
            muscles = json.loads(response.choices[0].message.content.strip())
            return {"response": muscles, "cost": cost}
        except json.JSONDecodeError:
            return {"response": ["Unable to parse muscles"], "cost": cost}

    def post(self, shared, prep_res, exec_res):
        # Store the muscles in shared store
        shared["muscles"] = exec_res["response"]

        # Initialize cost tracking if not present
        if "cost" not in shared:
            shared["cost"] = {}

        # Store the cost for this node
        shared["cost"][self.__class__.__name__] = exec_res["cost"]

        return "default"


class FlexibilityNameNode(Node):
    def prep(self, shared):
        return {
            "query": shared.get("query", ""),
            "steps": shared.get("steps", ""),
            "model_name": AGENT_MODELS.get_model(self.__class__.__name__),
        }

    def exec(self, prep_data):
        # Read the prompt template
        with open("prompts/flexibility-exercise-name.md", "r") as f:
            prompt_template = f.read()

        response = litellm.completion(
            model=prep_data["model_name"],
            messages=[
                {
                    "role": "user",
                    "content": prompt_template
                    + f"\n\n{prep_data['query']}\nSteps: {prep_data['steps']}",
                }
            ],
        )

        # Extract cost information
        cost = response._hidden_params.get("response_cost", 0)
        result = response.choices[0].message.content.strip()

        return {"response": result, "cost": cost}

    def post(self, shared, prep_res, exec_res):
        # Store the exercise name in shared store
        shared["exercise_name"] = exec_res["response"]

        # Initialize cost tracking if not present
        if "cost" not in shared:
            shared["cost"] = {}

        # Store the cost for this node
        shared["cost"][self.__class__.__name__] = exec_res["cost"]

        return "default"


@dataclass
class Exercise:
    """Data class representing an exercise with all its attributes."""

    type: str  # "strength" | "cardio" | "flexibility"
    name: str  # the name of the exercise
    steps: List[str]  # steps to perform the exercise
    created: str  # timestamp when the exercise was created
    primaryMuscles: Optional[List[str]] = None  # optional for "cardio" exercises
    secondaryMuscles: Optional[List[str]] = None  # optional for "cardio" exercises
    notes: str = ""  # notes about the exercise
    status: str = "pending"  # "pending" | "approved" | "rejected" | "revised"
    llmNotes: Optional[str] = None  # LLM considerations or assumptions
    input: str = ""  # original user input


class SaveExerciseNode(Node):
    """Node to save exercise data to a JSON file."""

    def prep(self, shared):
        """Prepare the exercise data from the shared store."""
        LOGGER.info(f"shared: {shared}")
        category = shared.get("category", "unknown")
        exercise_name = shared.get("exercise_name", "unknown")
        steps = shared.get("steps", "unknown")
        query = shared.get("query", "")

        # Basic exercise data
        exercise_data = {
            "type": category,
            "name": exercise_name,
            "steps": steps,
            "notes": "",
            "input": query,
            "created": datetime.now().isoformat(),
            "status": "pending",
        }

        # Handle muscles for all exercise types
        muscles = shared.get("muscles")
        if muscles:
            if isinstance(muscles, dict):
                exercise_data["primaryMuscles"] = muscles.get("primaryMuscles", [])
                exercise_data["secondaryMuscles"] = muscles.get("secondaryMuscles", [])
            elif isinstance(muscles, list):
                # For flexibility exercises, muscles is often a simple list
                exercise_data["primaryMuscles"] = muscles
                exercise_data["secondaryMuscles"] = []

        return exercise_data

    def exec(self, exercise_data):
        """Save the exercise to the appropriate JSON file."""
        # Create an Exercise object
        exercise = Exercise(**exercise_data)

        # Determine which file to use based on exercise type
        file_path = "exercises.json"

        # Read existing exercises if file exists
        exercises = []
        if os.path.exists(file_path):
            try:
                with open(file_path, "r") as f:
                    exercises = json.load(f)
            except json.JSONDecodeError:
                LOGGER.error(f"Error reading {file_path}. Creating a new file.")

        # Append the new exercise
        exercises.append(asdict(exercise))

        # Write back to file
        with open(file_path, "w") as f:
            json.dump(exercises, f, indent=2)

        result = {"file": file_path, "exercise": asdict(exercise)}
        return {"response": result, "cost": 0}  # No LLM call, so cost is 0

    def post(self, shared, prep_res, exec_res):
        """Update shared store with save results."""
        shared["save_result"] = exec_res["response"]

        # Initialize cost tracking if not present
        if "cost" not in shared:
            shared["cost"] = {}

        # Store the cost for this node
        shared["cost"][self.__class__.__name__] = exec_res["cost"]

        return "default"
