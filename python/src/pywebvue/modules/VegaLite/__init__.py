import os

serve_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "serve"))

serve = {"__vega_lite": serve_path}
scripts = ["__vega_lite/vue-vega.js"]
vue_use = ["VueVega"]
