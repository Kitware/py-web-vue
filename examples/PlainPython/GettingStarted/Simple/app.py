import pywebvue

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
          v-model="select"
          :items="items"
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
          Hello {{ superlatif }} {{ name }} {{ value.toFixed(2) }}
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
