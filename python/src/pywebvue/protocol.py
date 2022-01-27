import os
import sys
import shutil
import json
import asyncio

from pywebvue.utils import abs_path

from wslink import server, launcher
from wslink import register as exportRpc

from wslink.websocket import ServerProtocol
from wslink.websocket import LinkProtocol

# Only used for debug
import json

WWW_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "www")


def current_cmd(
    skip_launcher=True, skip_port=True, add_on=[], default_skip=["--www",]
):
    cmd = ["python"]
    skip_next = False
    for item in sys.argv:
        if skip_next:
            skip_next = False
            continue

        if skip_port and item == "--port":
            skip_next = True
            continue

        if item in default_skip:
            skip_next = True
            continue

        if skip_launcher and item == "--launcher":
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
        "host": "0.0.0.0",
        "port": 8080,
        "endpoint": "paraview",
        "log_dir": "/tmp",
        "proxy_file": "/tmp/pywebproxy.txt",
        "sessionURL": "ws://USE_HOSTNAME:${port}/ws",
        "timeout": 25,
        "content": WWW_DIR,
        "sanitize": {},
        "fields": [],
    },
    "resources": [{"host": "localhost", "port_range": [9001, 9100]}],
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
    def stop_webserver():
        server.stop_webserver()

    @staticmethod
    def port_webserver():
        return server.get_port()

    @staticmethod
    def get_launcher_config(args):
        config = {}
        config.update(DEFAULT_LAUNCHER_CONFIG)

        config["configuration"]["port"] = args.port

        if "configuration" in CoreServer.app.launcher:
            config["configuration"].update(CoreServer.app.launcher["configuration"])

        if "resources" in CoreServer.app.launcher:
            config["resources"] = CoreServer.app.launcher["resources"]

        if "apps" in CoreServer.app.launcher:
            config["apps"].update(CoreServer.app.launcher["apps"])

        return config

    @staticmethod
    def start_launcher(args):
        config = CoreServer.get_launcher_config(args)

        if CoreServer.DEBUG:
            print(json.dumps(config, indent=2))

        print("Starting launcher...")
        launcher.startWebServer(args, config)

    @staticmethod
    def wwww_client(args):
        tokens = args.www.split(":")
        app_name = tokens.pop(0)
        out_www = os.path.abspath(":".join(tokens))
        os.makedirs(out_www, exist_ok=True)

        # copy www
        shutil.copytree(WWW_DIR, out_www, dirs_exist_ok=True)
        for sub_dir in CoreServer.app.serve:
            src_dir = abs_path(CoreServer.app.serve[sub_dir], CoreServer.app._root)
            dst_dir = os.path.join(out_www, sub_dir)
            shutil.copytree(src_dir, dst_dir, dirs_exist_ok=True)

        # create {app_name}.html
        src_file = os.path.join(out_www, "index.html")
        dst_file = os.path.join(out_www, f"{app_name}.html")
        # Read in the file
        with open(src_file, 'r') as f_in :
            content = f_in.read()
            patched_content = content.replace('data-app-name="PyWebVue"', f'data-app-name="{app_name}"')
            with open(dst_file, 'w') as f_out:
                f_out.write(patched_content)


    # ---------------------------------------------------------------
    # Server
    # ---------------------------------------------------------------

    def initialize(self):  # Called by wslink
        self.rpcMethods = {}
        self.app = CoreServer.app
        self.app._root_protocol = self

        for configure in self.app._protocols_to_configure:
            configure(self)

        self.updateSecret(CoreServer.authentication_token)

    def port_callback(self, port_used):
        if self.app.on_ready:
            try:
                self.app.on_ready(**self.app.state)
            except TypeError:
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
            try:
                print(f"=> Push state {len(json.dumps(modified_state))}")
            except:
                unserializable_keys = []
                for key in modified_state:
                    try:
                        json.dumps(modified_state[key])
                    except:
                        unserializable_keys.append(key)

                message = (
                    "\nERROR: The following keys in your state are not serializable"
                    if len(unserializable_keys) > 1
                    else "\nERROR: The following key in your state is not serializable"
                )
                print(message)
                for key in unserializable_keys:
                    print(f" - {key}")
                print()

        self.publish("topic.ws.vue.state", modified_state)

    # ---------------------------------------------------------------

    def push_actions(self, actions):
        self.publish("topic.ws.vue.actions", actions)

    # ---------------------------------------------------------------

    def push_layout(self, layout):
        # publish might not be bind if no client is connected
        # in debug layout will be pushed when changed automatically
        if hasattr(self, "publish"):
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
    async def trigger(self, name, args, kwargs):
        with self.app.capture_changes():
            if name in self.app._triggers:
                await asyncio.coroutine(self.app._triggers[name])(*args, **kwargs)
            else:
                print(f"Trigger {name} seems to be missing")

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
