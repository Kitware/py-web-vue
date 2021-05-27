import sys

# -----------------------------------------------------------------------------
# Virtual Environment handling
# -----------------------------------------------------------------------------

if "--virtual-env" in sys.argv:
    virtualEnvPath = sys.argv[sys.argv.index("--virtual-env") + 1]
    virtualEnv = virtualEnvPath + "/bin/activate_this.py"
    exec(open(virtualEnv).read(), {"__file__": virtualEnv})

# -----------------------------------------------------------------------------

import pywebvue

# -----------------------------------------------------------------------------
# Web App setup
# -----------------------------------------------------------------------------
# JS:
#   get(key)                                        # get value from state
#   set(key, value)                                 # set value to state for server
#   trigger(key, args, kwargs)                      # call method on server side
# PY:
#   app:
#     .vuetify                                      # vuetify config
#     .layout                                       # view single page app
#     .state = {}                                   # shared state with client
#     .scripts = []                                 # file to load from URLs
#     .styles = []                                  # file to load from URLs
#     .serve = { url_path: directory_path, ... }    # map static content to http server
#     .set(key, value)                              # update state
#     .get(key)                                     # get value from state
#     .run_server(port=8080)                        # start web server
#     .run_launcher(port=8080, sessionURL='ws://kitware.org/proxy?id=${id}')                        # start web server
#   @app:
#     .change(state_key)                            # callback when pieces of the state change
#     .trigger(key)                                 # bind server side trigger to client call
# -----------------------------------------------------------------------------

app = pywebvue.App("Getting started")

app.vuetify = {
    "icons": {
        "iconfont": "mdi",
        "values": {
            "add": "mdi-database-plus-outline",
            "remove": "mdi-database-minus-outline",
            "menu": "mdi-menu",
        },
    },
    "theme": {
        "themes": {
            "light": {
                "primary": "#3f51b5",
                "secondary": "#b0bec5",
                "accent": "#8c9eff",
                "error": "#b71c1c",
            },
        },
    },
}

app.layout = """
    <v-app>
      <v-app-bar app>
        <v-icon v-text="`$menu`" class="mr-4"/> {{ Date.now() }}
        <v-spacer />
        <v-select
          :value="get('select')"
          :items="get('items')"
          @change="set('select', $event)"
          hide-details dense
          style="max-width: 200px"
        />
        <v-spacer />
        <v-btn icon @click="trigger('plus', [Math.random()])">
            <v-icon v-text="`$add`" />
        </v-btn>
        <v-btn icon @click="trigger('remove', [], { value: 1 })">
            <v-icon v-text="`$remove`" />
        </v-btn>
      </v-app-bar>
      <v-main>
        <v-container fluid>
          Hello {{ get('superlatif') }} {{ get('name') }} {{ get('value').toFixed(2) }}
        </v-container>
      </v-main>
    </v-app>
"""

app.state = {
    "value": 0,
    "name": "World",
    "superlatif": "",
    "select": "World",
    "items": [
        {"text": "Simple", "value": "World"},
        {"text": "You", "value": "me"},
        {"text": "Anonymous", "value": ""},
    ],
}

app.vue_use = ["vuetify"]

# -----------------------------------------------------------------------------
# Callbacks
# -----------------------------------------------------------------------------


@app.trigger("plus")
def add(value):
    app.set("value", app.get("value") + value)


# -----------------------------------------------------------------------------


@app.trigger("remove")
def remove(value):
    app.set("value", app.get("value") - value)


# -----------------------------------------------------------------------------


@app.change("value")
def update_name():
    v = app.get("value")

    if v ** 2 < 0.5:
        new_name = "epsilon"
    else:
        new_name = "positive" if v > 0 else "negative"

    app.set("name", new_name)


# -----------------------------------------------------------------------------


@app.change("name", "value")
def update_superlatif():
    v = abs(app.get("value"))
    n = app.get("name")
    s = app.get("superlatif")
    new_super_latif = ""

    super_latifs = ["super", "mega", "giga"]
    count = 1
    for ns in super_latifs:
        if v > count:
            new_super_latif = ns
        count *= 5

    app.set("superlatif", new_super_latif)


# -----------------------------------------------------------------------------
# MAIN
#   python ./examples/.../app.py --port 1234
# -----------------------------------------------------------------------------

if __name__ == "__main__":
    app.run_server()
