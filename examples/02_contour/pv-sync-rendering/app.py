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
# User Settings
# -----------------------------------------------------------------------------

# Print state size when pushed to client
DEBUG = False

# -----------------------------------------------------------------------------
# Web App setup
# -----------------------------------------------------------------------------

app = App(
    "ParaView contour - Synch rendering", debug=DEBUG, backend="paraview"
)
app.layout = "./template.html"
app.state = {
    "data_range": [0, 1],
    "contour_value": 0,
}
app.vue_use += ["vtk"]

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
representation = simple.Show(contour, view)
simple.ResetCamera()
view.CenterOfRotation = view.CameraFocalPoint

# -----------------------------------------------------------------------------
# Callbacks
# -----------------------------------------------------------------------------


@app.change("contour_value")
def update_contour():
    contour.Isosurfaces = [app.get("contour_value")]
    app.set("scene", app.scene(view))
    contour.ComputeNormals = 0


@app.trigger("compute_normals")
def compute_normals():
    contour.ComputeNormals = 1
    app.set("scene", app.scene(view))


# -----------------------------------------------------------------------------
# MAIN
#   /opt/paraview/bin/pvpython ./examples/.../app.py --port 1234 --virtual-env ~/Documents/code/Web/vue-py/py-lib
# -----------------------------------------------------------------------------

if __name__ == "__main__":
    app.on_ready = compute_normals
    app.run_server()
