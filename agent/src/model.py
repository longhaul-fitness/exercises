import json
import logging
import os
from typing import Any, Dict

import llm

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class Model:
    """
    Model abstraction for managing LLM model configurations.
    Provides a centralized way to get model instances based on node names.
    """

    def __init__(self, config_path: str):
        """
        Initialize the Model abstraction with a configuration file.

        Args:
            config_path: Path to the JSON configuration file mapping node names to model types
        """
        self.config_path = config_path
        self.config: Dict[str, str] = {}
        self.default_model = "nova-micro"
        self._load_config()

    def _load_config(self) -> None:
        """Load the configuration file."""
        try:
            if not os.path.exists(self.config_path):
                logger.warning(
                    f"Config file not found at {self.config_path}. Using default models."
                )
                return

            with open(self.config_path, "r") as f:
                self.config = json.load(f)

            if not isinstance(self.config, dict):
                logger.error("Config file must contain a JSON object/dictionary.")
                self.config = {}

        except json.JSONDecodeError:
            logger.error(
                f"Failed to parse config file at {self.config_path}. Using default models."
            )
            self.config = {}
        except Exception as e:
            logger.error(f"Error loading config file: {str(e)}. Using default models.")
            self.config = {}

    def get_model(self, node_name: str) -> Any:
        """
        Get the appropriate model for a given node.

        Args:
            node_name: Name of the node requesting a model

        Returns:
            An LLM model instance
        """
        model_name = self.config.get(node_name)

        if not model_name:
            logger.warning(
                f"No model configuration found for node '{node_name}'. "
                f"Using default model: {self.default_model}"
            )
            model_name = self.default_model

        try:
            return llm.get_model(model_name)
        except Exception as e:
            logger.error(
                f"Failed to load model '{model_name}': {str(e)}. "
                f"Falling back to default model: {self.default_model}"
            )
            return llm.get_model(self.default_model)
