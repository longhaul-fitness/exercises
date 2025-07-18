import json
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
                # Config file not found, use defaults silently
                return

            with open(self.config_path, "r") as f:
                self.config = json.load(f)

            if not isinstance(self.config, dict):
                # Config file must contain a JSON object/dictionary
                self.config = {}

        except json.JSONDecodeError:
            # Failed to parse config file, use defaults
            self.config = {}
        except Exception:
            # Error loading config file, use defaults
            self.config = {}

    def get_models_config(self) -> Dict[str, str]:
        """Get models configuration section."""
        return self.config.get("models", {})
