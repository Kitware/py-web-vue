import os
import sys
import socket

from wslink import server, launcher
from wslink import register as exportRpc

from wslink.websocket import ServerProtocol
from wslink.websocket import LinkProtocol

from twisted.internet import reactor

# Only used for debug
import json

def current_cmd(skip_launcher=True, skip_port=True, add_on=[]):
    cmd = ['python']
    skip_next = False
    for item in sys.argv:
        if skip_next:
            skip_next = False
            continue

        if skip_port and item == '--port':
            skip_next = True
            continue

        if skip_launcher and item == '--launcher':
            continue

        if len(cmd) == 1:
            cmd.append(os.path.abspath(item))
        else:
            cmd.append(item)

    for item in add_on:
        cmd.append(item)

    return cmd

DEFAULT_LAUNCHER_CONFIG = {
    "configuration": {
        "host" : "0.0.0.0",
        "port" : 8080,
        "endpoint": "paraview",
        "log_dir": "/tmp",
        "proxy_file": "/tmp/pywebproxy.txt",
        "sessionURL" : "ws://USE_HOSTNAME:${port}/ws",
        "timeout": 25,
        "content": os.path.join(os.path.dirname(os.path.abspath(__file__)), "www"),
        "sanitize": {},
        "fields": [],
    },
    "resources" : [{ "host" : "localhost", "port_range" : [9001, 9100] }],
    "properties": {},
    "apps": {
        "PyWebVue": {
            "cmd": current_cmd(add_on=["--port", "$port"]),
            "ready_line": "Starting factory",
        },
    },
}

class CoreServer(ServerProtocol):
    authentication_token = "wslink-secret"
    app = None
    DEBUG = False

    # ---------------------------------------------------------------
    # Static methods
    # ---------------------------------------------------------------

    @staticmethod
    def add_arguments(parser):
        server.add_arguments(parser)

    @staticmethod
    def configure(args):
        CoreServer.authentication_token = args.authKey

    @staticmethod
    def start_webserver(args):
        server.start_webserver(options=args, protocol=CoreServer)

    @staticmethod
    def start_launcher(args):
        config = {}
        config.update(DEFAULT_LAUNCHER_CONFIG)

        config['configuration']['port'] = args.port

        if 'configuration' in CoreServer.app.launcher:
            config['configuration'].update(CoreServer.app.launcher['configuration'])

        if 'resources' in CoreServer.app.launcher:
            config['resources'] = CoreServer.app.launcher['resources']

        if 'apps' in CoreServer.app.launcher:
            config['apps'].update(CoreServer.app.launcher['apps'])

        if CoreServer.DEBUG:
            print(json.dumps(config, indent=2))

        print('Starting launcher...')
        launcher.startWebServer(args, config)

    # ---------------------------------------------------------------
    # Server
    # ---------------------------------------------------------------

    def initialize(self):  # Called by wslink
        self.rpcMethods = {}
        self.app = CoreServer.app
        self.app._backend.configure_protocol(self)
        self.updateSecret(CoreServer.authentication_token)

        if self.app.on_ready:
            self.app.on_ready()

    # ---------------------------------------------------------------

    def getRPCMethod(self, name):
        if len(self.rpcMethods) == 0:
            import inspect

            for protocolObject in self.getLinkProtocols():
                test = lambda x: inspect.ismethod(x) or inspect.isfunction(x)
                for k in inspect.getmembers(protocolObject.__class__, test):
                    proc = k[1]
                    if "_wslinkuris" in proc.__dict__:
                        uri_info = proc.__dict__["_wslinkuris"][0]
                        if "uri" in uri_info:
                            uri = uri_info["uri"]
                            self.rpcMethods[uri] = (protocolObject, proc)

        if name in self.rpcMethods:
            return self.rpcMethods[name]

    # ---------------------------------------------------------------
    # Publish
    # ---------------------------------------------------------------

    def push_state_change(self, modified_state):
        if CoreServer.DEBUG:
            print(f"=> Push state {len(json.dumps(modified_state))}")
        self.publish("topic.ws.vue.state", modified_state)

    # ---------------------------------------------------------------

    def push_actions(self, actions):
        self.publish("topic.ws.vue.actions", actions)

    # ---------------------------------------------------------------

    def push_layout(self, layout):
        # publish might not be bind if no client is connected
        # in debug layout will be pushed when changed automatically
        if hasattr(self, 'publish'):
            self.publish("topic.ws.vue.layout", layout)

    # ---------------------------------------------------------------

    def push_routes(self, routes):
        self.publish("topic.ws.vue.routes", routes)

    # ---------------------------------------------------------------
    # RPCs
    # ---------------------------------------------------------------

    @exportRpc("ws.vue.init")
    def get_state(self):
        return self.app.get_initial_state()

    # ---------------------------------------------------------------

    @exportRpc("ws.vue.trigger")
    def trigger(self, name, args, kwargs):
        with self.app.capture_changes():
            self.app._triggers[name](*args, **kwargs)

    # ---------------------------------------------------------------

    @exportRpc("ws.vue.state.update")
    def update_state(self, changes):
        values_to_ignore = {}
        for change in changes:
            values_to_ignore[change["key"]] = (
                change["value"] if "value" in change else None
            )

        with self.app.capture_changes(values_to_ignore):
            for change in changes:
                self.app.set(
                    change["key"], change["value"] if "value" in change else None
                )
