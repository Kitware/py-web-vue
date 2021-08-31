import sys

# -----------------------------------------------------------------------------
# Virtual Environment handling
# -----------------------------------------------------------------------------

if "--virtual-env" in sys.argv:
    virtualEnvPath = sys.argv[sys.argv.index("--virtual-env") + 1]
    virtualEnv = virtualEnvPath + "/bin/activate_this.py"
    exec(open(virtualEnv).read(), {"__file__": virtualEnv})

# -----------------------------------------------------------------------------

from pywebvue import App
from pywebvue.modules import ParaView

from paraview import simple

# -----------------------------------------------------------------------------
# Web App setup
# -----------------------------------------------------------------------------

app = App("ParaView Remote Rendering")
app.state = {"resolution": 6}
app.enableModule(ParaView)

# -----------------------------------------------------------------------------
# ParaView pipeline
# -----------------------------------------------------------------------------

cone = simple.Cone()
representation = simple.Show(cone)
view = simple.Render()

# -----------------------------------------------------------------------------
# Callbacks
# -----------------------------------------------------------------------------


@app.change("resolution")
def update_cone():
    cone.Resolution = app.get("resolution")
    app.push_image(view)


# -----------------------------------------------------------------------------
# Main
# /opt/paraview/bin/pvpython ./examples/.../app.py --port 1234 --virtual-env ~/Documents/code/Web/vue-py/py-lib
# -----------------------------------------------------------------------------

if __name__ == "__main__":
    update_cone()
    app.run_server()
