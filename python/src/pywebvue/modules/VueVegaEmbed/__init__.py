import os

serve_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "serve"))

serve = {"__vega_embed": serve_path}
scripts = ["__vega_embed/vue-vega-embed.umd.min.js"]
vue_use = ["VueVegaEmbed"]


def altair_to_spec(chart):
    return chart.to_dict()
