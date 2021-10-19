import pywebvue
from pywebvue.modules import Widgets

app = pywebvue.App("KW Widgets")
app.enableModule(Widgets)

app.layout = """
    <v-app>
      <v-app-bar app>
        <v-icon v-text="`$menu`" class="mr-4"/> Float Card demo
        <v-spacer />
      </v-app-bar>
      <v-main>
        <v-container fluid fill-height>
    <kw-float-card elevation="6" handle-position="right" :location="[50, 100]">
        <v-card-title >Right card</v-card-title>
        <v-card-text>
          Greyhound divisively hello coldly wonderfully marginally far upon excluding.
        </v-card-text>
      </kw-float-card>
      <kw-float-card elevation="2"  hover handle-position="bottom" :location="[50, 225]">
        <v-card-title>Bottom card</v-card-title>
        <v-card-text>
          Greyhound divisively hello coldly wonderfully marginally far upon excluding.
        </v-card-text>
      </kw-float-card>
      <kw-float-card elevation="3" dark handle-position="left" :location="[600, 100]">
        <v-card-title >Left card</v-card-title>
        <v-card-text>
          Greyhound divisively hello coldly wonderfully marginally far upon excluding.
        </v-card-text>
      </kw-float-card>
      <kw-float-card elevation="4" handle-position="top" :location="[600, 225]">
        <v-card-title>Top card</v-card-title>
        <v-card-text>
          Greyhound divisively hello coldly wonderfully marginally far upon excluding.
        </v-card-text>
      </kw-float-card>
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
