import json
import logging
import os
from typing import Any, Dict


class Configuration:
    """
    Configuration manager for the application.
    Handles loading and providing access to various configuration sections.
    """

    def __init__(self, config_path: str):
        """
        Initialize the Configuration with a configuration file.

        Args:
            config_path: Path to the JSON configuration file
        """
        self.config_path = config_path
        self.config: Dict[str, Any] = {}
        self._load_config()

    def _load_config(self) -> None:
        """Load the configuration file."""
        try:
            if not os.path.exists(self.config_path):
                logging.warning(
                    f"Config file not found at {self.config_path}. Using defaults."
                )
                return

            with open(self.config_path, "r") as f:
                self.config = json.load(f)

            if not isinstance(self.config, dict):
                logging.error("Config file must contain a JSON object/dictionary.")
                self.config = {}

        except json.JSONDecodeError:
            logging.error(
                f"Failed to parse config file at {self.config_path}. Using defaults."
            )
            self.config = {}
        except Exception as e:
            logging.error(f"Error loading config file: {str(e)}. Using defaults.")
            self.config = {}

    def get_logging_config(self) -> Dict[str, Any]:
        """Get logging configuration section."""
        return self.config.get("logging", {})

    def get_models_config(self) -> Dict[str, str]:
        """Get models configuration section."""
        return self.config.get("models", {})
