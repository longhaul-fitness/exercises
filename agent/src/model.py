import json
import os
from typing import Optional, Tuple

import litellm

from log import get_logger

# Global cache for models config
_models_config = None


def _find_config():
    """Find config.json by walking up from the script's directory."""
    # Start from the directory containing this script file
    current = os.path.dirname(os.path.abspath(__file__))
    while current != os.path.dirname(current):  # Not at filesystem root
        config_path = os.path.join(current, "config.json")
        if os.path.exists(config_path):
            return config_path
        current = os.path.dirname(current)
    return None


def _load_models_config():
    """Load models config section from config.json - cached after first call."""
    global _models_config
    if _models_config is not None:
        return _models_config

    config_path = _find_config()
    _models_config = {}

    if config_path:
        try:
            with open(config_path) as f:
                config = json.load(f)
                _models_config = config.get("models", {})
        except (json.JSONDecodeError, KeyError, FileNotFoundError):
            pass  # Fall back to empty config

    return _models_config


def get_model_for_node(
    node_name: str, default_model: str = "bedrock/amazon.nova-micro-v1:0"
) -> str:
    """Get model name for a node - auto-configures on first use."""
    models_config = _load_models_config()
    model_name = models_config.get(node_name)

    if not model_name:
        logger = get_logger(__name__)
        logger.warning(
            f"No model configuration found for node '{node_name}'. "
            f"Using default model: {default_model}"
        )
        model_name = default_model

    return model_name


def call_llm(
    model_name: str,
    prompt: str,
    system_prompt: Optional[str] = None,
    json_schema: Optional[dict] = None,
) -> Tuple[str, float]:
    """
    Make an LLM call and return the response with cost information.

    Args:
        model_name: The specific model name to use for the call
        prompt: The user prompt to send to the LLM
        system_prompt: Optional system prompt
        json_schema: Optional JSON schema for structured output

    Returns:
        Tuple of (response_content, cost)
    """
    messages = []
    if system_prompt:
        messages.append({"role": "system", "content": system_prompt})
    messages.append({"role": "user", "content": prompt})

    try:
        completion_kwargs = {"model": model_name, "messages": messages}

        if json_schema:
            completion_kwargs["response_format"] = {
                "type": "json_schema",
                "json_schema": json_schema,
            }

        response = litellm.completion(**completion_kwargs)

        # Extract cost information
        cost = response._hidden_params.get("response_cost", 0)
        result = response.choices[0].message.content.strip()

        return result, cost

    except Exception as e:
        logger = get_logger(__name__)
        logger.error(f"LLM call failed with model {model_name}: {e}")
        raise
