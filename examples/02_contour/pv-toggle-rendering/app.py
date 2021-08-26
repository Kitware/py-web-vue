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
from paraview import simple

# -----------------------------------------------------------------------------
# Web App setup
# -----------------------------------------------------------------------------

app = App("ParaView contour - Remote/Local rendering", backend="paraview")
app.layout = "./template.html"
app.state = {
    "data_range": [0, 1],
    "contour_value": 0,
    "viewMode": "local",
    "override": "auto",
}
app.vue_use = ["vuetify", "vtk"]

# -----------------------------------------------------------------------------
# ParaView pipeline
# -----------------------------------------------------------------------------

simple.LoadDistributedPlugin("AcceleratedAlgorithms", remote=False, ns=globals())

data_directory = os.path.join(
    os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "data"
)
head_vti = os.path.join(data_directory, "head.vti")

reader = simple.XMLImageDataReader(FileName=[head_vti])
# contour = simple.Contour(Input=reader) # Default filter    => no plugin but slow
contour = FlyingEdges3D(Input=reader)  # Faster processing => make it interactive

# Extract data range => Update store/state
array = reader.GetPointDataInformation().GetArray(0)
data_name = array.GetName()
data_range = array.GetRange()
app.set("data_range", data_range)
app.set("contour_value", 0.5 * (data_range[0] + data_range[1]))

contour.ContourBy = ["POINTS", data_name]
contour.Isosurfaces = [app.get("contour_value")]
contour.ComputeNormals = 1
contour.ComputeScalars = 0

# Rendering setup
view = simple.GetRenderView()
view.OrientationAxesVisibility = 0
representation = simple.Show(contour, view)
simple.ResetCamera()
view.CenterOfRotation = view.CameraFocalPoint

# -----------------------------------------------------------------------------
# Callbacks
# -----------------------------------------------------------------------------


@app.change("contour_value")
def update_contour():
    contour.Isosurfaces = [app.get("contour_value")]


# -----------------------------------------------------------------------------


def push_geometry():
    app.set("view.scene", app.scene(view))


# -----------------------------------------------------------------------------


@app.trigger("start")
def start_animation():
    app.set("viewMode", "remote")
    app.protocol_call("viewport.image.push.quality", "-1", 80)
    app.protocol_call("viewport.image.animation.start", "-1")


# -----------------------------------------------------------------------------


@app.trigger("end")
def stop_animation():
    app.protocol_call("viewport.image.animation.stop", "-1")
    app.protocol_call("viewport.image.push.quality", "-1", 100)
    app.set("viewMode", "local")
    push_geometry()


# -----------------------------------------------------------------------------


@app.trigger("view.camera")
def update_camera(camera=None):
    if camera:
        app.set_camera(view, **camera)
        app.push_image(view)
    else:
        # Need to update local camera
        app.update(ref="view", method="setCamera", args=[app.camera(view)])


# -----------------------------------------------------------------------------
# MAIN
#   /opt/paraview/bin/pvpython ./examples/.../app.py --port 1234 --virtual-env ~/Documents/code/Web/vue-py/py-lib
# -----------------------------------------------------------------------------

if __name__ == "__main__":
    app.on_ready = push_geometry
    app.run_server()
