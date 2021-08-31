from pywebvue.backends.vtk import Backend

vue_use = ["vtk"]


def setup(app, **kwargs):
    test()
    app._backend = Backend(app, **kwargs)


def test():
    try:
        from vtkmodules.web.utils import mesh
    except:
        raise ModuleNotFoundError(
            "VTK does not seems to be available. Or at least not the proper version."
        )
