import os
import json

serve_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "serve"))

serve = {"__vue_deck": serve_path}
scripts = ["/__vue_deck/vue-deck.umd.min.js"]
vue_use = ["VueDeck"]


def to_jsonInput(deck):
    return json.loads(deck.to_json())
