# -----------------------------------------------------------------------------
# More examples available at https://altair-viz.github.io/gallery/
# -----------------------------------------------------------------------------

from pywebvue import App
import altair as alt
from vega_datasets import data

from pywebvue.modules import VegaEmbed

# -----------------------------------------------------------------------------
# App initialization
# -----------------------------------------------------------------------------

app = App("Altair Plotting Demo")
app.state = {
    "spec": None,
    "active": "ScatterMatrix",
    "examples": [
        {"text": "Scatter Matrix", "value": "ScatterMatrix"},
        {"text": "US Income By State", "value": "USIncomeByState"},
        {"text": "Stacked Density Estimates", "value": "StackedDensityEstimates"},
    ],
}

# -----------------------------------------------------------------------------


@app.change("active")
def update_chart():
    chart_name = app.get("active")
    globals()[chart_name]()


# -----------------------------------------------------------------------------
# Enable specific module for charts rendering
# -----------------------------------------------------------------------------

app.enableModule(VegaEmbed)

# -----------------------------------------------------------------------------
# Chart examples
# -----------------------------------------------------------------------------


def ScatterMatrix():
    """https://altair-viz.github.io/gallery/scatter_matrix.html"""
    source = data.cars()

    chart = (
        alt.Chart(source)
        .mark_circle()
        .encode(
            alt.X(alt.repeat("column"), type="quantitative"),
            alt.Y(alt.repeat("row"), type="quantitative"),
            color="Origin:N",
        )
        .properties(width=150, height=150)
        .repeat(
            row=["Horsepower", "Acceleration", "Miles_per_Gallon"],
            column=["Miles_per_Gallon", "Acceleration", "Horsepower"],
        )
        .interactive()
    )

    # Push chart to client
    app.set("spec", VegaEmbed.altair_to_spec(chart))


# -----------------------------------------------------------------------------


def USIncomeByState():
    """https://altair-viz.github.io/gallery/us_incomebrackets_by_state_facet.html"""
    states = alt.topo_feature(data.us_10m.url, "states")
    source = data.income.url

    chart = (
        alt.Chart(source)
        .mark_geoshape()
        .encode(
            shape="geo:G",
            color="pct:Q",
            tooltip=["name:N", "pct:Q"],
            facet=alt.Facet("group:N", columns=2),
        )
        .transform_lookup(
            lookup="id", from_=alt.LookupData(data=states, key="id"), as_="geo"
        )
        .properties(
            width=300,
            height=175,
        )
        .project(type="albersUsa")
    )

    # Push chart to client
    app.set("spec", VegaEmbed.altair_to_spec(chart))


# -----------------------------------------------------------------------------


def StackedDensityEstimates():
    """https://altair-viz.github.io/gallery/density_stack.html"""
    source = data.iris()

    chart = (
        alt.Chart(source)
        .transform_fold(
            ["petalWidth", "petalLength", "sepalWidth", "sepalLength"],
            as_=["Measurement_type", "value"],
        )
        .transform_density(
            density="value",
            bandwidth=0.3,
            groupby=["Measurement_type"],
            extent=[0, 8],
            counts=True,
            steps=200,
        )
        .mark_area()
        .encode(
            alt.X("value:Q"),
            alt.Y("density:Q", stack="zero"),
            alt.Color("Measurement_type:N"),
        )
        .properties(width=400, height=100)
    )

    app.set("spec", chart.to_dict())


# -----------------------------------------------------------------------------
# Start server
# -----------------------------------------------------------------------------

if __name__ == "__main__":
    update_chart()
    app.run_server()
