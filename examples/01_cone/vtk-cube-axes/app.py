from pywebvue import App
from pywebvue.modules import VTK

from vtkmodules.vtkFiltersSources import vtkConeSource

from vtkmodules.vtkCommonCore import (
    vtkLookupTable,
)

from vtkmodules.vtkRenderingAnnotation import (
    vtkCubeAxesActor,
    vtkScalarBarActor,
)
from vtkmodules.vtkRenderingCore import (
    vtkRenderer,
    vtkRenderWindow,
    vtkRenderWindowInteractor,
    vtkPolyDataMapper,
    vtkActor,
)
from vtkmodules.vtkInteractionStyle import vtkInteractorStyleSwitch

# No need since no rendering is happening on the server
import vtkmodules.vtkRenderingOpenGL2

# -----------------------------------------------------------------------------
# Web App setup
# -----------------------------------------------------------------------------

app = App("VTK axesGrid")
app.state = {"resolution": 6}
app.enableModule(VTK)

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

cube_axes = vtkCubeAxesActor()
cube_axes.SetCamera(renderer.GetActiveCamera())
cube_axes.SetXLabelFormat("%6.1f")
cube_axes.SetYLabelFormat("%6.1f")
cube_axes.SetZLabelFormat("%6.1f")
cube_axes.SetFlyModeToOuterEdges()
cube_axes.SetXTitle("Longitude")
cube_axes.SetYTitle("Latitude")
cube_axes.SetZTitle("Depth")
# cube_axes.YAxisLabelVisibilityOff()

lut = vtkLookupTable()
lut.SetTableRange(0.6, 1.0)
lut.Build()

scalar_bar = vtkScalarBarActor()
scalar_bar.SetTitle("Hello world")
scalar_bar.SetLookupTable(lut)

cone_source = vtkConeSource()
mapper = vtkPolyDataMapper()
actor = vtkActor()
mapper.SetInputConnection(cone_source.GetOutputPort())
actor.SetMapper(mapper)
renderer.AddActor(actor)
renderer.AddActor(cube_axes)
renderer.AddActor(scalar_bar)
renderer.ResetCamera()
renderWindow.Render()

# -----------------------------------------------------------------------------
# Callbacks
# -----------------------------------------------------------------------------


@app.change("resolution")
def update_cone():
    resolution = app.get("resolution")
    cone_source.SetResolution(resolution)
    cone_source.SetHeight(resolution / 6.0)
    cone_source.Update()
    bounds = cone_source.GetOutput().GetBounds()
    cube_axes.SetBounds(bounds)
    app.set("scene", app.scene(renderWindow))


# -----------------------------------------------------------------------------
# MAIN
#   /opt/paraview/bin/pvpython ./examples/.../app.py --port 1234 --virtual-env ~/Documents/code/Web/vue-py/py-lib
# -----------------------------------------------------------------------------

if __name__ == "__main__":
    app.on_ready = update_cone
    app.run_server()
