import os
from pywebvue import App
from pywebvue.modules import Widgets

app = App("Git Tree")
app.enable_module(Widgets)

DEFAULT_TREE = [
    {"name": "root", "id": "10", "parent": "0", "visible": 1 },
    {"name": "a", "id": "1", "parent": "10", "visible": 1 },
    {"name": "b", "id": "2", "parent": "10", "visible": 1 },
    {"name": "aa", "id": "3", "parent": "1", "visible": 1 },
    {"name": "ba", "id": "4", "parent": "2", "visible": 1 },
    {"name": "bb", "id": "5", "parent": "2", "visible": 1 },
    {"name": "bba", "id": "6", "parent": "5", "visible": 1 },
    {"name": "bbb", "id": "7", "parent": "5", "visible": 1 },
]

COLOR_TREE = [
    {"name": "root", "id": "10", "parent": "0", "visible": 0, "color": "#9C27B0"},
    {"name": "a", "id": "1", "parent": "10", "visible": 1, "color": "#42A5F5" },
    {"name": "b", "id": "2", "parent": "10", "visible": 1, "color": "#00ACC1" },
    {"name": "aa", "id": "3", "parent": "1", "visible": 0, "color": "#2962FF" },
    {"name": "aaa", "id": "8", "parent": "3", "visible": 0, "color": "black" },
    {"name": "ba", "id": "4", "parent": "2", "visible": 0, "color": "#004D40" },
    {"name": "bb", "id": "5", "parent": "2", "visible": 0, "color": "#80CBC4" },
    {"name": "bba", "id": "6", "parent": "5", "visible": 1, "color": "#00838F" },
    {"name": "bbb", "id": "7", "parent": "5", "visible": 1, "color": "#4DB6AC" },
]

ACTION_TREE = [
    {"name": "root", "id": "10", "parent": "0", "visible": 0, "color": "#9C27B0", "actions": ["test", "delete"]},
    {"name": "a", "id": "1", "parent": "10", "visible": 1, "color": "#42A5F5", "actions": ["test", "delete"] },
    {"name": "b", "id": "2", "parent": "10", "visible": 1, "color": "#00ACC1", "actions": ["test"] },
    {"name": "aa", "id": "3", "parent": "1", "visible": 0, "color": "#2962FF", "actions": ["delete", "collapsed"]  },
    {"name": "aaa", "id": "8", "parent": "3", "visible": 0, "color": "black" },
    {"name": "ba", "id": "4", "parent": "2", "visible": 0, "color": "#004D40", "actions": ["delete"]},
    {"name": "bb", "id": "5", "parent": "2", "visible": 0, "color": "#80CBC4", "actions": ["collapsable", "delete"] },
    {"name": "bba", "id": "6", "parent": "5", "visible": 1, "color": "#00838F" },
    {"name": "bbb", "id": "7", "parent": "5", "visible": 1, "color": "#4DB6AC" },
]

ACTIONS = {
    "test": app.url("./abacus.svg"),
    "delete": app.url("./trash-can-outline.svg"),
    "collapsed": app.url("./chevron-up.svg"),
    "collapsable": app.url("./chevron-down.svg"),
}

app.state = {
    "treeType": "basic",
    "treeNames": ["basic", "color", "collapsable"],
    "sources": DEFAULT_TREE,
    "icons": ACTIONS,
}

@app.change("treeType")
def update_tree(treeType, **kwargs):
    if treeType == "basic":
        app.set("sources", DEFAULT_TREE)
    if treeType == "color":
        app.set("sources", COLOR_TREE)
    if treeType == "collapsable":
        app.set("sources", ACTION_TREE)

@app.trigger("action")
def action(event):
    print("Action", event)


app.layout = """
    <v-app app>
        <v-container>
            <v-select v-model="treeType" :items="treeNames" :key="tts"/>
            <kw-git-tree
                :sources="sources"
                :actionMap="icons"
                actionSize="25"
                @action="trigger('action', [$event])"
            />
        </v-container>
    </v-app>
"""

# -----------------------------------------------------------------------------
# Start server
# -----------------------------------------------------------------------------

if __name__ == "__main__":
    app.run_server()
