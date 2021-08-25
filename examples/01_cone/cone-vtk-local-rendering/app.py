from pywebvue import App

from vtkmodules.vtkFiltersSources import vtkConeSource

# -----------------------------------------------------------------------------
# Web App setup
# -----------------------------------------------------------------------------

app = App("VTK processing with local Rendering", backend="vtk")
app.layout = "./template.html"
app.state = {
    "resolution": 6,
}
app.vue_use += ["vtk"]

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
    app.set("cone", app.mesh(cone_generator))


# -----------------------------------------------------------------------------
# MAIN
#   python ./examples/.../app.py --port 1234
# -----------------------------------------------------------------------------

if __name__ == "__main__":
    app.on_ready = update_cone
    app.run_server()
