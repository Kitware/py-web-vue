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
from vtkmodules.vtkRenderingCore import (
    vtkRenderer,
    vtkRenderWindow,
    vtkRenderWindowInteractor,
    vtkPolyDataMapper,
    vtkActor,
)
from vtkmodules.vtkInteractionStyle import vtkInteractorStyleSwitch

# Grab implementation
import vtkmodules.vtkRenderingOpenGL2

# -----------------------------------------------------------------------------
# Web App setup
# -----------------------------------------------------------------------------

app = App("VTK Remote Rendering", backend="vtk")
app.layout = "./template.html"
app.state = {
    "resolution": 6,
}
app.vue_use = ["vuetify", "vtk"]

# -----------------------------------------------------------------------------
# VTK pipeline
# -----------------------------------------------------------------------------

renderer = vtkRenderer()
renderWindow = vtkRenderWindow()
renderWindow.AddRenderer(renderer)

renderWindowInteractor = vtkRenderWindowInteractor()
renderWindowInteractor.SetRenderWindow(renderWindow)
renderWindowInteractor.GetInteractorStyle().SetCurrentStyleToTrackballCamera()
renderWindowInteractor.EnableRenderOff()

cone_source = vtkConeSource()
mapper = vtkPolyDataMapper()
actor = vtkActor()
mapper.SetInputConnection(cone_source.GetOutputPort())
actor.SetMapper(mapper)
renderer.AddActor(actor)
renderer.ResetCamera()
renderWindow.Render()

app.active_objects = {
    "VIEW": renderWindow,
}

# -----------------------------------------------------------------------------
# Callbacks
# -----------------------------------------------------------------------------


@app.change("resolution")
def update_cone():
    cone_source.SetResolution(app.get("resolution"))
    app.push_image(renderWindow)


# -----------------------------------------------------------------------------
# Main
# /opt/paraview/bin/pvpython ./examples/.../app.py --port 1234 --virtual-env ~/Documents/code/Web/vue-py/py-lib
# -----------------------------------------------------------------------------

if __name__ == "__main__":
    app.on_ready = update_cone
    app.run_server()
