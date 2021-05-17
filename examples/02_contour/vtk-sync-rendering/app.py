import sys

# -----------------------------------------------------------------------------
# Virtual Environment handling
# -----------------------------------------------------------------------------

if '--virtual-env' in sys.argv:
  virtualEnvPath = sys.argv[sys.argv.index('--virtual-env') + 1]
  virtualEnv = virtualEnvPath + '/bin/activate_this.py'
  exec(open(virtualEnv).read(), {'__file__': virtualEnv})

# -----------------------------------------------------------------------------

import os
from pywebvue import App

from vtkmodules.vtkIOXML import vtkXMLImageDataReader
from vtkmodules.vtkFiltersCore import vtkContourFilter
from vtkmodules.vtkRenderingCore import vtkRenderer, vtkRenderWindow, vtkRenderWindowInteractor, vtkPolyDataMapper, vtkActor
from vtkmodules.vtkInteractionStyle import vtkInteractorStyleSwitch

# -----------------------------------------------------------------------------
# User Settings
# -----------------------------------------------------------------------------

# Print state size when pushed to client
DEBUG = False

# Ask for new contour while dragging
INTERACTIVE_SLIDER = True

# -----------------------------------------------------------------------------
# Web App setup
# -----------------------------------------------------------------------------

app = App('VTK contour - Synch rendering', root=__file__, debug=DEBUG, backend='vtk')
app.layout = './template-input.html' if INTERACTIVE_SLIDER else './template-change.html'
app.state = {
    'data_range': [0, 1],
    'contour_value': 0,
}
app.vue_use = ['vuetify', 'vtk']

# -----------------------------------------------------------------------------
# VTK pipeline
# -----------------------------------------------------------------------------

data_directory = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'data')
head_vti = os.path.join(data_directory, 'head.vti')

print(head_vti)

reader = vtkXMLImageDataReader()
reader.SetFileName(head_vti)
reader.Update()

contour = vtkContourFilter()
contour.SetInputConnection(reader.GetOutputPort())
contour.SetComputeNormals(1)
contour.SetComputeScalars(0)

# Extract data range => Update store/state
data_range = reader.GetOutput().GetPointData().GetScalars().GetRange()
app.set('data_range', data_range)
app.set('contour_value', 0.5 * (data_range[0] + data_range[1]))

# Configure contour with valid values
contour.SetNumberOfContours(1)
contour.SetValue(0, app.get('contour_value'))

# Rendering setup
renderer = vtkRenderer()
renderWindow = vtkRenderWindow()
renderWindow.AddRenderer(renderer)

renderWindowInteractor = vtkRenderWindowInteractor()
renderWindowInteractor.SetRenderWindow(renderWindow)
renderWindowInteractor.GetInteractorStyle().SetCurrentStyleToTrackballCamera()

mapper = vtkPolyDataMapper()
actor = vtkActor()
mapper.SetInputConnection(contour.GetOutputPort())
actor.SetMapper(mapper)
renderer.AddActor(actor)
renderer.ResetCamera()

app.active_objects = {
    'VIEW': renderWindow,
}

# -----------------------------------------------------------------------------
# Callbacks
# -----------------------------------------------------------------------------

@app.change('contour_value')
def update_contour():
    contour.SetValue(0, app.get('contour_value'))
    app.set('scene', app.scene(renderWindow))

# -----------------------------------------------------------------------------
# MAIN
#   /opt/paraview/bin/pvpython ./examples/.../app.py --port 1234 --virtual-env ~/Documents/code/Web/vue-py/py-lib
# -----------------------------------------------------------------------------

if __name__ == "__main__":
    app.on_ready = update_contour
    app.run_server()