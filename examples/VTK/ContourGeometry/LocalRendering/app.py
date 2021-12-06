import os

from pywebvue import App
from pywebvue.modules import VTK

from vtkmodules.vtkIOXML import vtkXMLImageDataReader
from vtkmodules.vtkFiltersCore import vtkContourFilter

# -----------------------------------------------------------------------------
# Web App setup
# -----------------------------------------------------------------------------

app = App("VTK contour - Local rendering")

app.state = {
    "data_range": [0, 1],
    "contour_value": 0,
    "interactive": False,
}

app.enable_module(VTK)

# -----------------------------------------------------------------------------
# VTK pipeline
# -----------------------------------------------------------------------------

data_directory = os.path.join(
    os.path.dirname(
        os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
    ),
    "data",
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
    app.set("contour", VTK.mesh(contour))


@app.change("interactive")
def update_template():
    app.layout = (
        "./template-input.html" if app.get("interactive") else "./template-change.html"
    )


# -----------------------------------------------------------------------------
# MAIN
#   python ./examples/01_contour/vtk-local-rendering/app.py --port 1234
# -----------------------------------------------------------------------------

if __name__ == "__main__":
    update_template()
    app.on_ready = update_contour
    app.run_server()
