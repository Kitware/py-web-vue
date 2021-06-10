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

# -----------------------------------------------------------------------------
# User Settings
# -----------------------------------------------------------------------------

# Print state size when pushed to client
DEBUG = False

# Ask for new contour while dragging
INTERACTIVE_SLIDER = False

# -----------------------------------------------------------------------------
# Web App setup
# -----------------------------------------------------------------------------

app = App("VTK contour - Local rendering", backend="vtk", debug=DEBUG)
app.layout = "./template-input.html" if INTERACTIVE_SLIDER else "./template-change.html"
app.state = {
    "data_range": [0, 1],
    "contour_value": 0,
}
app.vue_use = ["vuetify", "vtk"]

# -----------------------------------------------------------------------------
# VTK pipeline
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

# Extract data range => Update store/state
data_range = reader.GetOutput().GetPointData().GetScalars().GetRange()
app.set("data_range", data_range)
app.set("contour_value", 0.5 * (data_range[0] + data_range[1]))

# Configure contour with valid values
contour.SetNumberOfContours(1)
contour.SetValue(0, app.get("contour_value"))
contour.Update()

# -----------------------------------------------------------------------------
# Callbacks
# -----------------------------------------------------------------------------


@app.change("contour_value")
def update_contour():
    contour.SetValue(0, app.get("contour_value"))
    contour.Update()
    app.set("contour", app.mesh(contour.GetOutput()))


# -----------------------------------------------------------------------------
# MAIN
#   python ./examples/01_contour/vtk-local-rendering/app.py --port 1234
# -----------------------------------------------------------------------------

if __name__ == "__main__":
    app.on_ready = update_contour
    app.run_server()
