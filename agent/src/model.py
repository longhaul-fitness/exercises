from typing import Dict

from log import get_logger

# Get module-specific logger
LOGGER = get_logger(__name__)


class Model:
    """
    Model abstraction for managing LLM model configurations.
    Provides a centralized way to get model instances based on node names.
    """

    def __init__(
        self, models_config: Dict[str, str], default_model: str = "nova-micro"
    ):
        """
        Initialize the Model abstraction with a models configuration.

        Args:
            models_config: Dictionary mapping node names to model types
            default_model: Default model to use when no specific model is configured
        """
        self.config = models_config
        self.default_model = default_model

    def get_model(self, node_name: str) -> str:
        """
        Get the appropriate model name for a given node.

        Args:
            node_name: Name of the node requesting a model

        Returns:
            A model name string to use with litellm
        """
        model_name = self.config.get(node_name)

        if not model_name:
            LOGGER.warning(
                f"No model configuration found for node '{node_name}'. "
                f"Using default model: {self.default_model}"
            )
            model_name = self.default_model

        return model_name
