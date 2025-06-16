from pocketflow import Flow, Node
import llm

class LLMQueryNode(Node):
    def prep(self, shared):
        # Get the query from shared store
        return shared.get("query", "")

    def exec(self, query):
        # Call LLM to analyze the query
        model = llm.get_model("gpt-4o-mini")
        response = model.prompt(
            f"Analyze this query and respond with only one of these categories: 'strength', 'cardio', or 'flexibility': {query}"
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
    def exec(self, _):
        return "Processing flexibility exercise request"

    def post(self, shared, prep_res, exec_res):
        shared["result"] = exec_res
        return "default"

class ExerciseNode(Node):
    def process(self, message):
        # Create nodes
        llm_query_node = LLMQueryNode()
        strength_node = StrengthNode()
        cardio_node = CardioNode()
        flexibility_node = FlexibilityNode()

        # Connect nodes with branches
        llm_query_node.add_edge("strength", strength_node)
        llm_query_node.add_edge("cardio", cardio_node)
        llm_query_node.add_edge("flexibility", flexibility_node)

        # Create flow starting with LLM query node
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
    # Simple test when run directly
    response = exercise_node.process("I want to improve my bench press")
    print(response)
