from .utils import mesh

class Backend:
    def __init__(self, app):
        from vtk.vtkWebCore import vtkWebApplication
        self._app = app
        self._protocol = None

        # Need it for id/object methods
        self._app_helper = vtkWebApplication()
        self._app_helper = vtkWebApplication()
        self._app_helper.SetImageEncoding(0)

    def id(self, vtk_obj):
        return str(self._app_helper.GetObjectIdMap().GetGlobalId(vtk_obj))

    def object(self, vtk_id):
        return self._app_helper().GetObjectIdMap().GetVTKObject(int(vtk_id))

    def mesh(self, dataset, field_to_keep=None, point_arrays=None, cell_arrays=None):
        return mesh(dataset, field_name=field_to_keep, point_arrays=point_arrays, cell_arrays=cell_arrays)

    def scene(self, render_window):
        return self._app.protocol_call('viewport.geometry.view.get.state', self.id(render_window), True)

    def push_image(self, render_window):
        # Disable any double render...
        render_window.GetInteractor().EnableRenderOff()
        return self._app.protocol_call('viewport.image.push', { 'view': self.id(render_window) })

    def camera(self, render_window):
        camera = render_window.GetRenderers().GetFirstRenderer().GetActiveCamera()
        return {
            'focalPoint': list(camera.GetFocalPoint()),
            'parallelProjection': camera.GetParallelProjection(),
            'parallelScale': camera.GetParallelScale(),
            'position': list(camera.GetPosition()),
            'viewAngle': camera.GetViewAngle(),
            'viewUp': list(camera.GetViewUp()),
            'centerOfRotation': list(camera.GetFocalPoint()), # no center of rotation
        }

    def set_camera(self, render_window, **kwargs):
        camera = render_window.GetRenderers().GetFirstRenderer().GetActiveCamera()
        if 'focalPoint' in kwargs:
            camera.SetFocalPoint(kwargs['focalPoint'])

        if 'parallelProjection' in kwargs:
            camera.SetParallelProjection(kwargs['parallelProjection'])

        if 'parallelScale' in kwargs:
            camera.SetParallelScale(kwargs['parallelScale'])

        if 'position' in kwargs:
            camera.SetPosition(kwargs['position'])

        if 'viewAngle' in kwargs:
            camera.SetViewAngle(kwargs['viewAngle'])

        if 'viewUp' in kwargs:
            camera.SetViewUp(kwargs['viewUp'])

    def configure_protocol(self, protocol):
        self._protocol = protocol
        from .protocols import vtkWebMouseHandler, vtkWebViewPort, vtkWebPublishImageDelivery, vtkWebLocalRendering

        # Initialize vtk application helper
        self._protocol.setSharedObject("app", self._app_helper)

        # Remote rendering - image delivery
        self._protocol.registerLinkProtocol(vtkWebMouseHandler())
        self._protocol.registerLinkProtocol(vtkWebViewPort())
        self._protocol.registerLinkProtocol(vtkWebPublishImageDelivery(decode=False))

        # Remote rendering - geometry delivery
        self._protocol.registerLinkProtocol(vtkWebLocalRendering())

        # Register active view/source/...
        for key in self._app.active_objects:
            self._app_helper.GetObjectIdMap().SetActiveObject(key, self._app.active_objects[key])