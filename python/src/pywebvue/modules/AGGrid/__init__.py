import os
from collections import defaultdict
import numpy as np
import pandas as pd
import simplejson
from numbers import Number
from enum import IntEnum, IntFlag

# -----------------------------------------------------------------------------

serve_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "serve"))

serve = {"__ag_grid": serve_path}
scripts = ["__ag_grid/vue-ag-grid.umd.min.js"]
styles = ["__ag_grid/vue-ag-grid.css"]
vue_use = ["AgGrid"]

# -----------------------------------------------------------------------------
# numpy types: 'biufcmMOSUV' https://numpy.org/doc/stable/reference/generated/numpy.dtype.kind.html
# -----------------------------------------------------------------------------

type_mapper = {
    "b": ["textColumn"],
    "i": [],  # ["numericColumn", "numberColumnFilter"],
    "u": [],  # ["numericColumn", "numberColumnFilter"],
    "f": [],  # ["numericColumn", "numberColumnFilter"],
    "c": [],
    "m": [],  # ['timedeltaFormat'],
    "M": [],  # ["dateColumnFilter", "shortDateTimeFormat"],
    "O": [],
    "S": [],
    "U": [],
    "V": [],
}


def cast_to_serializable(value):
    isoformat = getattr(value, "isoformat", None)
    if (isoformat) and callable(isoformat):
        return isoformat()
    elif isinstance(value, Number):
        if np.isnan(value) or np.isinf(value):
            return value.__str__()
        return value

    return value.__str__()


# -----------------------------------------------------------------------------


def to_grid(
    dataframe, sortable=[], filter=[], rowGroup=[], resizable=[], headerNames={}
):
    # Setup columns definitions
    columnDefs = []
    for col_name, col_type in zip(dataframe.columns, dataframe.dtypes):
        columnDefs.append(
            {
                "headerName": headerNames[col_name]
                if col_name in headerNames
                else col_name,
                "field": col_name,
                "type": type_mapper.get(col_type.kind, []),
                "sortable": col_name in sortable,
                "filter": col_name in filter,
                # 'rowGroup': col_name in rowGroup,
                "resizable": col_name in resizable,
                # "minWidth": min_column_width,
                # "editable": editable,
            }
        )

    # Extract row data
    rowData = dataframe.applymap(cast_to_serializable).to_dict(orient="records")

    return {
        "columnDefs": columnDefs,
        "rowData": rowData,
    }


# -----------------------------------------------------------------------------


def update_columnDefs(grid, change_set={}):
    list_to_update = grid
    if "columnDefs" in grid:
        list_to_update = grid["columnDefs"]

    for item in list_to_update:
        if item["field"] in change_set:
            item.update(change_set[item["field"]])
