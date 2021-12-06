from pywebvue import App
from pywebvue.modules import VTK

from vtkmodules.vtkFiltersSources import vtkConeSource
from vtkmodules.vtkRenderingCore import (
    vtkRenderer,
    vtkRenderWindow,
    vtkRenderWindowInteractor,
    vtkPolyDataMapper,
    vtkActor,
)
from vtkmodules.vtkInteractionStyle import vtkInteractorStyleSwitch

# -----------------------------------------------------------------------------
# Web App setup
# -----------------------------------------------------------------------------

app = App("VTK Remote Rendering")
app.state = {"resolution": 6}
app.enable_module(VTK)

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

# -----------------------------------------------------------------------------
# Callbacks
# -----------------------------------------------------------------------------


@app.change("resolution")
def update_cone():
    cone_source.SetResolution(app.get("resolution"))
    app.set("scene", VTK.scene(renderWindow))


# -----------------------------------------------------------------------------
# Main
# /opt/paraview/bin/pvpython ./examples/.../app.py --port 1234 --virtual-env ~/Documents/code/Web/vue-py/py-lib
# -----------------------------------------------------------------------------

if __name__ == "__main__":
    app.on_ready = update_cone
    app.run_server()
