import os

serve_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "serve"))

serve = {"__vue_size": serve_path}
scripts = ["/__vue_size/vue-size.umd.min.js"]
vue_use = ["VueSize"]