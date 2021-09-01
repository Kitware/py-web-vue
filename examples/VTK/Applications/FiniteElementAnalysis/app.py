import io
import numpy as np
import pandas as pd

from vtkmodules.vtkCommonCore import vtkPoints, vtkIdList
from vtkmodules.vtkCommonDataModel import vtkUnstructuredGrid, vtkCellArray
from vtkmodules.vtkFiltersCore import vtkThreshold
from vtkmodules.numpy_interface.dataset_adapter import numpyTovtkDataArray as np2da
from vtkmodules.util import vtkConstants

from pywebvue import App
from pywebvue.modules import VTK

# -----------------------------------------------------------------------------
# Constants
# -----------------------------------------------------------------------------

VIEW_INTERACT = [
    {"button": 1, "action": "Rotate"},
    {"button": 2, "action": "Pan"},
    {"button": 3, "action": "Zoom", "scrollEnabled": True},
    {"button": 1, "action": "Pan", "alt": True},
    {"button": 1, "action": "Zoom", "control": True},
    {"button": 1, "action": "Pan", "shift": True},
    {"button": 1, "action": "Roll", "alt": True, "shift": True},
]
# -----------------------------------------------------------------------------
# Web App setup
# -----------------------------------------------------------------------------

app = App("FEA - Mesh viewer")
app.state = {
    # files
    "fileNode": None,
    "fileEdge": None,
    "fileField": None,
    # meshes
    "mesh": None,
    "threshold": None,
    # filter controls
    "thresholdRange": [0, 1],
    "fullRange": [0, 1],
    # picking tooltip
    "pickData": None,
    "tooltip": "",
    "tooltipStyle": {"display": "none"},
    # ui control
    "interactorSettings": VIEW_INTERACT,
    "pickingModes": [],
}
app.enableModule(VTK)

# -----------------------------------------------------------------------------
# VTK pipeline
# -----------------------------------------------------------------------------

vtk_idlist = vtkIdList()
vtk_grid = vtkUnstructuredGrid()
vtk_filter = vtkThreshold()
vtk_filter.SetInputData(vtk_grid)
field_to_keep = "my_array"


@app.change("fileNode", "fileEdge", "fileField")
def update_grid():
    app.set("pickingModes", [])
    nodes_file = app.get("fileNode")
    if not nodes_file:
        return

    elems_file = app.get("fileEdge")
    if not elems_file:
        return

    nodes_bytes = nodes_file.get("content")
    elems_bytes = elems_file.get("content")

    df_nodes = pd.read_csv(
        io.StringIO(nodes_bytes.decode("utf-8")),
        delim_whitespace=True,
        header=None,
        skiprows=1,
        names=["id", "x", "y", "z"],
    )

    df_nodes["id"] = df_nodes["id"].astype(int)
    df_nodes = df_nodes.set_index("id", drop=True)
    # fill missing ids in range as VTK uses position (index) to map cells to points
    df_nodes = df_nodes.reindex(
        np.arange(df_nodes.index.min(), df_nodes.index.max() + 1), fill_value=0
    )

    df_elems = pd.read_csv(
        io.StringIO(elems_bytes.decode("utf-8")),
        skiprows=1,
        header=None,
        delim_whitespace=True,
        engine="python",
        index_col=None,
    ).sort_values(0)
    # order: 0: eid, 1: eshape, 2+: nodes, iloc[:,0] is index
    df_elems.iloc[:, 0] = df_elems.iloc[:, 0].astype(int)

    n_nodes = df_elems.iloc[:, 1].map(
        lambda x: int("".join(i for i in x if i.isdigit()))
    )
    df_elems.insert(2, "n_nodes", n_nodes)
    # fill missing ids in range as VTK uses position (index) to map data to cells
    new_range = np.arange(df_elems.iloc[:, 0].min(), df_elems.iloc[:, 0].max() + 1)
    df_elems = df_elems.set_index(0, drop=False).reindex(new_range, fill_value=0)

    # mapping specific to Ansys Mechanical data
    vtk_shape_id_map = {
        "Tet4": vtkConstants.VTK_TETRA,
        "Tet10": vtkConstants.VTK_QUADRATIC_TETRA,
        "Hex8": vtkConstants.VTK_HEXAHEDRON,
        "Hex20": vtkConstants.VTK_QUADRATIC_HEXAHEDRON,
        "Tri6": vtkConstants.VTK_QUADRATIC_TRIANGLE,
        "Quad8": vtkConstants.VTK_QUADRATIC_QUAD,
        "Tri3": vtkConstants.VTK_TRIANGLE,
        "Quad4": vtkConstants.VTK_QUAD,
        "Wed15": vtkConstants.VTK_QUADRATIC_WEDGE,
    }
    df_elems["cell_types"] = np.nan
    df_elems.loc[df_elems.loc[:, 0] > 0, "cell_types"] = df_elems.loc[
        df_elems.loc[:, 0] > 0, 1
    ].map(
        lambda x: vtk_shape_id_map[x.strip()]
        if x.strip() in vtk_shape_id_map.keys()
        else np.nan
    )
    df_elems = df_elems.dropna(subset=["cell_types"], axis=0)

    # convert dataframes to vtk-desired format
    points = df_nodes[["x", "y", "z"]].to_numpy()
    cell_types = df_elems["cell_types"].to_numpy()
    n_nodes = df_elems.loc[:, "n_nodes"].to_numpy()
    # subtract starting node id from all grid references in cells to avoid filling from 0 to first used node (in case mesh doesnt start at 1)
    p = df_elems.iloc[:, 3:-1].to_numpy() - df_nodes.index.min()
    # if you need to, re-order nodes here-ish
    a = np.hstack((n_nodes.reshape((len(n_nodes), 1)), p))
    # convert to flat numpy array
    cells = a.ravel()
    # remove nans (due to elements with different no. of nodes)
    cells = cells[np.logical_not(np.isnan(cells))]
    cells = cells.astype(int)

    # update grid
    vtk_pts = vtkPoints()
    vtk_pts.SetData(np2da(points))
    vtk_grid.SetPoints(vtk_pts)

    vtk_cells = vtkCellArray()
    vtk_cells.SetCells(
        cell_types.shape[0], np2da(cells, array_type=vtkConstants.VTK_ID_TYPE)
    )
    vtk_grid.SetCells(
        np2da(cell_types, array_type=vtkConstants.VTK_UNSIGNED_CHAR), vtk_cells
    )

    # Add field if any
    field_file = app.get("fileField")
    if field_file:
        field_bytes = field_file.get("content")
        df_elem_data = pd.read_csv(
            io.StringIO(field_bytes.decode("utf-8")),
            delim_whitespace=True,
            header=None,
            skiprows=1,
            names=["id", "val"],
        )
        df_elem_data = df_elem_data.sort_values("id").set_index("id", drop=True)
        # fill missing ids in range as VTK uses position (index) to map data to cells
        df_elem_data = df_elem_data.reindex(
            np.arange(df_elems.index.min(), df_elems.index.max() + 1), fill_value=0.0
        )
        np_val = df_elem_data["val"].to_numpy()
        # assign data to grid with the name 'my_array'
        vtk_array = np2da(np_val, name=field_to_keep)
        vtk_grid.GetCellData().SetScalars(vtk_array)
        app.set("fullRange", vtk_array.GetRange())
        app.set("thresholdRange", vtk_array.GetRange())
        app.set("pickingModes", ["hover"])

    app.set("mesh", VTK.mesh(vtk_grid))


@app.change("thresholdRange")
def update_filter():
    data_range = app.get("thresholdRange")
    vtk_filter.ThresholdBetween(data_range[0], data_range[1])
    vtk_filter.Update()
    ds = vtk_filter.GetOutput()
    app.set("threshold", VTK.mesh(vtk_filter.GetOutput(), field_to_keep=field_to_keep))


@app.trigger("reset")
def reset():
    app.set("mesh", None)
    app.set("threshold", None)
    app.set("fileNode", None)
    app.set("fileEdge", None)
    app.set("fileField", None)


@app.change("pickData")
def update_tooltip():
    app.set("tooltip", "")
    app.set("tooltipStyle", {"display": "none"})
    data = app.get("pickData")

    if data:
        xyx = data["worldPosition"]
        idx = vtk_grid.FindPoint(xyx)
        field = vtk_grid.GetCellData().GetArray(0)
        if idx > -1 and field:
            messages = []
            vtk_grid.GetPointCells(idx, vtk_idlist)
            for i in range(vtk_idlist.GetNumberOfIds()):
                cell_idx = vtk_idlist.GetId(i)
                value = field.GetValue(cell_idx)
                value_str = f"{value:.2f}"
                messages.append(f"Scalar: {value_str}")

            if len(messages):
                x, y, z = data["displayPosition"]
                # app.set("tooltip", "\n".join(messages))
                app.set("tooltip", messages[0])
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
# MAIN
# -----------------------------------------------------------------------------

if __name__ == "__main__":
    app.run_server()
