from vtkmodules.web.render_window_serializer import SynchronizationContext, serializeInstance
from vtkmodules.web.render_window_serializer import registerInstanceSerializer, wrapId

from vtkmodules.web.render_window_serializer import initializeSerializers as vtk_initializeSerializers

# -----------------------------------------------------------------------------

def getReferenceId(ref):
    if ref:
        try:
            return ref.__this__[1:17]
        except:
            idStr = str(ref)[-12:-1]
            # print('====> fallback ID %s for %s' % (idStr, ref))
            return idStr
    return '0x0'

# -----------------------------------------------------------------------------

def genericMapperSerializer(parent, mapper, mapperId, context, depth):
    # This kind of mapper requires us to get 2 items: input data and lookup
    # table
    dataObject = None
    dataObjectInstance = None
    lookupTableInstance = None
    calls = []
    dependencies = []

    if hasattr(mapper, 'GetInputDataObject'):
        mapper.GetInputAlgorithm().Update()
        dataObject = mapper.GetInputDataObject(0, 0)
    else:
        if context.debugAll:
            print('This mapper does not have GetInputDataObject method')

    if dataObject:
        dataObjectId = '%s-dataset' % mapperId
        dataObjectInstance = serializeInstance(
            mapper, dataObject, dataObjectId, context, depth + 1)

        if dataObjectInstance:
            dependencies.append(dataObjectInstance)
            calls.append(['setInputData', [wrapId(dataObjectId)]])

    lookupTable = None

    if hasattr(mapper, 'GetLookupTable'):
        lookupTable = mapper.GetLookupTable()
    else:
        if context.debugAll:
            print('This mapper does not have GetLookupTable method')

    if lookupTable:
        lookupTableId = getReferenceId(lookupTable)
        lookupTableInstance = serializeInstance(
            mapper, lookupTable, lookupTableId, context, depth + 1)
        if lookupTableInstance:
            dependencies.append(lookupTableInstance)
            calls.append(['setLookupTable', [wrapId(lookupTableId)]])

    if dataObjectInstance:
        colorArrayName = mapper.GetArrayName(
        ) if mapper.GetArrayAccessMode() == 1 else mapper.GetArrayId()
        return {
            'parent': getReferenceId(parent),
            'id': mapperId,
            'type': mapper.GetClassName(),
            'properties': {
                'resolveCoincidentTopology': mapper.GetResolveCoincidentTopology(),
                'renderTime': mapper.GetRenderTime(),
                'arrayAccessMode': mapper.GetArrayAccessMode(),
                'scalarRange': mapper.GetScalarRange(),
                'useLookupTableScalarRange': 1 if mapper.GetUseLookupTableScalarRange() else 0,
                'scalarVisibility': mapper.GetScalarVisibility(),
                'colorByArrayName': colorArrayName,
                'colorMode': mapper.GetColorMode(),
                'scalarMode': mapper.GetScalarMode(),
                'interpolateScalarsBeforeMapping': 1 if mapper.GetInterpolateScalarsBeforeMapping() else 0
            },
            'calls': calls,
            'dependencies': dependencies
        }

    return None


# -----------------------------------------------------------------------------

def rendererSerializer(parent, instance, objId, context, depth):
    dependencies = []
    viewPropIds = []
    lightsIds = []
    calls = []

    # Camera
    camera = instance.GetActiveCamera()
    cameraId = getReferenceId(camera)
    cameraInstance = serializeInstance(
        instance, camera, cameraId, context, depth + 1)
    if cameraInstance:
        dependencies.append(cameraInstance)
        calls.append(['setActiveCamera', [wrapId(cameraId)]])

    # View prop as representation containers
    viewPropCollection = instance.GetViewProps()
    for rpIdx in range(viewPropCollection.GetNumberOfItems()):
        viewProp = viewPropCollection.GetItemAsObject(rpIdx)
        viewPropId = getReferenceId(viewProp)

        viewPropInstance = serializeInstance(
            instance, viewProp, viewPropId, context, depth + 1)
        if viewPropInstance:
            dependencies.append(viewPropInstance)
            viewPropIds.append(viewPropId)

    calls += context.buildDependencyCallList('%s-props' %
                                             objId, viewPropIds, 'addViewProp', 'removeViewProp')

    # Lights
    lightCollection = instance.GetLights()
    for lightIdx in range(lightCollection.GetNumberOfItems()):
        light = lightCollection.GetItemAsObject(lightIdx)
        lightId = getReferenceId(light)

        lightInstance = serializeInstance(
            instance, light, lightId, context, depth + 1)
        if lightInstance:
            dependencies.append(lightInstance)
            lightsIds.append(lightId)

    calls += context.buildDependencyCallList('%s-lights' %
                                             objId, lightsIds, 'addLight', 'removeLight')

    if len(dependencies) > 1:
        return {
            'parent': getReferenceId(parent),
            'id': objId,
            'type': instance.GetClassName(),
            'properties': {
                'background': instance.GetBackground(),
                'background2': instance.GetBackground2(),
                'viewport': instance.GetViewport(),
                # These commented properties do not yet have real setters in vtk.js
                # 'gradientBackground': instance.GetGradientBackground(),
                # 'aspect': instance.GetAspect(),
                # 'pixelAspect': instance.GetPixelAspect(),
                # 'ambient': instance.GetAmbient(),
                'twoSidedLighting': instance.GetTwoSidedLighting(),
                'lightFollowCamera': instance.GetLightFollowCamera(),
                'layer': instance.GetLayer(),
                'preserveColorBuffer': instance.GetPreserveColorBuffer(),
                'preserveDepthBuffer': instance.GetPreserveDepthBuffer(),
                'nearClippingPlaneTolerance': instance.GetNearClippingPlaneTolerance(),
                'clippingRangeExpansion': instance.GetClippingRangeExpansion(),
                'useShadows': instance.GetUseShadows(),
                'useDepthPeeling': instance.GetUseDepthPeeling(),
                'occlusionRatio': instance.GetOcclusionRatio(),
                'maximumNumberOfPeels': instance.GetMaximumNumberOfPeels(),
                'interactive': instance.GetInteractive(),
            },
            'dependencies': dependencies,
            'calls': calls
        }

    return None

# -----------------------------------------------------------------------------
# Patch current serializer with some fix before they become mainstream
# -----------------------------------------------------------------------------

def initializeSerializers():
    vtk_initializeSerializers()

    # Mapper (update input + ignore lut)
    registerInstanceSerializer('vtkOpenGLPolyDataMapper', genericMapperSerializer)
    registerInstanceSerializer('vtkOpenGLPolyDataMapper', genericMapperSerializer)
    registerInstanceSerializer('vtkCompositePolyDataMapper2', genericMapperSerializer)
    registerInstanceSerializer('vtkDataSetMapper', genericMapperSerializer)

    # Renderer (add interactive flag)
    registerInstanceSerializer('vtkOpenGLRenderer', rendererSerializer)


# Auto update...
initializeSerializers()