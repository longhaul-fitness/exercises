import llm
from pocketflow import Flow, Node


class LLMQueryNode(Node):
    def prep(self, shared):
        # Get the query from shared store
        return shared.get("query", "")

    def exec(self, query):
        # Call LLM to analyze the query
        model = llm.get_model("gpt-4o-mini")
        response = model.prompt(
            f"Analyze this exercise name and description. Categorize the exercise as only one of these options: 'strength', 'cardio', or 'flexibility'. Return only the option: {query}"
        )
        return response.text().strip().lower()

    def post(self, shared, prep_res, exec_res):
        # Store the category in shared store
        shared["category"] = exec_res
        # Return the next node based on the category
        return exec_res


class StrengthNode(Node):
    def exec(self, _):
        return "Processing strength exercise request"

    def post(self, shared, prep_res, exec_res):
        shared["result"] = exec_res
        return "default"


class CardioNode(Node):
    def exec(self, _):
        return "Processing cardio exercise request"

    def post(self, shared, prep_res, exec_res):
        shared["result"] = exec_res
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

        return flex_shared

    def post(self, shared, prep_res, exec_res):
        # Store the results in the shared store
        shared["result"] = (
            f"Exercise: {exec_res.get('exercise_name', 'Unknown')}\n\nSteps:\n"
        )

        # Format the steps as a numbered list
        steps = exec_res.get("steps", [])
        for i, step in enumerate(steps, 1):
            shared["result"] += f"{i}. {step}\n"

        # Add muscles information if available
        if "muscles" in exec_res:
            shared["result"] += f"\nMuscles: {exec_res.get('muscles', 'Not specified')}"

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
        model = llm.get_model("gpt-4o-mini")
        response = model.prompt(prompt_template + f"\n\nInput: {prep_data['query']}")

        # Parse the JSON response
        import json

        try:
            steps = json.loads(response.text().strip())
            return steps
        except json.JSONDecodeError:
            return ["Unable to parse steps"]

    def post(self, shared, prep_res, exec_res):
        # Store the steps in shared store
        shared["steps"] = exec_res
        return "default"


class FlexibilityMusclesNode(Node):
    def prep(self, shared):
        return {"query": shared.get("query", ""), "steps": shared.get("steps", "")}

    def exec(self, prep_data):
        # Read the prompt template
        with open("prompts/flexibility-exercise-muscles.md", "r") as f:
            prompt_template = f.read()

        # Call LLM to get the exercise name
        model = llm.get_model("gpt-4o-mini")
        response = model.prompt(
            prompt_template + f"\n\n{prep_data["query"]}\nSteps: {prep_data['steps']}"
        )

        # Parse the JSON response
        import json

        try:
            muscles = json.loads(response.text().strip())
            return muscles
        except json.JSONDecodeError:
            return ["Unable to parse muscles"]

    def post(self, shared, prep_res, exec_res):
        # Store the muscles in shared store
        shared["muscles"] = exec_res
        return "default"


class FlexibilityNameNode(Node):
    def prep(self, shared):
        return {"query": shared.get("query", ""), "steps": shared.get("steps", "")}

    def exec(self, prep_data):
        # Read the prompt template
        with open("prompts/flexibility-exercise-name.md", "r") as f:
            prompt_template = f.read()

        # Call LLM to get the exercise name
        model = llm.get_model("gpt-4o-mini")
        response = model.prompt(
            prompt_template + f"\n\n{query}\nSteps: {prep_data['steps']}"
        )

        return response.text().strip()

    def post(self, shared, prep_res, exec_res):
        # Store the exercise name in shared store
        shared["exercise_name"] = exec_res
        return "default"


class ExerciseNode(Node):
    def process(self, message):
        # Create nodes
        llm_query_node = LLMQueryNode()
        strength_node = StrengthNode()
        cardio_node = CardioNode()
        flexibility_node = FlexibilityNode()

        # Define the transitions between nodes using the action-based syntax
        llm_query_node - "strength" >> strength_node
        llm_query_node - "cardio" >> cardio_node
        llm_query_node - "flexibility" >> flexibility_node

        # Create flow with the start node
        flow = Flow(start=llm_query_node)

        # Initialize shared store with the user query
        shared = {"query": message}

        # Run the flow
        flow.run(shared)

        # Return response based on the result
        return f"Category: {shared.get('category', 'unknown')}\n{shared.get('result', 'No result')}"


# Initialize the node
exercise_node = ExerciseNode()

if __name__ == "__main__":
    import sys

    # Check if an argument was provided
    if len(sys.argv) > 1:
        # Join all arguments to handle multi-word queries
        query = " ".join(sys.argv[1:])
    else:
        # Default query if none provided
        query = "Bench Press"

    # Process the query
    response = exercise_node.process(query)
    print(response)
