import os

serve_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "serve"))

serve = {"__xai": serve_path}
scripts = ["__xai/vue-xai.umd.min.js"]
vue_use = ["VueXai"]
