import os

serve_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "serve"))

serve = {"__kw_widgets": serve_path}
scripts = ["__kw_widgets/vue-kw-widgets.umd.min.js"]
styles = ["__kw_widgets/vue-kw-widgets.css"]
vue_use = ["VueKwWidgets"]
