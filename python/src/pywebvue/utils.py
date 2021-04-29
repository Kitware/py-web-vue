import os
import base64
import mimetypes

mimetypes.init()

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
    with open(full_path, 'rb') as bin_file:
        encoded = base64.b64encode(bin_file.read()).decode("ascii")
        mime = to_mime(file_path)
        return f'data:{mime};base64,{encoded}'

def validate(txt, method, root):
    if not txt:
        return False

    if len(txt) < 256:
        full_path = abs_path(txt, root)
        if os.path.isfile(full_path):
            return method(full_path)

    return txt

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

class ChangeHandler():
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
        action = { 'ref': ref }
        if method:
            action['type'] = 'method'
            action['method'] = method
            action['args'] = args

        if property:
            action['type'] = 'property'
            action['property'] = property
            action['value'] = value

        self._actions.append(action)

    def __enter__(self):
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
                fn()
            callbacks.clear()

        self._app._change_handlers.remove(self)

        if self._protocol:
            modified_state = {}
            for key in self._all_modified_keys:
                if key in self._known_state and self._known_state[key] == self._app.state[key]:
                    pass
                else:
                    modified_state[key] = self._app.state[key]
            self._protocol.push_state_change(modified_state)

            if len(self._actions):
                self._protocol.push_actions(self._actions)
