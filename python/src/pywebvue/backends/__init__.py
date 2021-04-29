def create_backend(app, name=None):
    if not name:
        from .core import Backend
        return Backend(app)

    if name == 'vtk':
        from .vtk import Backend
        return Backend(app)

    if name == 'paraview':
        from .paraview import Backend
        return Backend(app)