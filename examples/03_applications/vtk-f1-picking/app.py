import os

from pywebvue import App

from vtkmodules.vtkIOXML import vtkXMLPolyDataReader
from vtkmodules.vtkFiltersGeneral import vtkExtractSelectedFrustum
from vtkmodules.vtkFiltersCore import vtkThreshold

# -----------------------------------------------------------------------------
# Constants
# -----------------------------------------------------------------------------

SCALE_P = 0.0001
SCALE_U = 0.01

VIEW_INTERACT = [
    {"button": 1, "action": "Rotate"},
    {"button": 2, "action": "Pan"},
    {"button": 3, "action": "Zoom", "scrollEnabled": True},
    {"button": 1, "action": "Pan", "alt": True},
    {"button": 1, "action": "Zoom", "control": True},
    {"button": 1, "action": "Pan", "shift": True},
    {"button": 1, "action": "Roll", "alt": True, "shift": True},
]

VIEW_SELECT = [{"button": 1, "action": "Select"}]

# -----------------------------------------------------------------------------
# Web App setup
# -----------------------------------------------------------------------------

app = App("F1 Probing", root=__file__, backend="vtk", debug=False)
app.layout = "./template.html"
app.state = {
    # Fields available
    "field": "solid",
    "fields": [
        {"value": "solid", "text": "Solid color"},
        {"value": "p", "text": "Pressure"},
        {"value": "U", "text": "Velocity"},
    ],
    "fieldsInformations": {},
    "colorMap": "erdc_rainbow_bright",
    # picking controls
    "pickingModes": [],
    "modes": [
        {"value": "hover", "icon": "mdi-magnify"},
        {"value": "click", "icon": "mdi-cursor-default-click-outline"},
        {"value": "select", "icon": "mdi-select-drag"},
    ],
    # Picking feedback
    "pickData": None,
    "selectData": None,
    "tooltip": "",
    "tooltipStyle": {"display": "none"},
    "cone": {},
    "coneVisibility": False,
    # Meshed
    "f1": None,
    "f1Visible": True,
    "selection": None,
    "frustrum": None,
    # View interactions
    "interactorSettings": VIEW_INTERACT,
}
app.vue_use = ["vuetify", "vtk"]

# -----------------------------------------------------------------------------
# VTK pipeline
# -----------------------------------------------------------------------------

data_directory = os.path.join(
    os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "data"
)
f1_vtp = os.path.join(data_directory, "f1.vtp")

reader = vtkXMLPolyDataReader()
reader.SetFileName(f1_vtp)
reader.Update()
f1_mesh = reader.GetOutput()
app.set("f1", app.mesh(f1_mesh, point_arrays=["p", "U"]))

# Extract fieldsInformations
fieldsInformations = {"solid": {"range": [0, 1]}}
pd = f1_mesh.GetPointData()
nb_arrays = pd.GetNumberOfArrays()
for i in range(nb_arrays):
    array = pd.GetArray(i)
    name = array.GetName()
    min, max = array.GetRange(-1)
    fieldsInformations[name] = {"name": name, "range": [min, max]}
app.set("fieldsInformations", fieldsInformations)

# Frustrum extraction
extract = vtkExtractSelectedFrustum()
extract.SetInputConnection(reader.GetOutputPort())

threshold = vtkThreshold()
threshold.SetInputConnection(extract.GetOutputPort())
threshold.ThresholdByUpper(0)
threshold.SetInputArrayToProcess(0, 0, 0, 1, "vtkInsidedness")  # 1 => cell

# -----------------------------------------------------------------------------
# Callbacks
# -----------------------------------------------------------------------------


@app.change("pickingModes")
def update_picking_mode():
    mode = app.get("pickingModes")
    if mode is None:
        app.set("tooltip", "")
        app.set("tooltipStyle", {"display": "none"})
        app.set("coneVisibility", False)
        app.set("interactorSettings", VIEW_INTERACT)
    else:
        app.set(
            "interactorSettings", VIEW_SELECT if mode == "select" else VIEW_INTERACT
        )
        app.set("frustrum", None)
        app.set("selection", None)
        app.set("selectData", None)


@app.change("selectData")
def update_selection():
    selection = app.get("selectData")
    if selection is None:
        return

    frustrum = selection.get("frustrum")
    vtk_frustrum = []
    for xyz in frustrum:
        vtk_frustrum += xyz
        vtk_frustrum += [1]

    extract.CreateFrustum(vtk_frustrum)
    extract.ShowBoundsOn()
    extract.PreserveTopologyOff()
    extract.Update()
    app.set("frustrum", app.mesh(extract.GetOutput()))
    extract.ShowBoundsOff()
    extract.PreserveTopologyOn()
    threshold.Update()
    app.set("selection", app.mesh(threshold.GetOutput()))

    app.set("selectData", None)
    app.set("pickingModes", None)


@app.change("pickData")
def update_tooltip():
    app.set("tooltip", "")
    app.set("tooltipStyle", {"display": "none"})
    app.set("coneVisibility", False)
    data = app.get("pickData")

    if app.dirty("pickData") and data and data["representationId"] == "f1":
        xyx = data["worldPosition"]
        idx = f1_mesh.FindPoint(xyx)
        if idx > -1:

            messages = []
            cone_state = {
                "resolution": 12,
                "radius": pd.GetArray("p").GetValue(idx) * SCALE_P,
                "center": f1_mesh.GetPoints().GetPoint(idx),
            }

            for i in range(nb_arrays):
                array = pd.GetArray(i)
                name = array.GetName()
                nb_comp = array.GetNumberOfComponents()
                value = array.GetValue(idx)
                value_str = f"{array.GetValue(idx):.2f}"
                norm_str = ""
                if nb_comp == 3:
                    value = array.GetTuple3(idx)
                    norm = (value[0] ** 2 + value[1] ** 2 + value[2] ** 2) ** 0.5
                    norm_str = f" norm({norm:.2f})"
                    value_str = ", ".join([f"{v:.2f}" for v in value])
                    cone_state["height"] = SCALE_U * norm
                    cone_state["direction"] = [v / norm for v in value]

                messages.append(f"{name}: {value_str} {norm_str}")

            if "height" in cone_state:
                new_center = [v for v in cone_state["center"]]
                for i in range(3):
                    new_center[i] -= (
                        0.5 * cone_state["height"] * cone_state["direction"][i]
                    )
                cone_state["center"] = new_center

            if len(messages):
                x, y, z = data["displayPosition"]
                app.set("coneVisibility", True)
                app.set("tooltip", "\n".join(messages))
                app.set("cone", cone_state)
                app.set(
                    "tooltipStyle",
                    {
                        "position": "absolute",
                        "left": f"{x + 10}px",
                        "bottom": f"{y + 10}px",
                        "zIndex": 10,
                        "pointerEvents": "none",
                    },
                )


# -----------------------------------------------------------------------------
# CLI
# -----------------------------------------------------------------------------

if __name__ == "__main__":
    app.run_server()
