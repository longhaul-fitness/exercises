import json
import os
import sys
from datetime import datetime
from typing import Any, Dict, List, Optional, Tuple

import plotly.express as px
import plotly.graph_objects as go

# Add the utils directory to the Python path
sys.path.append(os.path.join(os.path.dirname(__file__), "../utils"))

from experiment_utils import find_latest_files, load_json_data


def open_chart(file_path: str):
    """Open the chart file using the system's default application."""
    import platform
    import subprocess

    system = platform.system()
    try:
        if system == "Darwin":  # macOS
            subprocess.run(["open", file_path], check=True)
        elif system == "Windows":
            subprocess.run(["start", file_path], shell=True, check=True)
        elif system == "Linux":
            subprocess.run(["xdg-open", file_path], check=True)
        else:
            print(f"Unsupported system: {system}. Cannot auto-open chart.")
    except subprocess.CalledProcessError as e:
        print(f"Failed to open chart: {e}")
    except FileNotFoundError:
        print("Could not find system command to open chart.")


def process_evaluation_results(
    results: List[Dict[str, Any]],
) -> Tuple[Dict[str, Dict[str, float]], Dict[str, int]]:
    """
    Process evaluation results to calculate median cost and quality per model.

    Returns:
        Tuple of (model_metrics, error_counts) where:
        - model_metrics: {model_name: {"cost": median_cost, "quality": median_f1_score}}
        - error_counts: {model_name: error_count}
    """
    model_data = {}
    error_counts = {}

    for result in results:
        model = result["model"]

        if model not in model_data:
            model_data[model] = {"costs": [], "qualities": []}
            error_counts[model] = 0

        # Check if evaluation failed
        if result["evaluation"]["error"] is not None:
            error_counts[model] += 1
            continue

        # Extract cost and quality (f1_score)
        try:
            cost = float(result["metadata"]["cost"])
            quality = result["evaluation"]["f1_score"]

            model_data[model]["costs"].append(cost)
            model_data[model]["qualities"].append(quality)
        except (ValueError, TypeError, KeyError):
            error_counts[model] += 1

    # Calculate medians
    model_metrics = {}
    for model, data in model_data.items():
        if data["costs"] and data["qualities"]:
            import statistics

            model_metrics[model] = {
                "cost": statistics.median(data["costs"]),
                "quality": statistics.median(data["qualities"]),
            }

    return model_metrics, error_counts


def create_pareto_chart(
    model_metrics: Dict[str, Dict[str, float]], title: str
) -> go.Figure:
    """Create a Pareto optimization chart showing cost vs quality for each model."""

    models = list(model_metrics.keys())
    costs = [model_metrics[model]["cost"] for model in models]
    qualities = [model_metrics[model]["quality"] for model in models]

    # Create scatter plot with different colors for each model
    fig = go.Figure()

    # Use Plotly's default color sequence for consistent colors
    colors = px.colors.qualitative.Plotly

    for i, model in enumerate(models):
        color = colors[
            i % len(colors)
        ]  # Cycle through colors if more models than colors

        fig.add_trace(
            go.Scatter(
                x=[qualities[i]],
                y=[costs[i]],
                mode="markers",
                marker=dict(size=10, color=color, line=dict(width=2, color=color)),
                name=model,
                hovertemplate="<b>%{fullData.name}</b><br>"
                + "Quality (F1 Score): %{x:.4f}<br>"
                + "Cost: %{y:.10f}<br>"
                + "<extra></extra>",
            )
        )

    # Update layout
    fig.update_layout(
        title=dict(text=title, x=0.5, font=dict(size=16)),
        xaxis_title="Quality (F1 Score)",
        yaxis_title="Cost",
        width=800,
        height=600,
        showlegend=True,
        legend=dict(orientation="v", yanchor="top", y=1, xanchor="left", x=1.02),
        template="plotly_white",
    )

    # Add grid
    fig.update_xaxes(showgrid=True, gridwidth=1, gridcolor="rgba(128, 128, 128, 0.2)")
    fig.update_yaxes(showgrid=True, gridwidth=1, gridcolor="rgba(128, 128, 128, 0.2)")

    return fig


def generate_chart_title(source_filename: str) -> str:
    """Generate a descriptive title for the chart based on the source file."""
    base_name = os.path.basename(source_filename)

    # Extract timestamp if present
    timestamp_match = base_name.split("_")[0]
    try:
        # Try to parse timestamp
        dt = datetime.strptime(timestamp_match, "%Y-%m-%dT%H%M%S")
        date_str = dt.strftime("%Y-%m-%d %H:%M")
    except ValueError:
        date_str = "Unknown Date"

    return f"FlexibilityStepsNode: Cost vs Quality Pareto Analysis ({date_str})"


def save_chart(fig: go.Figure, source_filename: str) -> str:
    """Save chart in PNG format with timestamped filename."""

    # Create timestamp for output files
    timestamp = datetime.now().strftime("%Y-%m-%dT%H%M%S")

    # Create results directory
    results_dir = os.path.join(
        os.path.dirname(__file__), "../results/flexibility_steps_node/reports"
    )
    os.makedirs(results_dir, exist_ok=True)

    # Generate base filename from source
    source_base = os.path.splitext(os.path.basename(source_filename))[0]
    base_filename = f"{timestamp}_{source_base}_pareto"

    # Save PNG (static)
    png_path = os.path.join(results_dir, f"{base_filename}.png")
    fig.write_image(png_path, width=800, height=600, scale=2)

    return png_path


def run_flexibility_steps_reporter(
    input_path: Optional[str] = None, use_stdin: bool = False
) -> Tuple[go.Figure, str]:
    """
    Generate Pareto optimization report for FlexibilityStepsNode evaluation results.

    Args:
        input_path: Path to specific evaluation JSON file
        use_stdin: Whether to read from stdin

    Returns:
        Tuple of (plotly_figure, source_filename)
    """

    # Load evaluation results
    if use_stdin:
        # Read from stdin
        stdin_data = sys.stdin.read()
        results = json.loads(stdin_data)
        source_filename = "stdin"
    elif input_path:
        # Load specific file
        results = load_json_data(input_path)
        source_filename = input_path
    else:
        # Auto-discover latest evaluation file
        eval_files = find_latest_files("flexibility_steps_node", "evaluations")
        if not eval_files:
            raise ValueError("No evaluation files found. Run the evaluator first.")

        source_filename = eval_files[0]
        results = load_json_data(source_filename)
        print(f"Loaded evaluation results from: {source_filename}")

    if not results:
        raise ValueError("No evaluation results found in the input")

    # Process results
    model_metrics, error_counts = process_evaluation_results(results)

    if not model_metrics:
        raise ValueError("No valid model metrics found after processing results")

    # Print summary of errors
    total_errors = sum(error_counts.values())
    if total_errors > 0:
        print(f"\nExcluded {total_errors} failed evaluations:")
        for model, count in error_counts.items():
            if count > 0:
                print(f"  {model}: {count} failures")

    # Generate chart
    title = generate_chart_title(source_filename)
    fig = create_pareto_chart(model_metrics, title)

    # Print summary
    print(f"\nGenerated Pareto analysis for {len(model_metrics)} models:")
    for model, metrics in model_metrics.items():
        print(
            f"  {model}: Quality={metrics['quality']:.4f}, Cost={metrics['cost']:.10f}"
        )

    return fig, source_filename


def main():
    """CLI interface for running the flexibility steps node reporter."""
    import argparse

    parser = argparse.ArgumentParser(
        description="Generate Pareto optimization report for FlexibilityStepsNode"
    )
    parser.add_argument(
        "--input-path", type=str, help="Path to specific evaluation JSON file"
    )
    parser.add_argument(
        "--stdin", action="store_true", help="Read evaluation results from stdin"
    )
    parser.add_argument("--output-png", type=str, help="Output path for PNG file")
    parser.add_argument("--show", action="store_true", help="Display chart in browser")
    parser.add_argument(
        "--open-chart",
        action="store_true",
        help="Automatically open the chart after saving",
    )

    args = parser.parse_args()

    # Validate arguments
    if args.input_path and args.stdin:
        parser.error("Cannot specify both --input-path and --stdin")

    try:
        # Generate report
        fig, source_filename = run_flexibility_steps_reporter(
            input_path=args.input_path, use_stdin=args.stdin
        )

        # Handle output
        if args.output_png:
            # Use custom output path
            fig.write_image(args.output_png, width=800, height=600, scale=2)
            print(f"Chart saved to: {args.output_png}")
            chart_path = args.output_png
        else:
            # Use default timestamped path
            png_path = save_chart(fig, source_filename)
            print(f"Chart saved to: {png_path}")
            chart_path = png_path

        # Show in browser if requested
        if args.show:
            fig.show()

        # Open chart if requested
        if args.open_chart:
            open_chart(chart_path)

    except Exception as e:
        print(f"Error generating report: {e}", file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()
