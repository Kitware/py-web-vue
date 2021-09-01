import json

from vtkmodules.web import getReferenceId
from vtkmodules.web.render_window_serializer import (
    wrapId,
    registerInstanceSerializer,
    serializeInstance,
)


def cubeAxesSerializer(parent, actor, actorId, context, depth):
    """
    Possible add-on properties for vtk.js:
        gridLines: True,
        axisLabels: None,
        axisTitlePixelOffset: 35.0,
        axisTextStyle: {
            fontColor: 'white',
            fontStyle: 'normal',
            fontSize: 18,
            fontFamily: 'serif',
        },
        tickLabelPixelOffset: 12.0,
        tickTextStyle: {
            fontColor: 'white',
            fontStyle: 'normal',
            fontSize: 14,
            fontFamily: 'serif',
        },
    """
    axisLabels = ["", "", ""]
    if actor.GetXAxisLabelVisibility():
        axisLabels[0] = actor.GetXTitle()
    if actor.GetYAxisLabelVisibility():
        axisLabels[1] = actor.GetYTitle()
    if actor.GetZAxisLabelVisibility():
        axisLabels[2] = actor.GetZTitle()

    return {
        "parent": getReferenceId(parent),
        "id": actorId,
        "type": "vtkCubeAxesActor",
        "properties": {
            # vtkProp
            "visibility": actor.GetVisibility(),
            "pickable": actor.GetPickable(),
            "dragable": actor.GetDragable(),
            "useBounds": actor.GetUseBounds(),
            # vtkProp3D
            "origin": actor.GetOrigin(),
            "position": actor.GetPosition(),
            "scale": actor.GetScale(),
            # vtkActor
            "forceOpaque": actor.GetForceOpaque(),
            "forceTranslucent": actor.GetForceTranslucent(),
            # vtkCubeAxesActor
            "dataBounds": actor.GetBounds(),
            "faceVisibilityAngle": 8,
            "gridLines": True,
            "axisLabels": axisLabels,
            "axisTitlePixelOffset": 35.0,
            "axisTextStyle": {
                "fontColor": "white",
                "fontStyle": "normal",
                "fontSize": 18,
                "fontFamily": "serif",
            },
            "tickLabelPixelOffset": 12.0,
            "tickTextStyle": {
                "fontColor": "white",
                "fontStyle": "normal",
                "fontSize": 14,
                "fontFamily": "serif",
            },
        },
        "calls": [["setCamera", [wrapId(getReferenceId(actor.GetCamera()))]]],
        "dependencies": [],
    }


def scalarBarActorSerializer(parent, actor, actorId, context, depth):
    dependencies = []
    calls = []
    lut = actor.GetLookupTable()
    if not lut:
        return None

    lutId = getReferenceId(lut)
    lutInstance = serializeInstance(actor, lut, lutId, context, depth + 1)
    if not lutInstance:
        return None

    dependencies.append(lutInstance)
    calls.append(["setScalarsToColors", [wrapId(lutId)]])

    prop = None
    if hasattr(actor, "GetProperty"):
        prop = actor.GetProperty()
    else:
        if context.debugAll:
            print("This scalarBarActor does not have a GetProperty method")

        if prop:
            propId = getReferenceId(prop)
            propertyInstance = serializeInstance(
                actor, prop, propId, context, depth + 1
            )
            if propertyInstance:
                dependencies.append(propertyInstance)
                calls.append(["setProperty", [wrapId(propId)]])

    axisLabel = actor.GetTitle()
    width = actor.GetWidth()
    height = actor.GetHeight()

    # axisTitlePixelOffset = actor.GetTextPad()
    # position = actor.GetPosition()
    # position2 = actor.GetPosition2()
    # print(f'axisTitlePixelOffset: {axisTitlePixelOffset}')
    # print(f'axisLabel: {axisLabel}')
    # print(f'width: {width}')
    # print(f'height: {height}')
    # print(f'position: {position}')
    # print(f'position2: {position2}')

    return {
        "parent": getReferenceId(parent),
        "id": actorId,
        "type": "vtkScalarBarActor",
        "properties": {
            # vtkProp
            "visibility": actor.GetVisibility(),
            "pickable": actor.GetPickable(),
            "dragable": actor.GetDragable(),
            "useBounds": actor.GetUseBounds(),
            # vtkActor2D
            # "position": actor.GetPosition(),
            # "position2": actor.GetPosition2(),
            # "width": actor.GetWidth(),
            # "height": actor.GetHeight(),
            # vtkScalarBarActor
            "automated": True,
            "axisLabel": axisLabel,
            # 'barPosition': [0, 0],
            # 'barSize': [0, 0],
            "boxPosition": [0.88, -0.92],
            "boxSize": [width, height],
            "axisTitlePixelOffset": 36.0,
            "axisTextStyle": {
                "fontColor": "white",
                "fontStyle": "normal",
                "fontSize": 18,
                "fontFamily": "serif",
            },
            "tickLabelPixelOffset": 14.0,
            "tickTextStyle": {
                "fontColor": "white",
                "fontStyle": "normal",
                "fontSize": 14,
                "fontFamily": "serif",
            },
        },
        "calls": calls,
        "dependencies": dependencies,
    }


def registerAddOnSerializers():
    registerInstanceSerializer("vtkCubeAxesActor", cubeAxesSerializer)
    registerInstanceSerializer("vtkScalarBarActor", scalarBarActorSerializer)
