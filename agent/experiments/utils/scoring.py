import logging
import os
import sys
from dataclasses import dataclass

import numpy as np
from fuzzywuzzy import fuzz
from sklearn.metrics.pairwise import cosine_similarity

# Add the src directory to the Python path
sys.path.append(os.path.join(os.path.dirname(__file__), "../src"))

LOGGER = logging.getLogger(__name__)


def calculate_f1(precision: float, recall: float) -> float:
    """Calculate F1 score as the harmonic mean of precision and recall.

    Args:
        precision: Precision score (0.0 to 1.0)
        recall: Recall score (0.0 to 1.0)

    Returns:
        F1 score (0.0 to 1.0). 0.0 if both precision and recall are zero
    """
    if precision + recall == 0:
        return 0.0

    return 2 * (precision * recall) / (precision + recall)


def normalize(
    value: float | np.ndarray, min_val: float, max_val: float
) -> float | np.ndarray:
    """Normalize values to [0, 1] range using min-max normalization.

    Args:
        value: Value or array to normalize
        min_val: Minimum value in the original range
        max_val: Maximum value in the original range

    Returns:
        Normalized value(s) in [0, 1] range

    Raises:
        ZeroDivisionError: If min_val equals max_val
    """
    if min_val == max_val:
        raise ZeroDivisionError("Cannot normalize when min_val equals max_val")

    return (value - min_val) / (max_val - min_val)


@dataclass
class FuzzyMetrics:
    f1: float
    precision: float
    recall: float


def calculate_fuzzy_metrics(
    true_list: list[str],
    pred_list: list[str],
    embedding_client: object,
    min_sim: float = 0.0,
    max_sim: float = 1.0,
) -> FuzzyMetrics:
    """Calculate precision, recall, and F1 using semantic similarity instead of exact matches.

    Uses cosine similarity between text embeddings to measure how well predicted strings
    match ground truth strings. This allows for partial credit when predictions are
    semantically similar but not identical to the expected output.

    Args:
        true_list: Ground truth strings to compare against
        pred_list: Predicted strings to evaluate
        embedding_client: Client with get_embedding(text) method for generating embeddings
        min_sim: Minimum possible cosine similarity (default: 0.0)
        max_sim: Maximum possible cosine similarity (default: 1.0)

    Returns:
        FuzzyMetrics containing:
            - precision: Average of best similarity scores for each prediction
            - recall: Average of best similarity scores for each ground truth
            - f1: Harmonic mean of precision and recall

    Note:
        Similarity scores are normalized using min_sim and max_sim before averaging.
        Empty strings are filtered out before processing.
    """
    LOGGER.debug(
        f"Calculating fuzzy Precision, Recall, and F1.\nTrue labels: {true_list}\nPredicted labels: {pred_list}"
    )
    default_metrics = FuzzyMetrics(f1=0.0, precision=0.0, recall=0.0)
    # Filter empty strings
    true_list = [el for el in true_list if len(el) > 0]
    pred_list = [el for el in pred_list if len(el) > 0]

    if len(true_list) == 0 or len(pred_list) == 0:
        msg = "Cannot calculate fuzzy metrics: empty input lists detected. Returning zero scores."
        LOGGER.warning(msg)
        return default_metrics

    # Get embeddings for all strings (preserving duplicates for proper similarity calculation)
    true_embeddings = [embedding_client.get_embedding(text) for text in set(true_list)]
    pred_embeddings = [embedding_client.get_embedding(text) for text in set(pred_list)]

    # Calculate cosine similarity between true and predicted embeddings
    similarities = cosine_similarity(true_embeddings, pred_embeddings)
    normalized_similarities = normalize(
        value=similarities,
        min_val=min_sim,
        max_val=max_sim,
    )

    # Get max similarity for each predicted term's embedding and average them
    max_similarities_pred = np.max(normalized_similarities, axis=0)
    fuzzy_precision = np.mean(max_similarities_pred)

    # Get max similarity for each true term's embedding and average them
    max_similarities_true = np.max(normalized_similarities, axis=1)
    fuzzy_recall = np.mean(max_similarities_true)

    # Calculate fuzzy F1 score
    fuzzy_f1 = calculate_f1(precision=fuzzy_precision, recall=fuzzy_recall)

    return FuzzyMetrics(f1=fuzzy_f1, precision=fuzzy_precision, recall=fuzzy_recall)


def calculate_semantic_similarity(
    expected: str, actual: str, embedding_client
) -> float:
    """Calculate cosine similarity between two strings using embeddings.

    Args:
        expected: The expected/ground truth string
        actual: The actual/predicted string
        embedding_client: Client with get_embedding(text) method

    Returns:
        Cosine similarity score between 0.0 and 1.0
    """
    expected_embedding = embedding_client.get_embedding(expected)
    actual_embedding = embedding_client.get_embedding(actual)

    similarity = cosine_similarity([expected_embedding], [actual_embedding])[0][0]
    return float(similarity)


def calculate_lexical_similarity(expected: str, actual: str) -> dict:
    """Calculate various lexical similarity scores using fuzzywuzzy.

    Args:
        expected: The expected/ground truth string
        actual: The actual/predicted string

    Returns:
        Dictionary with lexical similarity scores (all between 0.0 and 1.0):
        - ratio: Overall similarity
        - partial_ratio: Substring matching
        - token_sort_ratio: Word order independent
        - token_set_ratio: Set-based comparison
    """
    if fuzz is None:
        LOGGER.warning("fuzzywuzzy not available, returning zero scores")
        return {
            "ratio": 0.0,
            "partial_ratio": 0.0,
            "token_sort_ratio": 0.0,
            "token_set_ratio": 0.0,
        }

    return {
        "ratio": fuzz.ratio(expected, actual) / 100.0,
        "partial_ratio": fuzz.partial_ratio(expected, actual) / 100.0,
        "token_sort_ratio": fuzz.token_sort_ratio(expected, actual) / 100.0,
        "token_set_ratio": fuzz.token_set_ratio(expected, actual) / 100.0,
    }


def calculate_comprehensive_similarity(
    expected: str, actual: str, embedding_client
) -> dict:
    """Calculate both semantic and lexical similarity scores for two strings.

    Args:
        expected: The expected/ground truth string
        actual: The actual/predicted string
        embedding_client: Client with get_embedding(text) method

    Returns:
        Dictionary containing:
        - semantic_similarity: Cosine similarity using embeddings (0.0 to 1.0)
        - lexical_similarity: Dictionary of fuzzywuzzy scores
        - combined_score: Weighted combination (70% semantic, 30% lexical token_sort_ratio)
    """
    # Semantic similarity
    semantic_score = calculate_semantic_similarity(expected, actual, embedding_client)

    # Lexical similarity
    lexical_scores = calculate_lexical_similarity(expected, actual)

    # Weighted combination (adjust weights based on your needs)
    combined_score = (0.7 * semantic_score) + (0.3 * lexical_scores["token_sort_ratio"])

    return {
        "semantic_similarity": semantic_score,
        "lexical_similarity": lexical_scores,
        "combined_score": combined_score,
    }
