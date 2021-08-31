import pandas as pd
import numpy as np
import altair as alt
from itertools import cycle

from pywebvue import App
from pywebvue.modules import AGGrid, VegaEmbed

# -----------------------------------------------------------------------------
# App Setup
# -----------------------------------------------------------------------------

app = App("Grid Demo")
app.state = {
    # UI
    "showMenu": True,
    # controls
    "sample_size": 10,
    "grid_height": 200,
    # features
    "selection_mode": "multiple",
    "use_checkbox": True,
    "use_sort": False,
    "use_filter": False,
    "use_resizable": False,
    # Row Selection
    "userSelection": None,
}

app.enableModule(AGGrid)
app.enableModule(VegaEmbed)

# -----------------------------------------------------------------------------

np.random.seed(42)
DATA_FRAME = None


def fetch_data(samples):
    global DATA_FRAME
    deltas = cycle(
        [
            pd.Timedelta(weeks=-2),
            pd.Timedelta(days=-1),
            pd.Timedelta(hours=-1),
            pd.Timedelta(0),
            pd.Timedelta(minutes=5),
            pd.Timedelta(seconds=10),
            pd.Timedelta(microseconds=50),
            pd.Timedelta(microseconds=10),
        ]
    )
    dummy_data = {
        "date_time_naive": pd.date_range("2021-01-01", periods=samples),
        "apple": np.random.randint(0, 100, samples) / 3.0,
        "banana": np.random.randint(0, 100, samples) / 5.0,
        "chocolate": np.random.randint(0, 100, samples),
        "group": np.random.choice(["A", "B"], size=samples),
        "date_only": pd.date_range("2020-01-01", periods=samples).date,
        # "timedelta": [next(deltas) for i in range(samples)],
        "date_tz_aware": pd.date_range(
            "2022-01-01", periods=samples, tz="Asia/Katmandu"
        ),
    }
    DATA_FRAME = pd.DataFrame(dummy_data)
    return DATA_FRAME


@app.change("sample_size")
def reload_data():
    df = fetch_data(app.get("sample_size"))
    grid = AGGrid.to_grid(df)
    app.set("grid", grid)

    update_use_checkbox()
    update_sort()
    update_filter()
    update_resizable()
    selection_change()


@app.change("use_checkbox")
def update_use_checkbox():
    flag = app.get("use_checkbox")
    gridColumnDefs = app.get("grid")["columnDefs"]
    gridColumnDefs[0]["checkboxSelection"] = flag

    # Force grid update
    app.flush_state("grid")
    app.update(ref="trigger", method="emit", args=["refreshCells"])


@app.change("use_sort")
def update_sort():
    flag = app.get("use_sort")
    gridColumnDefs = app.get("grid")["columnDefs"]
    for item in gridColumnDefs:
        item["sortable"] = flag

    # Force grid update
    app.flush_state("grid")


@app.change("use_filter")
def update_filter():
    flag = app.get("use_filter")
    gridColumnDefs = app.get("grid")["columnDefs"]
    for item in gridColumnDefs:
        item["filter"] = flag

    # Force grid update
    app.flush_state("grid")


@app.change("use_resizable")
def update_resizable():
    flag = app.get("use_resizable")
    gridColumnDefs = app.get("grid")["columnDefs"]
    for item in gridColumnDefs:
        item["resizable"] = flag

    # Force grid update
    app.flush_state("grid")


@app.change("userSelection")
def selection_change():
    global DATA_FRAME
    selection = app.get("userSelection")
    selected_df = pd.DataFrame(selection)

    # Chart
    chart_data = DATA_FRAME.loc[
        :, ["date_time_naive", "apple", "banana", "chocolate"]
    ].assign(source="total")

    if not selected_df.empty:
        selected_data = selected_df.loc[
            :, ["date_time_naive", "apple", "banana", "chocolate"]
        ].assign(source="selection")
        chart_data = pd.concat([chart_data, selected_data])

    chart_data = pd.melt(
        chart_data,
        id_vars=["date_time_naive", "source"],
        var_name="item",
        value_name="quantity",
    )
    chart = (
        alt.Chart(data=chart_data)
        .mark_bar()
        .encode(
            x=alt.X("item:O"),
            y=alt.Y("sum(quantity):Q", stack=False),
            color=alt.Color("source:N", scale=alt.Scale(domain=["total", "selection"])),
        )
        .properties(
            width="container",
            height=175,
        )
    )

    app.set("chartSpec", VegaEmbed.altair_to_spec(chart))


# -----------------------------------------------------------------------------
# Start server
# -----------------------------------------------------------------------------

if __name__ == "__main__":
    reload_data()
    app.run_server()
