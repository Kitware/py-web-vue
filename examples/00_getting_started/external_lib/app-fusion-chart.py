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

app = pywebvue.App('External chart library - CDN')
app.scripts = [
    'https://unpkg.com/vue-fusioncharts',
    'https://unpkg.com/fusioncharts',
    'https://unpkg.com/fusioncharts/fusioncharts.charts',
    'https://unpkg.com/fusioncharts/themes/fusioncharts.theme.fusion',
]
app.vue_use = ['VueFusionCharts', 'FusionCharts']

app.state = {
    'type': "column2d",
    'width': "700",
    'height': "400",
    'dataFormat': "json",
    'dataSource': {
      'chart': {
        'caption': "Countries With Most Oil Reserves [2017-18]",
        'subCaption': "In MMbbl = One Million barrels",
        'xAxisName': "Country",
        'yAxisName': "Reserves (MMbbl)",
        'numberSuffix': "K",
        'theme': "fusion"
      },
      'data': [
        {
          'label': "Venezuela",
          'value': "290"
        },
        {
          'label': "Saudi",
          'value': "260"
        },
        {
          'label': "Canada",
          'value': "180"
        },
        {
          'label': "Iran",
          'value': "140"
        },
        {
          'label': "Russia",
          'value': "115"
        },
        {
          'label': "UAE",
          'value': "100"
        },
        {
          'label': "US",
          'value': "30"
        },
        {
          'label': "China",
          'value': "30"
        }
      ],
    }
}

app.layout = '''
    <v-app>
      <v-app-bar app>
        <v-icon v-text="`$menu`" class="mr-4"/> Fusion Charts
        <v-spacer />
      </v-app-bar>
      <v-main>
        <v-container fluid>
          <fusioncharts
            :type="get('type')"
            :width="get('width')"
            :height="get('height')"
            :dataformat="get('dataFormat')"
            :dataSource="get('dataSource')"
          />
        </v-container>
      </v-main>
    </v-app>
'''

# -----------------------------------------------------------------------------
# Callbacks
# -----------------------------------------------------------------------------

@app.trigger('update')
def update_chart():
    print('update chart...')

# -----------------------------------------------------------------------------
# MAIN
#   python ./examples/.../app.py --port 1234
# -----------------------------------------------------------------------------

if __name__ == "__main__":
    app.run_server()