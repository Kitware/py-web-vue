import pywebvue

app = pywebvue.App("External chart library - CDN")
app.scripts = [
    "https://unpkg.com/vue-chartkick@0.6.1",
    "https://unpkg.com/chart.js@2.9.3",
]

app.state = {
    "line": {"2017-01-01": 11, "2017-01-02": 6},
    "pieData": [["Blueberry", 44], ["Strawberry", 23]],
    "columnData": [["Sun", 32], ["Mon", 46], ["Tue", 28]],
    "scatter": [[174.0, 80.0], [176.5, 82.3]],
    "area": {"2017-01-01": 11, "2017-01-02": 6},
    "bar": [["Work", 32], ["Play", 1492]],
}

app.layout = """
    <v-app>
      <v-app-bar app>
        <v-icon v-text="`$menu`" class="mr-4"/> Chart Kick example
        <v-spacer />
      </v-app-bar>
      <v-main>
        <v-container fluid>
          <v-row>
            <v-col cols="6">

            </v-col>
            <v-col cols="6">
                <scatter-chart :data="scatter" xtitle="Size" ytitle="Population" />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="4">
                <pie-chart :data="pieData" />
            </v-col>
            <v-col cols="4">
                <column-chart :data="columnData" />
            </v-col>
            <v-col cols="4">
                <bar-chart :data="bar" />
            </v-col>
          </v-row>
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
