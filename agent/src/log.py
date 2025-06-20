import logging
import sys


def setup_logging(level=logging.INFO):
    """Configure logging for the application.

    Args:
        level: The logging level to use (default: INFO)

    Returns:
        The root logger instance
    """
    # Setting the formatter with timezone aware timestamp
    logging.basicConfig(
        level=level,
        format="%(asctime)s %(levelname).1s %(module)s:%(lineno)d %(message)s",
        datefmt="%Y-%m-%dT%H:%M:%S%z",
        handlers=[logging.StreamHandler(sys.stdout)],
    )

    # Return the root logger
    return logging.getLogger()


def get_logger(name):
    """Get a logger for a specific module.

    Args:
        name: The name of the module (typically __name__)

    Returns:
        A logger instance for the specified module
    """
    return logging.getLogger(name)


def configure_from_dict(config_dict):
    """Configure logging based on a configuration dictionary.

    Args:
        config_dict: Dictionary containing logging configuration

    Returns:
        The root logger instance
    """
    level_name = config_dict.get("level", "INFO")
    level = getattr(logging, level_name, logging.INFO)

    return setup_logging(level=level)
