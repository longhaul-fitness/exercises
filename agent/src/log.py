import json
import logging
import os
import sys

# Global flag to track if logging has been configured
_configured = False


def _find_config():
    """Find config.json by walking up from current directory."""
    current = os.getcwd()
    while current != os.path.dirname(current):  # Not at filesystem root
        config_path = os.path.join(current, "config.json")
        if os.path.exists(config_path):
            return config_path
        current = os.path.dirname(current)
    return None


def _auto_setup():
    """Automatically setup logging on first use."""
    global _configured
    if _configured:
        return

    # Try to find config.json by walking up directories
    config_path = _find_config()
    level = "INFO"

    if config_path:
        try:
            with open(config_path) as f:
                config = json.load(f)
                level = config.get("logging", {}).get("level", "INFO")
        except (json.JSONDecodeError, KeyError, FileNotFoundError):
            pass  # Fall back to default level

    # Configure logging
    logging.basicConfig(
        level=getattr(logging, level.upper(), logging.INFO),
        format="%(asctime)s %(levelname).1s %(module)s:%(lineno)d %(message)s",
        datefmt="%Y-%m-%dT%H:%M:%S%z",
        handlers=[logging.StreamHandler(sys.stdout)],
        force=True,  # Override any existing configuration
    )
    _configured = True


def get_logger(name: str):
    """Get logger - automatically configures logging if needed."""
    _auto_setup()  # This happens automatically on first use
    return logging.getLogger(name)
