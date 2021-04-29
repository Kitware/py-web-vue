## Getting started

For this example you need to use `pvpython` that comes with ParaView
along with a virtual environment with the current Python library.

## Setup

### Create virtual environment

```
virtualenv py-lib
source ./py-lib/bin/activate
pip install -e ./python
```

### Run application

```
export DISPLAY=:1
/paraview/bin/pvpython ./examples/00_getting_started/cone-pv-local-rendering/app.py --virtual-env $PWD/py-lib
```