# Exercise AI Agent

## Purpose

This project uses LLMs to detail exercises. Common details include the exercise's name, steps to complete, and activated muscles.

## Project Structure

This project follows the recommended PocketFlow structure for LLM applications:

```
agent/
├── src/                          # Core application code
│   ├── main.py                   # Entry point and CLI handling
│   ├── flows.py                  # Flow creation and orchestration
│   ├── nodes.py                  # All PocketFlow node definitions
│   ├── config.py                 # Configuration management
│   ├── model.py                  # LLM model abstraction
│   └── log.py                    # Logging utilities
├── experiments/                  # LLM experimentation framework
│   └── runners/                  # Experiment execution
│   └── evaluators/               # Experiment evaluation
│   └── reporters/                # Reports via notebooks
├── prompts/                      # LLM prompt templates
│   ├── flexibility-exercise-name.md
│   ├── flexibility-exercise-steps.md
│   └── flexibility-exercise-muscles.md
│   └── ...
└── pyproject.toml                # Python project configuration
```

### Key Files

- **`main.py`** - Command-line interface that accepts exercise queries and runs the complete flow
- **`flows.py`** - Defines how nodes connect together to process exercise requests
- **`nodes.py`** - Contains all the individual processing units (nodes) that handle different aspects like categorization, step generation, and muscle identification
- **`config.py`** - Manages application configuration including logging and model settings
- **`model.py`** - Abstracts LLM model selection and configuration

### Usage

Run the agent with an exercise query:

```bash
cd agent/src
python main.py "hamstring stretch"
```

The system will:

1. Categorize the exercise (strength, cardio, or flexibility)
2. Generate detailed steps
3. Identify target muscles
4. Save the complete exercise data to a JSON file

### Runners, Evaluators, and Reporters

The experiments framework consists of three main components that work together to test and analyze LLM performance:

#### Runners

Runners execute individual nodes against test datasets and save raw results. Each runner corresponds to a specific node type:

```bash
# Flexibility exercises
python experiments/runners/flexibility_name_node.py
python experiments/runners/flexibility_steps_node.py  
python experiments/runners/flexibility_muscles_node.py

# Strength exercises
python experiments/runners/strength_name_node.py
python experiments/runners/strength_steps_node.py
python experiments/runners/strength_muscles_node.py
```

Runners support various options:
- `--model MODEL_NAME` - Test a specific model
- `--models MODEL1 MODEL2` - Test multiple models
- `--test-case-id UUID` - Run a specific test case
- `--data-path PATH` - Use custom test data
- `--output PATH` - Custom output file

#### Evaluators

Evaluators analyze runner results using semantic and lexical similarity scoring:

```bash
# Flexibility exercises  
python experiments/evaluators/flexibility_name_node.py
python experiments/evaluators/flexibility_steps_node.py
python experiments/evaluators/flexibility_muscles_node.py

# Strength exercises
python experiments/evaluators/strength_name_node.py
python experiments/evaluators/strength_steps_node.py
python experiments/evaluators/strength_muscles_node.py
```

Evaluator options:
- `--input-path PATH` - Evaluate specific runner results
- `--test-case-id UUID` - Evaluate specific test case
- `--embedding-model MODEL` - Custom embedding model for semantic similarity
- `--output PATH` - Custom output file
- `--stdout` - Output results to console

#### Reporters

Reporters generate Pareto optimization charts showing cost vs quality tradeoffs:

```bash
# Flexibility exercises
python experiments/reporters/flexibility_name_node.py
python experiments/reporters/flexibility_steps_node.py
python experiments/reporters/flexibility_muscles_node.py

# Strength exercises  
python experiments/reporters/strength_name_node.py
python experiments/reporters/strength_steps_node.py
python experiments/reporters/strength_muscles_node.py
```

Reporter options:
- `--input-path PATH` - Generate report from specific evaluation file
- `--stdin` - Read evaluation data from stdin
- `--output-png PATH` - Custom PNG output path
- `--show` - Display chart in browser
- `--open-chart` - Automatically open saved chart

#### Typical Workflow

1. **Run experiments**: `python experiments/runners/flexibility_name_node.py`
2. **Evaluate results**: `python experiments/evaluators/flexibility_name_node.py` 
3. **Generate report**: `python experiments/reporters/flexibility_name_node.py`

Results are automatically organized in `experiments/results/` with timestamped directories for runs, evaluations, and reports.
