import os
import json

serve_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "serve"))

serve = {"__markdown_it": serve_path}
scripts = ["/__markdown_it/markdown-it-vue.umd.min.js"]
styles = ["/__markdown_it/markdown-it-vue.css"]
