## Getting started

For this example you need to use `pvpython` or `vtkpython` that comes with ParaView or VTK
along with a virtual environment with the current Python library.

### Run application

Follow [that setup section](https://github.com/kitware/py-web-vue#install-python-package-in-venv) for running a PyWebVue application.

```
export DISPLAY=:1
/paraview/bin/pvpython ./examples/00_getting_started/cone-vtk-remote-rendering/app.py --virtual-env $PWD/py-lib
```

or

```
export DISPLAY=:1
vtkpython ./examples/00_getting_started/cone-vtk-remote-rendering/app.py --virtual-env $PWD/py-lib
```
