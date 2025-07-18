from typing import Dict, Optional, Tuple

import litellm

from log import get_logger


def call_llm(
    model_name: str, prompt: str, system_prompt: Optional[str] = None
) -> Tuple[str, float]:
    """
    Make an LLM call and return the response with cost information.

    Args:
        model_name: The specific model name to use for the call
        prompt: The user prompt to send to the LLM
        system_prompt: Optional system prompt

    Returns:
        Tuple of (response_content, cost)
    """
    messages = []
    if system_prompt:
        messages.append({"role": "system", "content": system_prompt})
    messages.append({"role": "user", "content": prompt})

    try:
        response = litellm.completion(model=model_name, messages=messages)

        # Extract cost information
        cost = response._hidden_params.get("response_cost", 0)
        result = response.choices[0].message.content.strip()

        return result, cost

    except Exception as e:
        logger = get_logger(__name__)
        logger.error(f"LLM call failed with model {model_name}: {e}")
        raise


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
            logger = get_logger(__name__)
            logger.warning(
                f"No model configuration found for node '{node_name}'. "
                f"Using default model: {self.default_model}"
            )
            model_name = self.default_model

        return model_name
