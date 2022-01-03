import numpy as np
import matplotlib.pyplot as plt
import mpld3

from pywebvue import App
from pywebvue.modules import Matplotlib

# -----------------------------------------------------------------------------
# App initialization
# -----------------------------------------------------------------------------

app = App("Matplotlib Demo")
app.state = {
    "spec": None,
    "active": "FirstDemo",
    "examples": [
        {"text": "First Demo", "value": "FirstDemo"},
        {"text": "Multi Lines", "value": "MultiLines"},
        {"text": "Dots and Points", "value": "DotsandPoints"},
        {"text": "Moving Window Average", "value": "MovingWindowAverage"},
        {"text": "Subplots", "value": "Subplots"},
    ],
}
app.enable_module(Matplotlib)

# -----------------------------------------------------------------------------


@app.change("active")
def update_chart():
    chart_name = app.get("active")
    globals()[chart_name]()


# -----------------------------------------------------------------------------
# Chart examples from:
#   - http://jakevdp.github.io/blog/2013/12/19/a-d3-viewer-for-matplotlib/
# -----------------------------------------------------------------------------


def FirstDemo():
    fig, ax = plt.subplots()
    np.random.seed(0)
    ax.plot(
        np.random.normal(size=100), np.random.normal(size=100), "or", ms=10, alpha=0.3
    )
    ax.plot(
        np.random.normal(size=100), np.random.normal(size=100), "ob", ms=20, alpha=0.1
    )

    ax.set_xlabel("this is x")
    ax.set_ylabel("this is y")
    ax.set_title("Matplotlib Plot Rendered in D3!", size=14)
    ax.grid(color="lightgray", alpha=0.7)

    # Push chart to client
    app.set("spec", mpld3.fig_to_dict(fig))


# -----------------------------------------------------------------------------


def MultiLines():
    fig, ax = plt.subplots()
    x = np.linspace(0, 10, 1000)
    for offset in np.linspace(0, 3, 7):
        ax.plot(x, 0.9 * np.sin(x - offset), lw=5, alpha=0.4)
    ax.set_ylim(-1.2, 1.0)
    ax.text(5, -1.1, "Here are some curves", size=18)
    ax.grid(color="lightgray", alpha=0.7)

    # Push chart to client
    app.set("spec", mpld3.fig_to_dict(fig))


# -----------------------------------------------------------------------------


def DotsandPoints():
    fig, ax = plt.subplots()
    ax.plot(
        np.random.rand(20),
        "-o",
        alpha=0.5,
        color="black",
        linewidth=5,
        markerfacecolor="green",
        markeredgecolor="lightgreen",
        markersize=20,
        markeredgewidth=10,
    )
    ax.grid(True, color="#EEEEEE", linestyle="solid")
    ax.set_xlim(-2, 22)
    ax.set_ylim(-0.1, 1.1)

    # Push chart to client
    app.set("spec", mpld3.fig_to_dict(fig))


# -----------------------------------------------------------------------------


def MovingWindowAverage():
    np.random.seed(0)
    t = np.linspace(0, 10, 300)
    x = np.sin(t)
    dx = np.random.normal(0, 0.3, 300)

    kernel = np.ones(25) / 25.0
    x_smooth = np.convolve(x + dx, kernel, mode="same")

    fig, ax = plt.subplots()
    ax.plot(t, x + dx, linestyle="", marker="o", color="black", markersize=3, alpha=0.3)
    ax.plot(t, x_smooth, "-k", lw=3)
    ax.plot(t, x, "--k", lw=3, color="blue")

    # Push chart to client
    app.set("spec", mpld3.fig_to_dict(fig))


# -----------------------------------------------------------------------------


def Subplots():
    fig = plt.figure(figsize=(8, 6))
    fig.subplots_adjust(hspace=0.3)

    np.random.seed(0)

    for i in range(1, 5):
        ax = fig.add_subplot(2, 2, i)
        color = np.random.random(3)
        ax.plot(np.random.random(30), lw=2, c=color)
        ax.set_title("RGB = ({0:.2f}, {1:.2f}, {2:.2f})".format(*color), size=14)
        ax.grid(color="lightgray", alpha=0.7)

    # Push chart to client
    app.set("spec", mpld3.fig_to_dict(fig))


# -----------------------------------------------------------------------------
# Start server
# -----------------------------------------------------------------------------

if __name__ == "__main__":
    update_chart()
    app.run_server()
