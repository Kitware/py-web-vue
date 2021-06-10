import os
import base64

from pywebvue import App

from vtkmodules.vtkIOXML import vtkXMLPolyDataReader

# -----------------------------------------------------------------------------
# Web App setup
# -----------------------------------------------------------------------------

app = App("File loading", backend="vtk")
app.layout = "./template.html"
app.state = {
    "files": None,
    "meshes": [],
    "field": "solid",
    "fields": [],
}
app.vue_use = ["vuetify", "vtk"]


# -----------------------------------------------------------------------------
# For real apache https/wss deployment
# -----------------------------------------------------------------------------

# app.launcher = {
#     "configuration": {
#         "sessionURL" : "wss://USE_HOST/proxy=$sessionId",
#     },
# }

# --- for test / debug ---
# app.launcher = {
#     "resources" : [ { "host" : "localhost", "port_range" : [9001, 9001] } ],
#     "apps": {
#         "PyWebVue" : {
#             "cmd": ["python", "-m", "wrong"],
#             "ready_line": "ready",
#         },
#     },
# }

# -----------------------------------------------------------------------------
# Callbacks
# -----------------------------------------------------------------------------


@app.change("files")
def load_client_files():
    field = "solid"
    fields = {
        "solid": {"value": "solid", "text": "Solid color", "range": [0, 1]},
    }
    meshes = []
    files = app.get("files")
    filesOutput = []

    if files and len(files):
        if not files[0].get("content"):
            return

        for file in files:
            print(f'Load {file.get("name")}')
            bytes = file.get("content")
            filesOutput.append({"name": file.get("name"), "size": file.get("size")})
            reader = vtkXMLPolyDataReader()
            reader.ReadFromInputStringOn()
            reader.SetInputString(bytes)
            reader.Update()
            ds = reader.GetOutputAsDataSet(0)
            point_arrays = []
            pd = ds.GetPointData()
            nb_arrays = pd.GetNumberOfArrays()
            for i in range(nb_arrays):
                array = pd.GetArray(i)
                name = array.GetName()
                min, max = array.GetRange(-1)
                fields[name] = {
                    "name": name,
                    "range": [min, max],
                    "value": name,
                    "text": name,
                    "scalarMode": 3,
                }
                point_arrays.append(name)

            cell_arrays = []
            cd = ds.GetCellData()
            nb_arrays = cd.GetNumberOfArrays()
            for i in range(nb_arrays):
                array = cd.GetArray(i)
                name = array.GetName()
                min, max = array.GetRange(-1)
                fields[name] = {
                    "name": name,
                    "range": [min, max],
                    "value": name,
                    "text": name,
                    "scalarMode": 4,
                }
                cell_arrays.append(name)

            meshes.append(
                app.mesh(ds, point_arrays=point_arrays, cell_arrays=cell_arrays)
            )

    app.set("field", field)
    app.set("fields", fields)
    app.set("meshes", meshes)
    app.set("files", filesOutput)
    print(f"show {len(meshes)} meshes")


# -----------------------------------------------------------------------------
# CLI
# -----------------------------------------------------------------------------

if __name__ == "__main__":
    app.run_server()
