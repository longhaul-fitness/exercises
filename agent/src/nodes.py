import json
import os
from dataclasses import asdict, dataclass
from datetime import datetime
from typing import List, Optional

from pocketflow import Node

from config import Configuration
from log import get_logger
from model import Model, call_llm

# Load configuration
APP_CONFIG = Configuration("./config.json")

# Get module-specific logger
LOGGER = get_logger(__name__)

# Initialize the model abstraction with the models configuration
AGENT_MODELS = Model(APP_CONFIG.get_models_config())


class LLMQueryNode(Node):
    def prep(self, shared):
        # Get the query from shared store
        return {
            "query": shared.get("query", ""),
            "model_name": AGENT_MODELS.get_model(self.__class__.__name__),
        }

    def exec(self, prep_data):
        # Build the prompt
        prompt = f"Analyze this exercise name and description. Categorize the exercise as only one of these options: 'strength', 'cardio', or 'flexibility'. Return only the option: {prep_data['query']}"

        # Make the LLM call
        result, cost = call_llm(model_name=prep_data["model_name"], prompt=prompt)

        return {"response": result.lower(), "cost": cost}

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


class FlexibilityStepsNode(Node):
    def prep(self, shared):
        # Get the exercise name and original query
        return {
            "query": shared.get("query", ""),
            "model_name": AGENT_MODELS.get_model(self.__class__.__name__),
        }

    def exec(self, prep_data):
        # Read the prompt template
        with open("prompts/flexibility-exercise-steps.md", "r") as f:
            prompt_template = f.read()

        # Build the full prompt
        full_prompt = prompt_template + f"\n\nInput: {prep_data['query']}"

        # Make the LLM call
        result, cost = call_llm(model_name=prep_data["model_name"], prompt=full_prompt)

        # Parse the JSON response
        import json

        try:
            steps = json.loads(result)
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
        return {
            "query": shared.get("query", ""),
            "steps": shared.get("steps", ""),
            "model_name": AGENT_MODELS.get_model(self.__class__.__name__),
        }

    def exec(self, prep_data):
        # Read the prompt template
        with open("prompts/flexibility-exercise-muscles.md", "r") as f:
            prompt_template = f.read()

        # Build the full prompt
        full_prompt = (
            prompt_template + f"\n\n{prep_data['query']}\nSteps: {prep_data['steps']}"
        )

        # Make the LLM call
        result, cost = call_llm(model_name=prep_data["model_name"], prompt=full_prompt)

        # Parse the JSON response
        import json

        try:
            muscles = json.loads(result)
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

        # Build the full prompt
        full_prompt = (
            prompt_template + f"\n\n{prep_data['query']}\nSteps: {prep_data['steps']}"
        )

        # Make the LLM call
        result, cost = call_llm(model_name=prep_data["model_name"], prompt=full_prompt)

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
