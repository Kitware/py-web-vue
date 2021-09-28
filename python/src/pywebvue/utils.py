import os
import base64
import mimetypes
import time
import threading
import inspect
import asyncio

mimetypes.init()

MONITORS = {}


def base_directory():
    frame = inspect.stack()[2]
    module = inspect.getmodule(frame[0])
    if module is None:
        return os.getcwd()
    return os.path.abspath(os.path.dirname(module.__file__))


def abs_path(file_path, root=None):
    basepath = os.getcwd()
    if root:
        if os.path.isfile(root):
            basepath = os.path.dirname(root)
        elif os.path.isdir(root):
            basepath = root

    full_path = file_path
    if not os.path.isabs(full_path):
        full_path = os.path.join(basepath, file_path)

    return os.path.abspath(full_path)


def read_file_as_txt(file_path, root=None):
    full_path = abs_path(file_path, root)
    with open(full_path) as txt_file:
        return str(txt_file.read())


def to_mime(file_path):
    return mimetypes.guess_type(file_path)[0]


def read_file_as_base64_url(file_path, root=None):
    full_path = abs_path(file_path, root)
    with open(full_path, "rb") as bin_file:
        encoded = base64.b64encode(bin_file.read()).decode("ascii")
        mime = to_mime(file_path)
        return f"data:{mime};base64,{encoded}"


def validate(txt, method, root):
    if not txt:
        return False

    if len(txt) < 256:
        full_path = abs_path(txt, root)
        if os.path.isfile(full_path):
            return method(full_path)

    return txt


def monitor(key, txt, method, root):
    global MONITORS
    loop = asyncio.get_event_loop()
    full_path = abs_path(txt, root)
    if os.path.isfile(full_path):
        if key in MONITORS:
            if MONITORS[key].get("full_path") == full_path:
                return
            MONITORS[key]["running"] = False
            MONITORS[key].get("thread").join()

        MONITORS[key] = {
            "full_path": full_path,
            "running": True,
        }

        def update(loop):
            last_ts = os.stat(full_path).st_mtime
            while MONITORS[key]["running"]:
                time.sleep(1)
                ts = os.stat(full_path).st_mtime
                if ts != last_ts:
                    last_ts = ts
                    loop.call_soon_threadsafe(method, read_file_as_txt(full_path))

        thread = threading.Thread(target=update, args=(loop,))
        thread.daemon = True
        thread.start()
        MONITORS[key]["thread"] = thread


def stop_all_monitors():
    global MONITORS
    for key in MONITORS:
        MONITORS[key]["running"] = False
        MONITORS[key]["thread"].join()


def clean_state(state):
    cleaned = {}
    for key in state:
        cleaned[key] = clean_value(state[key])

    return cleaned


def clean_value(value):
    if isinstance(value, dict) and "_filter" in value.keys():
        subset = {}
        subset.update(value)
        keys_to_filter = value.get("_filter")
        for key in keys_to_filter:
            subset.pop(key, None)
        return subset

    if isinstance(value, list):
        return list(map(clean_value, value))

    return value


# =============================================================================
# Internal classes
# =============================================================================


class CallbackSet:
    def __init__(self):
        self.data = []

    def add(self, callback):
        if callable(callback):
            found = False
            for c in self.data:
                if c == callback:
                    return
            self.data.append(callback)
        else:
            for c in callback:
                self.add(c)

    def clear(self):
        self.data = []

    def __iter__(self):
        return iter(self.data)


# =============================================================================
# ChangeHandler
# =============================================================================


class ChangeHandler:
    def __init__(self, app, known_state={}):
        self._app = app
        self._protocol = app.protocol
        self._known_state = known_state
        self._modified_keys = set()
        self._all_modified_keys = set()
        self._actions = []

    def modified(self, name, value):
        self._modified_keys.add(name)

    def add_action(self, ref, args=[], value=None, method=None, property=None):
        action = {"ref": ref}
        if method:
            action["type"] = "method"
            action["method"] = method
            action["args"] = args

        if property:
            action["type"] = "property"
            action["property"] = property
            action["value"] = value

        self._actions.append(action)

    def clear_actions(self):
        self._actions.clear()

    @property
    def modified_state(self):
        modified_state = {}
        for key in self._all_modified_keys:
            if (
                key in self._known_state
                and self._known_state[key] == self._app.state[key]
            ):
                pass
            else:
                modified_state[key] = clean_value(self._app.state[key])

        return modified_state

    @property
    def actions(self):
        return self._actions

    def __enter__(self):
        self._app._dirty_set = self._known_state
        if self not in self._app._change_handlers:
            self._app._change_handlers.append(self)
        return self

    def __exit__(self, exc_type, exc_value, exc_traceback):
        callbacks = CallbackSet()
        while len(self._modified_keys):
            # Gather callbacks
            for key in self._modified_keys:
                if key in self._app._change_callbacks:
                    callbacks.add(self._app._change_callbacks[key])

            self._all_modified_keys.update(self._modified_keys)
            self._modified_keys.clear()

            # Process callbacks
            for fn in callbacks:
                try:
                    # Pass state as **kwargs
                    fn(**self._app.state)
                except TypeError:
                    fn()

            callbacks.clear()

        self._app._change_handlers.remove(self)
        self._app._dirty_set = None

        if self._protocol:
            self._protocol.push_state_change(self.modified_state)

            if len(self._actions):
                self._protocol.push_actions(self._actions)
