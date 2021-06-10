import sys

# -----------------------------------------------------------------------------
# Virtual Environment handling
# -----------------------------------------------------------------------------

if "--virtual-env" in sys.argv:
    virtualEnvPath = sys.argv[sys.argv.index("--virtual-env") + 1]
    virtualEnv = virtualEnvPath + "/bin/activate_this.py"
    exec(open(virtualEnv).read(), {"__file__": virtualEnv})

# -----------------------------------------------------------------------------

import os
from pywebvue import App

from vtkmodules.vtkIOXML import vtkXMLImageDataReader
from vtkmodules.vtkFiltersCore import vtkContourFilter
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

app = App("VTK contour - Remote/Local rendering", backend="vtk")
app.layout = "./template.html"
app.state = {
    "data_range": [0, 1],
    "contour_value": 0,
    "view.mode": "local",
    "override": "auto",
}
app.vue_use = ["vuetify", "vtk"]

# -----------------------------------------------------------------------------
# ParaView pipeline
# -----------------------------------------------------------------------------

data_directory = os.path.join(
    os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "data"
)
head_vti = os.path.join(data_directory, "head.vti")

reader = vtkXMLImageDataReader()
reader.SetFileName(head_vti)
reader.Update()

contour = vtkContourFilter()
contour.SetInputConnection(reader.GetOutputPort())
contour.SetComputeNormals(1)
contour.SetComputeScalars(0)

# Extract data range => Update store/state
data_range = reader.GetOutput().GetPointData().GetScalars().GetRange()
app.set("data_range", data_range)
app.set("contour_value", 0.5 * (data_range[0] + data_range[1]))

# Configure contour with valid values
contour.SetNumberOfContours(1)
contour.SetValue(0, app.get("contour_value"))

# Rendering setup
renderer = vtkRenderer()
renderWindow = vtkRenderWindow()
renderWindow.AddRenderer(renderer)

renderWindowInteractor = vtkRenderWindowInteractor()
renderWindowInteractor.SetRenderWindow(renderWindow)
renderWindowInteractor.GetInteractorStyle().SetCurrentStyleToTrackballCamera()
renderWindowInteractor.EnableRenderOff()

mapper = vtkPolyDataMapper()
actor = vtkActor()
mapper.SetInputConnection(contour.GetOutputPort())
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


@app.change("contour_value")
def update_contour():
    contour.SetValue(0, app.get("contour_value"))
    app.push_image(renderWindow)


# -----------------------------------------------------------------------------


def push_geometry():
    app.set("view.scene", app.scene(renderWindow))


# -----------------------------------------------------------------------------


@app.trigger("start")
def start_animation():
    view_id = app.id(renderWindow)
    app.set("view.mode", "remote")
    app.protocol_call("viewport.image.push.quality", view_id, 80)
    app.protocol_call("viewport.image.animation.start", view_id)


# -----------------------------------------------------------------------------


@app.trigger("end")
def stop_animation():
    view_id = app.id(renderWindow)
    app.protocol_call("viewport.image.animation.stop", view_id)
    app.protocol_call("viewport.image.push.quality", view_id, 100)
    app.set("view.mode", "local")
    push_geometry()


# -----------------------------------------------------------------------------


@app.trigger("view.camera")
def update_camera(camera=None):
    if camera:
        app.set_camera(renderWindow, **camera)
        app.push_image(renderWindow)
    else:
        # Need to update local camera
        app.update(ref="view", method="setCamera", args=[app.camera(renderWindow)])


# -----------------------------------------------------------------------------
# MAIN
#   /opt/paraview/bin/pvpython ./examples/.../app.py --port 1234 --virtual-env ~/Documents/code/Web/vue-py/py-lib
# -----------------------------------------------------------------------------

if __name__ == "__main__":
    app.on_ready = push_geometry
    app.run_server()
