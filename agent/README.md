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
├── tests/                        # Traditional pytest unit tests
│   ├── test_nodes.py             # Node testing with LLM evaluation
│   └── conftest.py               # Test configuration
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

### Testing

Run traditional unit tests:
```bash
pytest tests/
```
