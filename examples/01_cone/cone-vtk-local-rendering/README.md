## Getting started

For this example you need to use regular `python` with the current Python library.

## Setup

### Create virtual environment

```
virtualenv py-lib
source ./py-lib/bin/activate
pip install -e ./python
pip install -r ./examples/00_getting_started/cone-vtk-local-rendering/requirements.txt
```

### Run application

```
source ./py-lib/bin/activate
python ./examples/00_getting_started/cone-vtk-local-rendering/app.py --port 1234
```