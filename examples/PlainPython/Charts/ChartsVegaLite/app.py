import asyncio
import numpy as np

from pywebvue import App
from pywebvue.modules import VegaLite

# from pywebvue.modules import CDNVegaLite as VegaLite

# -----------------------------------------------------------------------------
# App initialization
# -----------------------------------------------------------------------------

app = App("Plotting Demo")
app.state = {
    "progress": 0,
    "values": [],
    "encoding": {
        "x": {"field": "time", "type": "quantitative"},
        "y": {"field": "value", "type": "quantitative"},
    },
}
app.enable_module(VegaLite)

# -----------------------------------------------------------------------------
# Actions
# -----------------------------------------------------------------------------


@app.trigger("reset")
async def fill_data():
    last_rows = np.random.randn(1, 1)
    data = []
    for i in range(1, 1001):
        new_rows = last_rows[-1, :] + np.random.randn(5, 1).cumsum(axis=0)
        last_rows = new_rows
        data.append({"time": i - 1, "value": float(new_rows[0])})

        # Since we are in an async loop we need to be explicit when to push state
        with app.capture_changes():
            app.set("progress", i / 10)
            app.set("values", data)

        # Rather than using the "capture_changes" resource manager you can also
        # call an explicit flush for a subset of keys too
        # app.flush_state("progress", "values")

        await asyncio.sleep(0.01)


# -----------------------------------------------------------------------------
# Start server
# -----------------------------------------------------------------------------

if __name__ == "__main__":
    app.run_server()
