from pywebvue.modules.VTK.core import HybridView
from pywebvue.modules.ParaView.core import apply_default_interaction_settings

from paraview import servermanager
from paraview.modules.vtkPVClientWeb import vtkPVWebApplication

from vtkmodules.web.utils import mesh as mesh_vtk

# -----------------------------------------------------------------------------
# Basic application setup
# -----------------------------------------------------------------------------

vue_use = ["vtk"]

# -----------------------------------------------------------------------------


class Helper:
    def __init__(self, app):
        self._root_protocol = None
        self._app = app
        self._pv_core = vtkPVWebApplication()
        self._pv_core.SetImageEncoding(0)
        self._hybrid_views = {}

        # Link our custom protocols initialization
        app.add_protocol_to_configure(self.configure_protocol)

    def id(self, pv_proxy):
        if pv_proxy:
            return pv_proxy.GetGlobalIDAsString()
        return ""

    def object(self, pv_id):
        try:
            pv_id = int(pv_id)
        except:
            return None
        if pv_id <= 0:
            return None
        return servermanager._getPyProxy(
            servermanager.ActiveConnection.Session.GetRemoteObject(pv_id)
        )

    def mesh(self, proxy, field_to_keep=None, point_arrays=None, cell_arrays=None):
        proxy.UpdatePipeline()
        source = proxy.GetClientSideObject()
        dataset = source.GetOutput()
        return mesh_vtk(
            dataset,
            field_to_keep=field_to_keep,
            point_arrays=point_arrays,
            cell_arrays=cell_arrays,
        )

    def scene(self, view_proxy):
        # flush data without requireing a render/picture
        tmp = view_proxy.SuppressRendering
        view_proxy.SuppressRendering = 1
        view_proxy.StillRender()
        view_proxy.SuppressRendering = tmp

        return self._app.protocol_call(
            "viewport.geometry.view.get.state", self.id(view_proxy), True
        )

    def push_image(self, view_proxy):
        if view_proxy.EnableRenderOnInteraction:
            view_proxy.EnableRenderOnInteraction = 0
        return self._app.protocol_call(
            "viewport.image.push", {"view": self.id(view_proxy)}
        )

    def camera(self, view_proxy):
        view_proxy.UpdatePropertyInformation()
        return {
            "focalPoint": list(view_proxy.CameraFocalPoint),
            "parallelProjection": view_proxy.CameraParallelProjection,
            "parallelScale": view_proxy.CameraParallelScale,
            "position": list(view_proxy.CameraPosition),
            "viewAngle": view_proxy.CameraViewAngle,
            "viewUp": list(view_proxy.CameraViewUp),
            "centerOfRotation": list(view_proxy.CenterOfRotation),
        }

    def set_camera(self, view_proxy, **kwargs):
        if "focalPoint" in kwargs:
            view_proxy.CameraFocalPoint = kwargs["focalPoint"]

        if "parallelProjection" in kwargs:
            view_proxy.CameraParallelProjection = kwargs["parallelProjection"]

        if "parallelScale" in kwargs:
            view_proxy.CameraParallelScale = kwargs["parallelScale"]

        if "position" in kwargs:
            view_proxy.CameraPosition = kwargs["position"]

        if "viewAngle" in kwargs:
            view_proxy.CameraViewAngle = kwargs["viewAngle"]

        if "viewUp" in kwargs:
            view_proxy.CameraViewUp = kwargs["viewUp"]

        if "centerOfRotation" in kwargs:
            view_proxy.CenterOfRotation = kwargs["centerOfRotation"]

    def configure_protocol(self, protocol):
        self._root_protocol = protocol

        from paraview.web.protocols import (
            ParaViewWebMouseHandler,
            ParaViewWebViewPort,
            ParaViewWebPublishImageDelivery,
            ParaViewWebLocalRendering,
        )
        from pywebvue.modules.VTK.addon_serializer import registerAddOnSerializers

        # Initialize vtk application helper
        self._root_protocol.setSharedObject("app", self._pv_core)

        # Remote rendering - image delivery
        self._root_protocol.registerLinkProtocol(ParaViewWebMouseHandler())
        self._root_protocol.registerLinkProtocol(ParaViewWebViewPort())
        self._root_protocol.registerLinkProtocol(
            ParaViewWebPublishImageDelivery(decode=False)
        )

        # Remote rendering - geometry delivery
        self._root_protocol.registerLinkProtocol(ParaViewWebLocalRendering())

        # Add custom serializer ahead of proper vtk integration
        registerAddOnSerializers()

        # Mimic client interactor on server side
        apply_default_interaction_settings()

    def add_hybrid_view(
        self,
        name,
        view,
        mode="local",
        interactive_ratio=1,
        interactive_quality=60,
        still_ratio=1,
        still_quality=98,
        **kwargs,
    ):
        if name in self._hybrid_views:
            raise ValueError(f"A view with name ({name}) is already registered")

        view_helper = HybridView(
            self,
            view,
            name,
            mode,
            interactive_ratio,
            interactive_quality,
            still_ratio,
            still_quality,
        )
        self._hybrid_views[name] = view_helper
        return view_helper


# -----------------------------------------------------------------------------
# Module advanced initialization
# -----------------------------------------------------------------------------

HELPER = None


def setup(app, **kwargs):
    global HELPER
    HELPER = Helper(app)


# -----------------------------------------------------------------------------
# Helper methods only valid once the module has been enabled
# -----------------------------------------------------------------------------


def id(vtk_obj):
    return HELPER.id(vtk_obj)


def object(vtk_id):
    return HELPER.object(vtk_id)


def mesh(dataset, field_to_keep=None, point_arrays=None, cell_arrays=None):
    return HELPER.mesh(dataset, field_to_keep, point_arrays, cell_arrays)


def scene(render_window):
    return HELPER.scene(render_window)


def push_image(render_window):
    return HELPER.push_image(render_window)


def camera(render_window):
    return HELPER.camera(render_window)


def set_camera(render_window, **kwargs):
    return HELPER.set_camera(render_window, **kwargs)


def view(view, name="view", **kwargs):
    return HELPER.add_hybrid_view(name, view, **kwargs)
