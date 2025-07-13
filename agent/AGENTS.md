# Exercise AI Agent



## Architecture

### Pocket Flow

This agent is built with Pocket Flow, a Python LLM framework. Pocket Flow information available here:

https://the-pocket.github.io/PocketFlow/guide.html

#### Node

A **Node** is a fundamental unit in the AI agent's architecture, designed to perform specific tasks through a three-step process: `prep->exec->post`. Each Node interacts with a `shared` data store and utilizes the `pocketflow` library for execution. Here’s a detailed breakdown:

##### Three Steps of a Node

1. **Prep Step**

   - **Objective:** Read and preprocess data from the `shared` store.
   - **Actions:** Query databases, read files, serialize data.
   - **Output:** `prep_res`, which is used by both `exec()` and `post()`.

2. **Exec Step**

   - **Objective:** Execute compute logic with optional retries and error handling.
   - **Actions:** Primarily LLM calls, remote APIs, or tool usage.
   - **Constraints:** Should not access `shared` store directly.
   - **Idempotency:** Ensure implementation is idempotent if retries are enabled.
   - **Output:** `exec_res`, passed to `post()`.

3. **Post Step**
   - **Objective:** Postprocess data and write results back to `shared`.
   - **Actions:** Update databases, change states, log results.
   - **Decision Making:** Return a string to decide the next action (`action = "default"` if none specified).

##### Separation of Concerns

The three-step design enforces separation of concerns, allowing independent operation of data storage and processing. Each step is optional, enabling flexibility in implementation.

##### Fault Tolerance and Retries

Nodes support fault tolerance through retries in the `exec()` step:

- **max_retries (int):** Maximum number of attempts for `exec()`. Default is 1 (no retry).
- **wait (int):** Seconds to wait before retrying. Default is 0 (no waiting).

Example:

```python
my_node = SummarizeFile(max_retries=3, wait=10)
```

Retries continue until success or the maximum number of attempts is reached.

##### Graceful Fallback

Nodes can gracefully handle exceptions after retries by overriding `exec_fallback`:

```python
def exec_fallback(self, prep_res, exc):
    raise exc  # Default behavior, can be overridden to return a fallback result
```

##### Example: Summarize File Node

```python
class SummarizeFile(Node):
    def prep(self, shared):
        return shared["data"]

    def exec(self, prep_res):
        if not prep_res:
            return "Empty file content"
        prompt = f"Summarize this text in 10 words: {prep_res}"
        summary = call_llm(prompt)  # might fail
        return summary

    def exec_fallback(self, prep_res, exc):
        return "There was an error processing your request."

    def post(self, shared, prep_res, exec_res):
        shared["summary"] = exec_res

summarize_node = SummarizeFile(max_retries=3)
action_result = summarize_node.run(shared)
print("Action returned:", action_result)  # "default"
print("Summary stored:", shared["summary"])
```

#### Flow

A **Flow** in the `pocketflow` library orchestrates a directed graph of Nodes, enabling sequence, branching, and looping based on Actions returned by each Node’s `post()` method. Here’s a detailed breakdown:

##### Action-based Transitions

- **Default Transition:** If a Node’s `post()` method returns no Action, it defaults to `"default"`.

  - Syntax: `node_a >> node_b`
  - Example: `node_a >> node_b` means if `node_a.post()` returns `"default"`, proceed to `node_b`.

- **Named Action Transition:** Specify custom Actions to direct flow.

  - Syntax: `node_a - "action_name" >> node_b`
  - Example: `node_a - "action_name" >> node_b` means if `node_a.post()` returns `"action_name"`, proceed to `node_b`.

- **Complex Flows:** Create loops, branching, or multi-step flows by defining various transitions.

##### Creating a Flow

- **Start Node:** A Flow begins with a specified start node.

  - Syntax: `Flow(start=some_node)`

- **Execution:** Calling `flow.run(shared)` starts the Flow from the specified start node, follows transitions based on Actions returned by `post()`, and continues until no further nodes are defined.

**Example: Simple Sequence**

```python
node_a >> node_b
flow = Flow(start=node_a)
flow.run(shared)
```

If `node_a.post()` returns `"default"`, the flow proceeds to `node_b`.

**Example: Branching & Looping**

```python
review - "approved" >> payment
review - "needs_revision" >> revise
review - "rejected" >> finish

revise >> review
payment >> finish

flow = Flow(start=review)
```

- If `review.post()` returns `"approved"`, proceed to `payment`.
- If `review.post()` returns `"needs_revision"`, proceed to `revise`, then loop back to `review`.
- If `review.post()` returns `"rejected"`, proceed to `finish`.

##### Running Individual Nodes vs. Running a Flow

- **`node.run(shared)`:** Executes only the specified node (calls `prep->exec->post()`), returning an Action. Useful for debugging or testing.
- **`flow.run(shared)`:** Executes the Flow from the start node, following Actions to subsequent nodes until the flow ends. Use this in production to ensure the entire pipeline runs correctly.

##### Nested Flows

- **Flow as Node:** A Flow can act as a Node within another Flow, enabling composition of smaller Flows into larger ones.
- **Parameter Merging:** Node parameters are merged from all parent Flows.

**Flow’s Node Methods:**

- A Flow, acting as a Node, runs `prep()` and `post()` but not `exec()`, as its logic is to orchestrate its nodes.
- `post()` receives `None` for `exec_res` and should retrieve flow execution results from the shared store.

**Basic Flow Nesting:**

```python
node_a >> node_b
subflow = Flow(start=node_a)
subflow >> node_c
parent_flow = Flow(start=subflow)
```

When `parent_flow.run()` executes:

- It starts `subflow`.
- `subflow` runs through its nodes (`node_a->node_b`).
- After `subflow` completes, execution continues to `node_c`.

**Example: Order Processing Pipeline**

```python
# Payment processing sub-flow
validate_payment >> process_payment >> payment_confirmation
payment_flow = Flow(start=validate_payment)

# Inventory sub-flow
check_stock >> reserve_items >> update_inventory
inventory_flow = Flow(start=check_stock)

# Shipping sub-flow
create_label >> assign_carrier >> schedule_pickup
shipping_flow = Flow(start=create_label)

# Connect the flows into a main order pipeline
payment_flow >> inventory_flow >> shipping_flow
order_pipeline = Flow(start=payment_flow)
order_pipeline.run(shared_data)
```

This creates a modular, clean separation of concerns with a clear execution path.

#### Communication

In `pocketflow`, Nodes and Flows communicate through two primary mechanisms: the **Shared Store** and **Params**. Understanding these communication methods is crucial for effectively programming with `pocketflow`.

##### 1. Shared Store

**Overview:**

- The Shared Store is a global data structure, typically an in-memory dictionary, that all Nodes can read from (`prep()`) and write to (`post()`).
- It is ideal for storing data results, large content, or any information that multiple Nodes need to access.
- Design and populate the data structure beforehand based on your application requirements.

**Example:**

```python
shared = {"data": {}, "summary": {}, "config": {...}}

class LoadData(Node):
    def post(self, shared, prep_res, exec_res):
        shared["data"] = "Some text content"
        return None

class Summarize(Node):
    def prep(self, shared):
        return shared["data"]

    def exec(self, prep_res):
        prompt = f"Summarize: {prep_res}"
        summary = call_llm(prompt)
        return summary

    def post(self, shared, prep_res, exec_res):
        shared["summary"] = exec_res
        return "default"

load_data = LoadData()
summarize = Summarize()
load_data >> summarize
flow = Flow(start=load_data)
shared = {}
flow.run(shared)
```

**Flow:**

- `LoadData` writes to `shared["data"]`.
- `Summarize` reads from `shared["data"]`, summarizes the content, and writes to `shared["summary"]`.

##### 2. Params

**Overview:**

- Params are a local, ephemeral dictionary passed to each Node by its parent Flow. They serve as identifiers for tasks and are immutable during a Node’s run cycle.
- Params are useful for storing per-Node or per-Flow configuration that doesn’t need to be in the Shared Store, such as filenames or numeric IDs.
- Set params using `set_params()`. Only set the uppermost Flow’s params, as child Node params will be overwritten by the parent Flow.

**Example:**

```python
class SummarizeFile(Node):
    def prep(self, shared):
        filename = self.params["filename"]
        return shared["data"].get(filename, "")

    def exec(self, prep_res):
        prompt = f"Summarize: {prep_res}"
        return call_llm(prompt)

    def post(self, shared, prep_res, exec_res):
        filename = self.params["filename"]
        shared["summary"][filename] = exec_res
        return "default"

# Set params
node = SummarizeFile()
node.set_params({"filename": "doc1.txt"})
node.run(shared)

# Create Flow
flow = Flow(start=node)
flow.set_params({"filename": "doc2.txt"})
flow.run(shared)  # The node summarizes doc2, not doc1
```

**Flow:**

- `SummarizeFile` Node uses `params["filename"]` to identify which file to summarize.
- Params are set directly on the Node for testing (`doc1.txt`) and then overwritten by the Flow (`doc2.txt`).

##### Key Points

- **Shared Store:** Use for data that needs to be accessed by multiple Nodes. Design the data structure based on your application’s needs.
- **Params:** Use for per-Node or per-Flow configuration, such as identifiers. Params are immutable and overwritten by parent Flows.

## Commands

Here are commands you may want to run after writing code:

- lint project: `make lint`
- format project: `make format`
