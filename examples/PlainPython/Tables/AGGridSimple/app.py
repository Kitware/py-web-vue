from pywebvue import App
from pywebvue.modules import AGGrid

# -----------------------------------------------------------------------------
# App Setup
# -----------------------------------------------------------------------------

app = App("Grid Demo")
app.state = {
    "columnDefs": [
        {"field": "make", "sortable": True},
        {"field": "model"},
        {"field": "price"},
    ],
    "rowData": [
        {"make": "Toyota", "model": "Celica", "price": 35000},
        {"make": "Ford", "model": "Mondeo", "price": 32000},
        {"make": "Porsche", "model": "Boxter", "price": 72000},
    ],
}
app.enable_module(AGGrid)

# -----------------------------------------------------------------------------
# Start server
# -----------------------------------------------------------------------------

if __name__ == "__main__":
    app.run_server()
