import pywebvue

app = pywebvue.App("Getting started")

# Remove any pre-loaded library
app.vue_use = []

app.layout = """
   <div>
        <h1>Hello {{ name }}</h1>
        <button type="button" @click="name = names[Math.floor(Math.random() * 3)]">Change</button>
    </div>
"""

app.state = {
    "name": "World",
    "names": ["World", "Seb", "Everyone"],
}

# -----------------------------------------------------------------------------

if __name__ == "__main__":
    app.run_server()
