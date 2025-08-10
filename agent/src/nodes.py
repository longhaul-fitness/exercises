import json
import os
import sys
from dataclasses import asdict, dataclass
from datetime import datetime
from pathlib import Path
from typing import List, Literal, Optional

from pocketflow import Node

# Add the experiments/utils directory to the Python path for importing experiment_utils
sys.path.append(os.path.join(os.path.dirname(__file__), "../experiments/utils"))
from experiment_utils import extract_json_from_response

from log import get_logger
from model import call_llm, get_model_for_node

# Get module-specific logger
LOGGER = get_logger(__name__)

# Project root path for file operations
PROJECT_ROOT = Path(__file__).parent.parent


@dataclass
class ExerciseNameComponents:
    asymmetric: Optional[str]
    position: Optional[
        Literal["Seated", "Kneeling", "Lunging", "Hands-and-Knees", "Lying", "Prone"]
    ]
    body_part: Optional[str]
    variation: Optional[str]
    name: str
    equipment: Optional[str]

    def assemble_name(self) -> str:
        """Assemble the components into a final exercise name string."""
        parts = []
        if self.asymmetric:
            parts.append(self.asymmetric)
        if self.position:
            parts.append(self.position)
        if self.variation:
            parts.append(self.variation)
        if self.body_part:
            # Only add body_part if it's not already in the name
            if self.body_part.lower() not in self.name.lower():
                parts.append(self.body_part)
        parts.append(self.name)
        if self.equipment:
            parts.append(f"– {self.equipment}")
        return " ".join(parts)

    def to_dict(self) -> dict:
        """Convert the dataclass to a dictionary for JSON serialization."""
        return asdict(self)


class LLMQueryNode(Node):
    def prep(self, shared):
        # Get the query from shared store
        return {
            "query": shared.get("query", ""),
            "model_name": get_model_for_node(self.__class__.__name__),
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
            "model_name": get_model_for_node(self.__class__.__name__),
        }

    def exec(self, prep_data):
        # Read the prompt template
        prompt_path = (
            PROJECT_ROOT / "prompts" / "flexibility-exercise-steps.md"
        )
        with open(prompt_path, "r") as f:
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
            "model_name": get_model_for_node(self.__class__.__name__),
        }

    def exec(self, prep_data):
        # Read the prompt template
        prompt_path = (
            PROJECT_ROOT / "prompts" / "flexibility-exercise-muscles.md"
        )
        with open(prompt_path, "r") as f:
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
            "muscles": shared.get("muscles", {}),
            "model_name": get_model_for_node(self.__class__.__name__),
        }

    def exec(self, prep_data):
        # Read the prompt template
        prompt_path = (
            PROJECT_ROOT / "prompts" / "flexibility-exercise-name.md"
        )
        with open(prompt_path, "r") as f:
            prompt_template = f.read()

        # Extract primary and secondary muscles from the muscles data
        muscles_data = prep_data["muscles"]
        primary_muscles = muscles_data.get("primaryMuscles", [])

        # Build the full prompt
        full_prompt = (
            prompt_template + f"\n\nQuery: {prep_data['query']}\n"
            f"Steps: {prep_data['steps']}\n"
            f"Primary Muscles: {primary_muscles}\n"
        )

        # Make the LLM call
        result, cost = call_llm(model_name=prep_data["model_name"], prompt=full_prompt)

        # Parse the JSON response into dataclass instance
        try:
            # Clean the response to remove markdown delimiters
            clean_json = extract_json_from_response(result)
            json_data = json.loads(clean_json)
            name_components = ExerciseNameComponents(**json_data)

            # Post-process: Remove Wall/Floor as equipment (defensive programming)
            if name_components.equipment and name_components.equipment.lower() in [
                "wall",
                "floor",
            ]:
                LOGGER.warning(
                    f"Removed environmental equipment '{name_components.equipment}' from components"
                )
                name_components.equipment = None

            return {"response": name_components.assemble_name(), "cost": cost}
        except (json.JSONDecodeError, TypeError):
            # Fallback structure if JSON parsing fails
            LOGGER.error(f"result: {result}")
            fallback = ExerciseNameComponents(
                asymmetric=None,
                position=None,
                body_part=None,
                variation=None,
                name="Exercise Name Parse Error",
                equipment=None,
            )
            return {"response": fallback.assemble_name(), "cost": cost}

    def post(self, shared, prep_res, exec_res):
        # Store the name components in shared store
        shared["exercise_name"] = exec_res["response"]

        # Initialize cost tracking if not present
        if "cost" not in shared:
            shared["cost"] = {}

        # Store the cost for this node
        shared["cost"][self.__class__.__name__] = exec_res["cost"]

        return "default"


class StrengthStepsNode(Node):
    def prep(self, shared):
        # Get the exercise name and original query
        return {
            "query": shared.get("query", ""),
            "model_name": get_model_for_node(self.__class__.__name__),
        }

    def exec(self, prep_data):
        # Read the prompt template
        prompt_path = (
            PROJECT_ROOT / "prompts" / "strength-exercise-steps.md"
        )
        with open(prompt_path, "r") as f:
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


class StrengthMusclesNode(Node):
    def prep(self, shared):
        return {
            "query": shared.get("query", ""),
            "steps": shared.get("steps", ""),
            "model_name": get_model_for_node(self.__class__.__name__),
        }

    def exec(self, prep_data):
        # Read the prompt template
        prompt_path = (
            PROJECT_ROOT / "prompts" / "strength-exercise-muscles.md"
        )
        with open(prompt_path, "r") as f:
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


class StrengthNameNode(Node):
    def prep(self, shared):
        return {
            "query": shared.get("query", ""),
            "steps": shared.get("steps", ""),
            "muscles": shared.get("muscles", {}),
            "model_name": get_model_for_node(self.__class__.__name__),
        }

    def exec(self, prep_data):
        # Read the prompt template
        prompt_path = (
            PROJECT_ROOT / "prompts" / "strength-name-exercise.md"
        )
        with open(prompt_path, "r") as f:
            prompt_template = f.read()

        # Extract primary and secondary muscles from the muscles data
        muscles_data = prep_data["muscles"]
        primary_muscles = muscles_data.get("primaryMuscles", [])
        secondary_muscles = muscles_data.get("secondaryMuscles", [])

        # Build the full prompt
        full_prompt = (
            prompt_template + f"\n\nQuery: {prep_data['query']}\n"
            f"Steps: {prep_data['steps']}\n"
            f"Primary Muscles: {primary_muscles}\n"
            f"Secondary Muscles: {secondary_muscles}\n"
        )

        # Define JSON schema for structured output
        json_schema = {
            "name": "exercise_name_components",
            "schema": {
                "type": "object",
                "properties": {
                    "asymmetric": {"type": ["string", "null"]},
                    "position": {"type": ["string", "null"]},
                    "body_part": {"type": ["string", "null"]},
                    "variation": {"type": ["string", "null"]},
                    "name": {"type": "string"},
                    "equipment": {"type": ["string", "null"]}
                },
                "required": ["name"],
                "additionalProperties": False
            },
            "strict": True
        }

        # Make the LLM call with JSON schema
        result, cost = call_llm(
            model_name=prep_data["model_name"], 
            prompt=full_prompt, 
            json_schema=json_schema
        )

        # Parse the JSON response into dataclass instance
        try:
            # Clean the response to remove markdown delimiters
            clean_json = extract_json_from_response(result)
            json_data = json.loads(clean_json)
            
            # Ensure all required fields exist with defaults
            component_data = {
                "asymmetric": json_data.get("asymmetric"),
                "position": json_data.get("position"),
                "body_part": json_data.get("body_part"),
                "variation": json_data.get("variation"),
                "name": json_data.get("name", "Unknown Exercise"),
                "equipment": json_data.get("equipment")
            }
            
            name_components = ExerciseNameComponents(**component_data)

            return {"response": name_components.assemble_name(), "cost": cost}
        except (json.JSONDecodeError, TypeError):
            # Fallback structure if JSON parsing fails
            LOGGER.error(f"result: {result}")
            fallback = ExerciseNameComponents(
                asymmetric=None,
                position=None,
                body_part=None,
                variation=None,
                name="Exercise Name Parse Error",
                equipment=None,
            )
            return {"response": fallback.assemble_name(), "cost": cost}

    def post(self, shared, prep_res, exec_res):
        # Store the name components in shared store
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
        exercise_name = shared.get("exercise_name")
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
        file_path = PROJECT_ROOT / "exercises.json"

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
