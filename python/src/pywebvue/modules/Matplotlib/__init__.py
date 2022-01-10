import os

serve_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "serve"))

serve = {"__mpld3": serve_path}
scripts = [
    "/__mpld3/d3.placeholder.js",  # will load faster for mpld3
    "/__mpld3/d3.v5.min.js",
    # "/__mpld3/mpld3.v0.5.7.js",
    "/__mpld3/mpld3.v0.5.7.min.js",
    "/__mpld3/vue-mpld3.umd.min.js",
]
vue_use = ["VueMatplotlib"]
