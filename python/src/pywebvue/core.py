import os
import argparse
from .protocol import CoreServer
from .utils import (
    ChangeHandler,
    read_file_as_txt,
    read_file_as_base64_url,
    validate,
    abs_path,
    monitor,
    clean_state,
    clean_value,
    base_directory,
)
from .backends import create_backend

from wslink import server

WWW_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "www")


class App:
    def __init__(
        self,
        name,
        backend=False,
        debug=False,
        create_protocols=None,
        **kwargs,
    ):
        self.name = name
        self._root = base_directory()
        self._backend = create_backend(self, backend, create_protocols)
        self._debug = debug

        self.on_ready = None
        self.active_objects = {}

        # May need to protect but aimed to be set by user
        self.vuetify = {}
        self.state = {}
        self.scripts = []
        self.styles = []
        self.vue_use = ["vuetify"]
        self.serve = {}
        self.launcher = {}

        # properties
        self._favicon = None
        self._layout = "<div>Ws Vue default</div>"
        self._layout_monitor = None
        self._routes = []

        # @change
        self._dirty_set = None
        self._change_callbacks = {}
        self._change_handlers = []
        self._server_keys = set()

        # @trigger
        self._triggers = {}

        # CLI argument handling
        self._parser = None

        # protocols to register
        self._protocols_to_register = []

        # Watch template if debug=True
        if self._debug:
            pass

    # -------------------------------------------------------------------------
    # State management helpers
    # -------------------------------------------------------------------------

    def listen(self, *_args):
        """
        This method needs to be call explicitly if the server expect to use
        a state variable that can be updated by the client but that is not
        listed inside any @app.change(). This allow the server to properly
        describe to the client its dependencies at initialization time.
        This usually happen when app.get() is called inside methods and
        does not need to leverage the @app.change() callback on itself.
        """
        for name in _args:
            self._server_keys.add(name)

    def flush_state(self, *_args):
        state_to_flush = {}
        if len(_args):
            for key in _args:
                state_to_flush[key] = clean_value(self.state[key])
        else:
            # flush any pending ChangeHandler
            for change_handler in self._change_handlers:
                state_to_flush.update(change_handler.modified_state)

        if self.protocol:
            self.protocol.push_state_change(state_to_flush)

    def flush_actions(self):
        actions_to_flush = []
        for change_handler in self._change_handlers:
            actions_to_flush.extend(change_handler.actions)
            change_handler.clear_actions()

        if self.protocol and len(actions_to_flush):
            self.protocol.push_actions(actions_to_flush)

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
    # CLI handling
    # -------------------------------------------------------------------------

    @property
    def cli_parser(self):
        if self._parser:
            return self._parser

        self._parser = argparse.ArgumentParser(description="PyWebVue server By Kitware")

        # Launcher / multi-users
        self._parser.add_argument(
            "--launcher",
            help="Start launcher process rather than single process server",
            action="store_true",
        )

        # Deploy helper
        self._parser.add_argument("--deploy", help="Prepare a deployable directory")
        self._parser.add_argument(
            "--name",
            default="pywebvue",
            help="Name to use for that application in the deploy tree",
        )

        CoreServer.add_arguments(self._parser)

        return self._parser

    @property
    def cli_args(self):
        return self.cli_parser.parse_known_args()[0]

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

        if self._debug:
            monitor("layout", value, lambda v: setattr(self, "layout", v), self._root)

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

    def set(self, key, value, force=False):
        if (
            key not in self.state
            or self.state[key] != value
            or force
            or key not in self._server_keys
        ):
            self.state[key] = value
            for change_handler in self._change_handlers:
                change_handler.modified(key, value)

    # -------------------------------------------------------------------------

    def dirty(self, *args):
        if self._dirty_set is not None:
            return len(set(args).intersection(self._dirty_set)) > 0
        return False

    # -------------------------------------------------------------------------

    def dirty_all(self, *args):
        if self._dirty_set is not None:
            return len(set(args).intersection(self._dirty_set)) == len(args)
        return False

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

    def mesh(self, mesh_obj, field_to_keep=None, point_arrays=None, cell_arrays=None):
        return self._backend.mesh(mesh_obj, field_to_keep, point_arrays, cell_arrays)

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
            "name": self.name,
            "vuetify": self.vuetify,
            "layout": self.layout,
            "favicon": self.favicon,
            "routes": self.routes,
            "state": clean_state(self.state),
            "scripts": self.scripts,
            "use": self.vue_use,
            "styles": self.styles,
            "stateListening": list(self._server_keys),
        }
        return state

    # -------------------------------------------------------------------------

    def add_protocol(self, protocol):
        self._protocols_to_register.append(protocol)

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

        args = self.cli_args

        if port:
            args.port = port

        if not args.content:
            args.content = WWW_DIR

        if args.launcher:
            CoreServer.start_launcher(args)
            # FIXME we don't support yet self.serve with launcher...
        elif args.deploy:
            CoreServer.deploy_setup(args)
        else:
            if len(self.serve):
                endpoints = []
                for key in self.serve:
                    endpoints.append(f"{key}={abs_path(self.serve[key], self._root)}")
                args.fsEndpoints = "|".join(endpoints)
                print(args.fsEndpoints)

            CoreServer.configure(args)
            CoreServer.start_webserver(args)
