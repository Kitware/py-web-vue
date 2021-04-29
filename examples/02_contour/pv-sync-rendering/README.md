## Getting started

For this example you need to use regular `python` with the current Python library.

## Setup

### Create virtual environment

```
virtualenv py-lib
source ./py-lib/bin/activate
pip install -e ./python
pip install -r ./examples/01_contour/vtk-local-rendering/requirements.txt
```

### Run application

```
source ./py-lib/bin/activate
python ./examples/01_contour/vtk-local-rendering/app.py --port 1234
```