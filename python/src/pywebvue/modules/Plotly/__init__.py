import os

serve_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "serve"))

serve = {"__vue_plotly": serve_path}
scripts = ["/__vue_plotly/vue-plotly.umd.min.js"]
vue_use = ["VuePlotly"]
