def getReferenceId(ref):
    if ref:
        try:
            return ref.__this__[1:17]
        except:
            idStr = str(ref)[-12:-1]
            # print('====> fallback ID %s for %s' % (idStr, ref))
            return idStr
    return '0x0'

class Backend:
    def __init__(self, app):
        self._app = app
        self._protocol = None
        self._instance_map = {}

    def id(self, obj):
        obj_id = getReferenceId(obj)
        self._instance_map[obj_id] = obj
        return obj_id

    def object(self, obj_id):
        return self._instance_map[obj_id]

    def mesh(self, dataset, field_name=None):
        raise Exception('The "mesh" method is not suppored with the default Backend')

    def scene(self, view_of_backend):
        raise Exception('The "scene" method is not suppored with the default Backend')

    def push_image(self, view_of_backend):
        raise Exception('The "push_image" method is not suppored with the default Backend')

    def camera(self, view_of_backend):
        raise Exception('The "camera" method is not suppored with the default Backend')

    def set_camera(self, view_of_backend, **kwargs):
        raise Exception('The "set_camera" method is not suppored with the default Backend')

    def configure_protocol(self, protocol):
        self._protocol = protocol
