try:
    from vtkmodules.vtkWebCore import vtkWebApplication
    from vtkmodules.web.utils import mesh as vtk_mesh
except ImportError:
    print("> VTK is not available inside your Python environment")

from pywebvue.modules.VTK.core import HybridView

# -----------------------------------------------------------------------------
# Basic application setup
# -----------------------------------------------------------------------------

vue_use = ["vtk"]
has_vtk = "vtkWebApplication" in locals()

# -----------------------------------------------------------------------------


class Helper:
    def __init__(self, app):
        self._root_protocol = None
        self._app = app
        if has_vtk:
            self._vtk_core = vtkWebApplication()
            self._vtk_core.SetImageEncoding(0)
            self._hybrid_views = {}

            # Link our custom protocols initialization
            app.add_protocol_to_configure(self.configure_protocol)

    def id(self, vtk_obj):
        if not vtk_obj:
            return ""
        return str(self._vtk_core.GetObjectIdMap().GetGlobalId(vtk_obj))

    def object(self, vtk_id):
        return self._vtk_core.GetObjectIdMap().GetVTKObject(int(vtk_id))

    def mesh(self, dataset, field_to_keep=None, point_arrays=None, cell_arrays=None):
        if dataset.IsA("vtkAlgorithm"):
            dataset.Update()
            dataset = dataset.GetOutput()
        return vtk_mesh(
            dataset,
            field_to_keep=field_to_keep,
            point_arrays=point_arrays,
            cell_arrays=cell_arrays,
        )

    def scene(self, render_window):
        return self._app.protocol_call(
            "viewport.geometry.view.get.state", self.id(render_window), True
        )

    def push_image(self, render_window):
        # Disable any double render...
        render_window.GetInteractor().EnableRenderOff()
        return self._app.protocol_call(
            "viewport.image.push", {"view": self.id(render_window)}
        )

    def camera(self, render_window):
        camera = render_window.GetRenderers().GetFirstRenderer().GetActiveCamera()
        return {
            "focalPoint": list(camera.GetFocalPoint()),
            "parallelProjection": camera.GetParallelProjection(),
            "parallelScale": camera.GetParallelScale(),
            "position": list(camera.GetPosition()),
            "viewAngle": camera.GetViewAngle(),
            "viewUp": list(camera.GetViewUp()),
            "centerOfRotation": list(camera.GetFocalPoint()),  # no center of rotation
        }

    def set_camera(self, render_window, **kwargs):
        camera = render_window.GetRenderers().GetFirstRenderer().GetActiveCamera()
        if "focalPoint" in kwargs:
            camera.SetFocalPoint(kwargs["focalPoint"])

        if "parallelProjection" in kwargs:
            camera.SetParallelProjection(kwargs["parallelProjection"])

        if "parallelScale" in kwargs:
            camera.SetParallelScale(kwargs["parallelScale"])

        if "position" in kwargs:
            camera.SetPosition(kwargs["position"])

        if "viewAngle" in kwargs:
            camera.SetViewAngle(kwargs["viewAngle"])

        if "viewUp" in kwargs:
            camera.SetViewUp(kwargs["viewUp"])

    def configure_protocol(self, protocol):
        self._root_protocol = protocol
        from vtkmodules.web.protocols import (
            vtkWebMouseHandler,
            vtkWebViewPort,
            vtkWebPublishImageDelivery,
            vtkWebLocalRendering,
        )
        from .addon_serializer import registerAddOnSerializers

        # Initialize vtk application helper
        self._root_protocol.setSharedObject("app", self._vtk_core)

        # Remote rendering - image delivery
        self._root_protocol.registerLinkProtocol(vtkWebMouseHandler())
        self._root_protocol.registerLinkProtocol(vtkWebViewPort())
        self._root_protocol.registerLinkProtocol(
            vtkWebPublishImageDelivery(decode=False)
        )

        # Remote rendering - geometry delivery
        self._root_protocol.registerLinkProtocol(vtkWebLocalRendering())

        # Add custom serializer ahead of proper vtk integration
        registerAddOnSerializers()

        # Register active view/source/...
        for key in self._app.active_objects:
            self._vtk_core.GetObjectIdMap().SetActiveObject(
                key, self._app.active_objects[key]
            )

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

    def reload_app(self):
        self._hybrid_views = {}


# -----------------------------------------------------------------------------
# Module advanced initialization
# -----------------------------------------------------------------------------

HELPER = None


def setup(app, **kwargs):
    global HELPER
    if has_vtk:
        HELPER = Helper(app)


def reload_app():
    if HELPER:
        HELPER.reload_app()


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
