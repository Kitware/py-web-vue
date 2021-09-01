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

# Need ParaView 5.10+ if you don't want to use a virtual-environment
from paraview import simple

# -----------------------------------------------------------------------------
# Web App setup
# -----------------------------------------------------------------------------

app = App("ParaView processing with local Rendering")
app.state = {"resolution": 6}
app.enableModule(ParaView)

# -----------------------------------------------------------------------------
# ParaView pipeline
# -----------------------------------------------------------------------------

cone = simple.Cone()

# -----------------------------------------------------------------------------
# Callbacks
# -----------------------------------------------------------------------------


@app.change("resolution")
def update_cone():
    cone.Resolution = app.get("resolution")
    app.set("cone", ParaView.mesh(cone))


# -----------------------------------------------------------------------------
# Main
# /opt/paraview/bin/pvpython ./examples/.../app.py --port 1234 --virtual-env ~/Documents/code/Web/vue-py/py-lib
# -----------------------------------------------------------------------------

if __name__ == "__main__":
    update_cone()
    app.run_server()
