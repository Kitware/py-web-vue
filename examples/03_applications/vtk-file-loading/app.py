import os
import base64

from pywebvue import App

from vtkmodules.vtkIOXML import vtkXMLPolyDataReader

# -----------------------------------------------------------------------------
# Web App setup
# -----------------------------------------------------------------------------

app = App("File loading", root=__file__, backend="vtk", debug=False)
app.layout = "./template.html"
app.state = {
    "files": None,
    "meshes": [],
}
app.vue_use = ["vuetify", "vtk"]

# -----------------------------------------------------------------------------
# VTK pipeline
# -----------------------------------------------------------------------------

reader = vtkXMLPolyDataReader()
reader.ReadFromInputStringOn()

# -----------------------------------------------------------------------------
# Callbacks
# -----------------------------------------------------------------------------

@app.change("files")
def load_client_files():
    files = app.get("files")
    meshes = []
    if files:
        for file in files:
            base64Str = file.get('base64')
            bytes = base64.b64decode(base64Str)
            reader.SetInputString(bytes)
            reader.Update()
            ds = reader.GetOutputAsDataSet(0)
            meshes.append(app.mesh(ds))
        app.set('meshes', meshes)


# -----------------------------------------------------------------------------
# CLI
# -----------------------------------------------------------------------------

if __name__ == "__main__":
    app.run_server()
