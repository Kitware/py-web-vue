## Getting started

For the examples in the ParaView/**/* directories you need to use `pvpython` that comes with ParaView
along with a virtual environment with the current Python library.

ParaView 5.10+ won't need any virtual-environment.

### Run application

Follow [that setup section](https://github.com/kitware/py-web-vue#install-python-package-in-venv) for running a PyWebVue application.

### Example execution

```
/paraview/bin/pvpython ./examples/ParaView/**/app.py
```

And if you need a virtual-environment

```
/paraview/bin/pvpython ./examples/ParaView/**/app.py --virtual-env $PWD/py-lib
```
