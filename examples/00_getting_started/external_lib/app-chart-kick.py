import sys

# -----------------------------------------------------------------------------
# Virtual Environment handling
# -----------------------------------------------------------------------------

if '--virtual-env' in sys.argv:
  virtualEnvPath = sys.argv[sys.argv.index('--virtual-env') + 1]
  virtualEnv = virtualEnvPath + '/bin/activate_this.py'
  exec(open(virtualEnv).read(), {'__file__': virtualEnv})

# -----------------------------------------------------------------------------

import pywebvue

app = pywebvue.App('External chart library - CDN', root=__file__)
app.serve = {
    'static': './static',
}
app.scripts = [
    'https://unpkg.com/vue-chartkick@0.6.1',
    'https://unpkg.com/chart.js',
    '/static/my_chart_kick.js'
]
app.vue_use = ['charts_use']

app.state = {
    'line': {'2017-01-01': 11, '2017-01-02': 6},
    'pieData': [
        ['Blueberry', 44],
        ['Strawberry', 23]
    ],
    'columnData': [['Sun', 32], ['Mon', 46], ['Tue', 28]],
    'scatter': [[174.0, 80.0], [176.5, 82.3]],
    'area': {'2017-01-01': 11, '2017-01-02': 6},
    'bar': [['Work', 32], ['Play', 1492]],
}

app.layout = '''
    <v-app>
      <v-app-bar app>
        <v-icon v-text="`$menu`" class="mr-4"/> Fusion Charts
        <v-spacer />
      </v-app-bar>
      <v-main>
        <v-container fluid>
          <v-row>
            <v-col cols="6">

            </v-col>
            <v-col cols="6">
                <scatter-chart :data="get('scatter')" xtitle="Size" ytitle="Population" />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="4">
                <pie-chart :data="get('pieData')" />
            </v-col>
            <v-col cols="4">
                <column-chart :data="get('columnData')" />
            </v-col>
            <v-col cols="4">
                <bar-chart :data="get('bar')" />
            </v-col>
          </v-row>
        </v-container>
      </v-main>
    </v-app>
'''

# -----------------------------------------------------------------------------
# MAIN
#   python ./examples/.../app.py --port 1234
# -----------------------------------------------------------------------------

if __name__ == "__main__":
    app.run_server()