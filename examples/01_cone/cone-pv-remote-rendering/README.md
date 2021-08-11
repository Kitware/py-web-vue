## Getting started

For this example you need to use `pvpython` that comes with ParaView
along with a virtual environment with the current Python library.

### Run application

Follow [that setup section](https://github.com/kitware/py-web-vue#install-python-package-in-venv) for running a PyWebVue application.

```
export DISPLAY=:1
/paraview/bin/pvpython ./examples/00_getting_started/cone-pv-remote-rendering/app.py --virtual-env $PWD/py-lib
```