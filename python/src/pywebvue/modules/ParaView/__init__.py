from pywebvue.backends.paraview import Backend

vue_use = ["vtk"]


def setup(app, **kwargs):
    test()
    app._backend = Backend(app, **kwargs)


def test():
    try:
        from paraview import simple
    except:
        raise ModuleNotFoundError("ParaView does not seems to be available.")
