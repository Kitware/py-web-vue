import sys

# -----------------------------------------------------------------------------
# Virtual Environment handling
# -----------------------------------------------------------------------------

if '--virtual-env' in sys.argv:
  virtualEnvPath = sys.argv[sys.argv.index('--virtual-env') + 1]
  virtualEnv = virtualEnvPath + '/bin/activate_this.py'
  exec(open(virtualEnv).read(), {'__file__': virtualEnv})

# -----------------------------------------------------------------------------

from pywebvue import App

from paraview import simple

# -----------------------------------------------------------------------------
# Web App setup
# -----------------------------------------------------------------------------

app = App('ParaView processing with local Rendering', root=__file__, backend='paraview')
app.layout = './template.html'
app.state = {
    'resolution': 6,
}
app.vue_use = ['vuetify', 'vtk']

# -----------------------------------------------------------------------------
# ParaView pipeline
# -----------------------------------------------------------------------------

cone = simple.Cone()

# -----------------------------------------------------------------------------
# Callbacks
# -----------------------------------------------------------------------------

@app.change('resolution')
def update_cone():
    cone.Resolution = app.get('resolution')
    cone.UpdatePipeline()
    app.set('cone', app.mesh(cone))

# -----------------------------------------------------------------------------
# Main
# /opt/paraview/bin/pvpython ./examples/.../app.py --port 1234 --virtual-env ~/Documents/code/Web/vue-py/py-lib
# -----------------------------------------------------------------------------

if __name__ == "__main__":
    update_cone()
    app.run_server()