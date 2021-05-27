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

app = pywebvue.App("External chart library - CDN")
app.scripts = [
    "https://unpkg.com/trading-vue-js",
]
app.vue_use = ["vuetify", "TradingVueJs.TradingVue"]

app.state = {
    "chartData": {
        "ohlcv": [
            [1551128400000, 33, 37.1, 14, 14, 196],
            [1551132000000, 13.7, 30, 6.6, 30, 206],
            [1551135600000, 29.9, 33, 21.3, 21.8, 74],
            [1551139200000, 21.7, 25.9, 18, 24, 140],
            [1551142800000, 24.1, 24.1, 24, 24.1, 29],
        ],
    }
}

app.layout = """
    <v-app>
      <v-app-bar app>
        <v-icon v-text="`$menu`" class="mr-4"/> Fusion Charts
        <v-spacer />
      </v-app-bar>
      <v-main>
        <v-container fluid>
          <trading-vue
            titleTxt="Simple external dependency example"
            :data="get('chartData')"
            :width="window.innerWidth - 40"
            :height="window.innerHeight - 40 - 64"
          />
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
