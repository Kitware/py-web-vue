import pywebvue

app = pywebvue.App("Routing example")
app.vue_use += ["router"]

app.routes = [
    {
        "name": "home",
        "path": "/",
        "component": {
            "template": "<div>Root path</div>",
        },
    },
    {
        "name": "foo",
        "path": "/foo",
        "component": {"template": "<div>Foo path</div>"},
    },
    {
        "name": "bar",
        "path": "/bar",
        "component": {
            "template": "<div>Bar path</div>",
        },
    },
]

app.layout = """
    <v-app>
      <v-app-bar app>
        <v-btn to="/" icon>
          <v-icon>mdi-menu</v-icon>
        </v-btn>
        Routing example
        <v-spacer />
        <v-btn-toggle>
          <v-btn to="/foo">
            <v-icon>mdi-food</v-icon>
          </v-btn>
          <v-btn to="/bar">
            <v-icon>mdi-peanut-outline</v-icon>
          </v-btn>
        </v-btn-toggle>
        <v-spacer />
      </v-app-bar>
      <v-main>
        <v-container fluid>
          <router-view></router-view>
        </v-container>
      </v-main>
    </v-app>
"""

# -----------------------------------------------------------------------------
# MAIN
#   python ./examples/.../app.py --port 1234
# -----------------------------------------------------------------------------

if __name__ == "__main__":
    app.run_server()
