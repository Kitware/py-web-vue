import os
import pandas as pd
import pydeck as pdk

from urllib.error import URLError

from pywebvue import App
from pywebvue.modules import Deck

# -----------------------------------------------------------------------------
# Getting a Mapbox API key
# -----------------------------------------------------------------------------
# By default, pydeck 0.6 provides basemap tiles through Carto.
#
# You can optionally use a Mapbox API key, by registering for Mapbox via
# this link [1]. You should then create a new public API token [2].
# You can learn more about Mapbox tokens via their documentation [3].
#
# [1] https://account.mapbox.com/auth/signup/
# [2] https://account.mapbox.com/access-tokens/
# [3] https://docs.mapbox.com/help/how-mapbox-works/access-tokens/#how-access-tokens-work
# -----------------------------------------------------------------------------

# -----------------------------------------------------------------------------
# App Setup
# -----------------------------------------------------------------------------

app = App("Deck + Mapbox Demo")
app.state = {
    "layerNames": [
        "Bike Rentals",
        "Bart Stop Exits",
        "Bart Stop Names",
        "Outbound Flow",
    ],
    "activeLayers": [
        "Bike Rentals",
        "Bart Stop Exits",
        "Bart Stop Names",
        "Outbound Flow",
    ],
    "deck": None,
    "error": None,
    "mapboxApiKey": os.environ[
        "MAPBOX_API_KEY"
    ],  # <-- Expect MAPBOX_API_KEY environment variable
}

# -----------------------------------------------------------------------------

app.enableModule(Deck)

# -----------------------------------------------------------------------------


def from_data_file(filename):
    url = (
        "https://raw.githubusercontent.com/streamlit/"
        "example-data/master/hello/v1/%s" % filename
    )
    return pd.read_json(url)


ALL_LAYERS = {
    "Bike Rentals": pdk.Layer(
        "HexagonLayer",
        data=from_data_file("bike_rental_stats.json"),
        get_position=["lon", "lat"],
        radius=200,
        elevation_scale=4,
        elevation_range=[0, 1000],
        extruded=True,
    ),
    "Bart Stop Exits": pdk.Layer(
        "ScatterplotLayer",
        data=from_data_file("bart_stop_stats.json"),
        get_position=["lon", "lat"],
        get_color=[200, 30, 0, 160],
        get_radius="[exits]",
        radius_scale=0.05,
    ),
    "Bart Stop Names": pdk.Layer(
        "TextLayer",
        data=from_data_file("bart_stop_stats.json"),
        get_position=["lon", "lat"],
        get_text="name",
        get_color=[0, 0, 0, 200],
        get_size=15,
        get_alignment_baseline="'bottom'",
    ),
    "Outbound Flow": pdk.Layer(
        "ArcLayer",
        data=from_data_file("bart_path_stats.json"),
        get_source_position=["lon", "lat"],
        get_target_position=["lon2", "lat2"],
        get_source_color=[200, 30, 0, 160],
        get_target_color=[200, 30, 0, 160],
        auto_highlight=True,
        width_scale=0.0001,
        get_width="outbound",
        width_min_pixels=3,
        width_max_pixels=30,
    ),
}


@app.change("activeLayers")
def update_map():
    selected_layers = [
        layer
        for layer_name, layer in ALL_LAYERS.items()
        if layer_name in app.state.get("activeLayers")
    ]

    if selected_layers:
        deck = pdk.Deck(
            map_provider="mapbox",
            map_style="mapbox://styles/mapbox/light-v9",
            initial_view_state={
                "latitude": 37.76,
                "longitude": -122.4,
                "zoom": 11,
                "pitch": 50,
            },
            layers=selected_layers,
        )
        app.set("deck", Deck.to_jsonInput(deck))
    else:
        app.set("error", "Please choose at least one layer above.")


# -----------------------------------------------------------------------------
# Start server
# -----------------------------------------------------------------------------

if __name__ == "__main__":
    app.on_ready = update_map
    app.run_server()
