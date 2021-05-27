import sys

# -----------------------------------------------------------------------------
# Virtual Environment handling
# -----------------------------------------------------------------------------

if "--virtual-env" in sys.argv:
    virtualEnvPath = sys.argv[sys.argv.index("--virtual-env") + 1]
    virtualEnv = virtualEnvPath + "/bin/activate_this.py"
    exec(open(virtualEnv).read(), {"__file__": virtualEnv})

# -----------------------------------------------------------------------------

import pywebvue

# -----------------------------------------------------------------------------
# Web App setup
# -----------------------------------------------------------------------------
# JS:
#   get(key)                                        # get value from state
#   set(key, value)                                 # set value to state for server
#   trigger(key, args, kwargs)                      # call method on server side
# PY:
#   app:
#     .vuetify                                      # vuetify config
#     .layout                                       # view single page app
#     .state = {}                                   # shared state with client
#     .scripts = []                                 # file to load from URLs
#     .styles = []                                  # file to load from URLs
#     .serve = { url_path: directory_path, ... }    # map static content to http server
#     .set(key, value)                              # update state
#     .get(key)                                     # get value from state
#     .run_server(port=8080)                        # start web server
#     .run_launcher(port=8080, sessionURL='ws://kitware.org/proxy?id=${id}')                        # start web server
#   @app:
#     .change(state_key)                            # callback when pieces of the state change
#     .trigger(key)                                 # bind server side trigger to client call
# -----------------------------------------------------------------------------

app = pywebvue.App("Getting started")

app.layout = """
   <div>Hello {{ get('name') }}<button @click="set('name', get('names')[Math.floor(Math.random() * 3)])">Change</button></div>
"""

app.state = {"name": "World", "names": ["World", "Seb", "Everyone"]}

app.vue_use = []

# -----------------------------------------------------------------------------

if __name__ == "__main__":
    app.run_server()
