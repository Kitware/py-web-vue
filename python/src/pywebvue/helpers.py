
class RemoteLocalView:
    def __init__(self, app, view, namespace='', interactive_ratio=1, interactive_quality=60, still_ratio=1, still_quality=98, ref='view'):
        self._app = app
        self._view = view
        self._view_id = app.id(view)

        # Image setup
        self.i_ratio = interactive_ratio
        self.i_quality = interactive_quality
        self.s_ratio = still_ratio
        self.s_quality = still_quality

        # init keys
        self.ref_key = namespace if namespace else ref
        self.mode_key = f'{namespace}.mode' if namespace else 'mode'
        self.scene_key = f'{namespace}.scene' if namespace else 'scene'
        self.camera_key = f'{namespace}.camera' if namespace else 'camera'
        self.animation_key = f'{namespace}.animate' if namespace else 'animate'

        # Attach annotations
        app.trigger(self.camera_key)(self.update_camera)
        app.trigger(f'{self.animation_key}.start')(self.start_animation)
        app.trigger(f'{self.animation_key}.stop')(self.stop_animation)


    def start_animation(self):
        self._app.set(self.mode_key, 'remote')
        self._app.protocol_call('viewport.image.push.quality', self._view_id, self.i_quality, self.i_ratio)
        self._app.protocol_call('viewport.image.animation.start', self._view_id)

    def stop_animation(self):
        self._app.protocol_call('viewport.image.animation.stop', self._view_id)
        self._app.protocol_call('viewport.image.push.quality', self._view_id, self.s_quality, self.s_ratio)
        self.push_geometry()
        self._app.set(self.mode_key, 'local')

    def push_geometry(self):
        self._app.set(self.scene_key, self._app.scene(self._view))

    def push_image(self):
        self._app.push_image(self._view)

    def update_camera(self, camera=None):
        if camera:
            self._app.set_camera(self._view, **camera)
            self.push_image()
        else:
            # Need to update local camera
            camera = self._app.camera(self._view)
            self._app.update(ref=self.ref_key, method='setCamera', args=[camera])
