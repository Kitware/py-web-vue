import os
import argparse
from .protocol import CoreServer
from .utils import ChangeHandler, CallbackSet, read_file_as_txt, read_file_as_base64_url, validate, abs_path
from .backends import create_backend

from wslink import server

WWW_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'www')

class App:
    def __init__(self, name, root=None, backend=False, debug=False, **kwargs):
        self.name = name
        self._root = root
        self._backend = create_backend(self, backend)
        self._debug = debug

        self.on_ready = None
        self.active_objects = {}

        # May need to protect but aimed to be set by user
        self.vuetify = {}
        self.state = {}
        self.scripts = []
        self.styles = []
        self.vue_use = ['vuetify', 'router', 'vtk']
        self.serve = {}

        # properties
        self._favicon = None
        self._layout = '<div>Ws Vue default</div>'
        self._routes = []

        # @change
        self._change_callbacks = {}
        self._change_handlers = []
        self._server_keys = set()

        # @trigger
        self._triggers = {}

    # -------------------------------------------------------------------------
    # Annotations
    # -------------------------------------------------------------------------

    def change(self, *_args, **_kwargs):
        """
        Use as decorator `@app.change(key1, key2, ...)`
        """
        def register_change_callback(func):
            for name in _args:
                if name not in self._change_callbacks:
                    self._change_callbacks[name] = []
                self._change_callbacks[name].append(func)
                self._server_keys.add(name)
            return func

        return register_change_callback

    # -------------------------------------------------------------------------

    def trigger(self, name):
        """
        Use as decorator `@app.trigger(name)`
        """
        def register_trigger(func):
            self._triggers[name] = func
            return func

        return register_trigger


    # -------------------------------------------------------------------------
    # Properties
    # -------------------------------------------------------------------------

    @property
    def layout(self):
        return self._layout

    @layout.setter
    def layout(self, value):
        self._layout = validate(value, read_file_as_txt, self._root)
        if self.protocol:
            self.protocol.push_layout(self._layout)

    # -------------------------------------------------------------------------

    @property
    def favicon(self):
        return self._favicon

    @favicon.setter
    def favicon(self, value):
        self._favicon = validate(value, read_file_as_base64_url, self._root)

    # -------------------------------------------------------------------------

    @property
    def routes(self):
        return self._routes

    @routes.setter
    def routes(self, value):
        self._routes = value
        if self.protocol:
            self.protocol.push_routes(self._routes)

    # -------------------------------------------------------------------------
    # API client / server
    # -------------------------------------------------------------------------

    def get(self, key):
        return self.state[key]

    # -------------------------------------------------------------------------

    def set(self, key, value):
        if key not in self.state or self.state[key] != value:
            self.state[key] = value
            for change_handler in self._change_handlers:
                change_handler.modified(key, value)

    # -------------------------------------------------------------------------

    def update(self, **kwargs):
        for change_handler in self._change_handlers:
            change_handler.add_action(**kwargs)

    # -------------------------------------------------------------------------

    def capture_changes(self, known_state={}):
        return ChangeHandler(self, known_state)

    # -------------------------------------------------------------------------
    # Helper methods
    # -------------------------------------------------------------------------

    def url(self, file_path):
        return read_file_as_base64_url(file_path, self._root)

    # -------------------------------------------------------------------------

    def txt(self, file_path):
        return read_file_as_txt(file_path, self._root)

    # -------------------------------------------------------------------------

    def id(self, obj):
        return self._backend.id(obj)

    # -------------------------------------------------------------------------

    def object(self, obj_id):
        return self._backend.object(obj_id)

    # -------------------------------------------------------------------------

    def mesh(self, mesh_obj, field_name=None):
        return self._backend.mesh(mesh_obj, field_name)

    # -------------------------------------------------------------------------

    def scene(self, view_obj):
        return self._backend.scene(view_obj)

    # -------------------------------------------------------------------------

    def push_image(self, view_obj):
        return self._backend.push_image(view_obj)

    # -------------------------------------------------------------------------

    def camera(self, view_obj):
        return self._backend.camera(view_obj)

    # -------------------------------------------------------------------------

    def set_camera(self, view_obj, **kwargs):
        return self._backend.set_camera(view_obj, **kwargs)

    # -------------------------------------------------------------------------
    # common
    # -------------------------------------------------------------------------

    def get_initial_state(self):
        state = {
            'name': self.name,
            'vuetify': self.vuetify,
            'layout': self.layout,
            'favicon': self.favicon,
            'routes': self.routes,
            'state': self.state,
            'scripts': self.scripts,
            'use': self.vue_use,
            'styles': self.styles,
            'stateListening': list(self._server_keys),
        }
        return state

    # -------------------------------------------------------------------------

    @property
    def protocol(self):
        return self._backend._protocol

    # -------------------------------------------------------------------------

    def protocol_call(self, method, *args, **kwargs):
        if self.protocol:
            pair = self.protocol.getRPCMethod(method)
            if pair:
                obj, func = pair
                return func(obj, *args, **kwargs)

    # -------------------------------------------------------------------------
    # Start server
    # -------------------------------------------------------------------------

    def run_server(self, port=None):
        CoreServer.app = self
        CoreServer.DEBUG = self._debug

        parser = argparse.ArgumentParser(description="PyWebVue server By Kitware")
        CoreServer.add_arguments(parser)
        args = parser.parse_known_args()[0]

        if port:
            args.port = port

        if not args.content:
            args.content = WWW_DIR

        if len(self.serve):
            endpoints = []
            for key in self.serve:
                endpoints.append(f'{key}={abs_path(self.serve[key], self._root)}')
            args.fsEndpoints = '|'.join(endpoints)
            print(args.fsEndpoints)

        CoreServer.configure(args)
        CoreServer.start_webserver(args)
