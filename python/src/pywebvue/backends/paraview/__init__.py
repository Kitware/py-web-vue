from ..vtk.utils import mesh
from paraview import servermanager

def apply_default_interaction_settings():
    # ProxyManager helper
    pxm = servermanager.ProxyManager()

    # Update interaction mode
    interactionProxy = pxm.GetProxy('settings', 'RenderViewInteractionSettings')
    interactionProxy.Camera3DManipulators = [
        'Rotate', 'Pan', 'Zoom',  # -
        'Pan', 'Roll', 'Pan',     # shift
        'Zoom', 'Rotate', 'Zoom', # ctrl
    ]

    # Custom rendering settings
    renderingSettings = pxm.GetProxy('settings', 'RenderViewSettings')
    renderingSettings.LODThreshold = 102400

class Backend:
    def __init__(self, app):
        self._app = app
        self._protocol = None

    def id(self, pv_proxy):
        return pv_proxy.GetGlobalIDAsString()

    def object(self, pv_id):
        try:
            pv_id = int(pv_id)
        except:
            return None
        if pv_id <= 0:
            return None
        return servermanager._getPyProxy(servermanager.ActiveConnection.Session.GetRemoteObject(pv_id))

    def mesh(self, proxy, field_to_keep=None, point_arrays=None, cell_arrays=None):
        source = proxy.GetClientSideObject()
        dataset = source.GetOutput()
        return mesh(dataset, field_name=field_to_keep, point_arrays=point_arrays, cell_arrays=cell_arrays)

    def scene(self, view_proxy):
        # flush data without requireing a render/picture
        tmp = view_proxy.SuppressRendering
        view_proxy.SuppressRendering = 1
        view_proxy.StillRender()
        view_proxy.SuppressRendering = tmp

        return self._app.protocol_call('viewport.geometry.view.get.state', self.id(view_proxy), True)

    def push_image(self, view_proxy):
        if view_proxy.EnableRenderOnInteraction:
            view_proxy.EnableRenderOnInteraction = 0
        return self._app.protocol_call('viewport.image.push', { 'view': self.id(view_proxy) })

    def camera(self, view_proxy):
        view_proxy.UpdatePropertyInformation()
        return {
            'focalPoint': list(view_proxy.CameraFocalPoint),
            'parallelProjection': view_proxy.CameraParallelProjection,
            'parallelScale': view_proxy.CameraParallelScale,
            'position': list(view_proxy.CameraPosition),
            'viewAngle': view_proxy.CameraViewAngle,
            'viewUp': list(view_proxy.CameraViewUp),
            'centerOfRotation': list(view_proxy.CenterOfRotation),
        }

    def set_camera(self, view_proxy, **kwargs):
        if 'focalPoint' in kwargs:
            view_proxy.CameraFocalPoint = kwargs['focalPoint']

        if 'parallelProjection' in kwargs:
            view_proxy.CameraParallelProjection = kwargs['parallelProjection']

        if 'parallelScale' in kwargs:
            view_proxy.CameraParallelScale = kwargs['parallelScale']

        if 'position' in kwargs:
            view_proxy.CameraPosition = kwargs['position']

        if 'viewAngle' in kwargs:
            view_proxy.CameraViewAngle = kwargs['viewAngle']

        if 'viewUp' in kwargs:
            view_proxy.CameraViewUp = kwargs['viewUp']

        if 'centerOfRotation' in kwargs:
            view_proxy.CenterOfRotation = kwargs['centerOfRotation']

    def configure_protocol(self, protocol):
        self._protocol = protocol

        from .protocols import ParaViewWebMouseHandler, ParaViewWebViewPort, ParaViewWebPublishImageDelivery, ParaViewWebLocalRendering
        from paraview.modules.vtkPVClientWeb import vtkPVWebApplication

        # Initialize vtk application helper
        protocol_app = vtkPVWebApplication()
        protocol_app.SetImageEncoding(0)
        self._protocol.setSharedObject("app", protocol_app)

        # Remote rendering - image delivery
        self._protocol.registerLinkProtocol(ParaViewWebMouseHandler())
        self._protocol.registerLinkProtocol(ParaViewWebViewPort())
        self._protocol.registerLinkProtocol(ParaViewWebPublishImageDelivery(decode=False))

        # Remote rendering - geometry delivery
        self._protocol.registerLinkProtocol(ParaViewWebLocalRendering())

        # Mimic client interactor on server side
        apply_default_interaction_settings()
