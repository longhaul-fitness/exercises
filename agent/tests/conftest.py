import pytest


# Define a custom marker for LLM tests
def pytest_addoption(parser):
    parser.addoption(
        "--run-llm",
        action="store_true",
        default=False,
        help="Run tests that call LLM APIs",
    )
    parser.addoption(
        "--show-output",
        action="store_true",
        default=False,
        help="Show stdout/stderr output for all tests",
    )


def pytest_configure(config):
    config.addinivalue_line("markers", "llm: mark test as requiring LLM API access")

    # Configure pytest to show output if requested
    if config.getoption("--show-output"):
        config.option.capture = "no"


def pytest_collection_modifyitems(config, items):
    if not config.getoption("--run-llm"):
        skip_llm = pytest.mark.skip(reason="Need --run-llm option to run")
        for item in items:
            if "llm" in item.keywords:
                item.add_marker(skip_llm)
