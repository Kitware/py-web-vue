import sys

# -----------------------------------------------------------------------------
# Virtual Environment handling
# -----------------------------------------------------------------------------

if '--virtual-env' in sys.argv:
  virtualEnvPath = sys.argv[sys.argv.index('--virtual-env') + 1]
  virtualEnv = virtualEnvPath + '/bin/activate_this.py'
  exec(open(virtualEnv).read(), {'__file__': virtualEnv})

# -----------------------------------------------------------------------------

from pywebvue import App

# -----------------------------------------------------------------------------
# Web App setup
# -----------------------------------------------------------------------------

app = App('VTK Rendering', root=__file__)
app.favicon = './favicon-196x196.png'
app.layout = './template.html'
app.state = {
    'logo': app.url('./logo.svg'),
    'resolution': 6,
}

# -----------------------------------------------------------------------------
# MAIN
#   python ./examples/.../app.py --port 1234
# -----------------------------------------------------------------------------

if __name__ == "__main__":
    app.run_server()