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

from vtkmodules.vtkFiltersSources import vtkConeSource

# -----------------------------------------------------------------------------
# Web App setup
# -----------------------------------------------------------------------------

app = App("VTK processing with local Rendering", root=__file__, backend="vtk")
app.layout = "./template.html"
app.state = {
    "resolution": 6,
}
app.vue_use = ["vuetify", "vtk"]

# -----------------------------------------------------------------------------
# VTK pipeline
# -----------------------------------------------------------------------------

cone_generator = vtkConeSource()

# -----------------------------------------------------------------------------
# Callbacks
# -----------------------------------------------------------------------------


@app.change("resolution")
def update_cone():
    cone_generator.SetResolution(app.get("resolution"))
    cone_generator.Update()
    app.set("cone", app.mesh(cone_generator.GetOutput()))


# -----------------------------------------------------------------------------
# MAIN
#   python ./examples/.../app.py --port 1234
# -----------------------------------------------------------------------------

if __name__ == "__main__":
    app.on_ready = update_cone
    app.run_server()
