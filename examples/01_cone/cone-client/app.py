from pywebvue import App

# -----------------------------------------------------------------------------
# Web App setup
# -----------------------------------------------------------------------------

app = App("VTK Rendering")
app.favicon = "./favicon.png"
app.layout = "./template.html"
app.state = {
    "logo": app.url("./logo.svg"),
    "resolution": 6,
}
app.vue_use += ["vtk"]

# -----------------------------------------------------------------------------
# MAIN
#   python ./examples/.../app.py --port 1234
# -----------------------------------------------------------------------------

if __name__ == "__main__":
    app.run_server()
