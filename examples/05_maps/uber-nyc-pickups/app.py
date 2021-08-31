"""An example of showing geographic data."""

import os
import pandas as pd
import numpy as np
import altair as alt
import pydeck as pdk

from pywebvue import App
from pywebvue.modules import VegaEmbed, Deck

# -----------------------------------------------------------------------------
# App Setup
# -----------------------------------------------------------------------------

app = App("NYC Uber Ridesharing Data", debug=True)
app.state = {
    "hourBreackDown": None,
    "pickupHour": 0,
    "chartTitle": "",
    "mapboxApiKey": os.environ[
        "MAPBOX_API_KEY"
    ],  # <-- Expect MAPBOX_API_KEY environment variable
}

app.enableModule(VegaEmbed)
app.enableModule(Deck)

# -----------------------------------------------------------------------------


# LOADING DATA
DATE_TIME = "date/time"
DATA_URL = (
    "http://s3-us-west-2.amazonaws.com/streamlit-demo-data/uber-raw-data-sep14.csv.gz"
)


def load_data(nrows):
    data = pd.read_csv(DATA_URL, nrows=nrows)
    lowercase = lambda x: str(x).lower()
    data.rename(lowercase, axis="columns", inplace=True)
    data[DATE_TIME] = pd.to_datetime(data[DATE_TIME])
    return data


data = load_data(100000)

# CREATING FUNCTION FOR MAPS

map_list = [
    {
        "id": "nyc",
        "title": "All New York City",
        "lat": np.average(data["lat"]),
        "lon": np.average(data["lon"]),
        "zoom": 11,
    },
    {
        "id": "lga",
        "title": "La Guardia Airport",
        "lat": 40.7900,
        "lon": -73.8700,
        "zoom": 12,
    },
    {
        "id": "jfk",
        "title": "JFK Airport",
        "lat": 40.6650,
        "lon": -73.7821,
        "zoom": 11,
    },
    {
        "id": "nwk",
        "title": "Newark Airport",
        "lat": 40.7090,
        "lon": -74.1805,
        "zoom": 11,
    },
]


def map(data, lat, lon, zoom, **kwarg):
    deck = pdk.Deck(
        map_provider="mapbox",
        map_style="mapbox://styles/mapbox/light-v9",
        initial_view_state={
            "latitude": lat,
            "longitude": lon,
            "zoom": zoom,
            "pitch": 50,
        },
        layers=[
            pdk.Layer(
                "HexagonLayer",
                data=data,
                get_position=["lon", "lat"],
                radius=100,
                elevation_scale=4,
                elevation_range=[0, 1000],
                pickable=True,
                extruded=True,
            ),
        ],
    )
    app.set(kwarg["id"], Deck.to_jsonInput(deck))
    app.set(f'{kwarg["id"]}Title', kwarg["title"])


@app.change("pickupHour")
def updateData():
    hour_selected = app.get("pickupHour")
    app.set(
        "chartTitle",
        f"All New York City from {hour_selected}:00 and {hour_selected + 1}:00",
    )

    # FILTERING DATA BY HOUR SELECTED
    filtered_data = data[data[DATE_TIME].dt.hour == hour_selected]

    for item in map_list:
        map(filtered_data, **item)

    # FILTERING DATA FOR THE HISTOGRAM
    filtered = filtered_data[
        (data[DATE_TIME].dt.hour >= hour_selected)
        & (data[DATE_TIME].dt.hour < (hour_selected + 1))
    ]

    hist = np.histogram(filtered[DATE_TIME].dt.minute, bins=60, range=(0, 60))[0]

    chart_data = pd.DataFrame({"minute": range(60), "pickups": hist})

    # LAYING OUT THE HISTOGRAM SECTION
    app.set(
        "hourBreackDown",
        VegaEmbed.altair_to_spec(
            alt.Chart(chart_data)
            .mark_area(
                interpolate="step-after",
            )
            .properties(width="container", height=150)
            .encode(
                x=alt.X("minute:Q", scale=alt.Scale(nice=False)),
                y=alt.Y("pickups:Q"),
                tooltip=["minute", "pickups"],
            )
            .configure_mark(opacity=0.5, color="red")
        ),
    )


updateData()

# -----------------------------------------------------------------------------
# Start server
# -----------------------------------------------------------------------------

if __name__ == "__main__":
    app.run_server()
