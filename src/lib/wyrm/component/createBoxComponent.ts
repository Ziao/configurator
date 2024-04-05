import { DeepPartial } from "@chakra-ui/react";
import { createRectanglePart } from "../part/rectanglePart.ts";
import { createSlotConfig } from "../slot/slotConfig.ts";
import { createComponent } from "./component.ts";
import { BoxComponent, ComponentType } from "./types.ts";

export const createBoxComponent = (config: DeepPartial<BoxComponent>): BoxComponent => {
    const component = createComponent({
        name: "Box",
        ...config,
        type: ComponentType.box,
        params: {
            width: 100,
            depth: 100,
            height: 100,
            hasLid: false,
            hasClosedTop: false,
            hasStackable: false,
            hasCardAssist: false,
            ...config.params,
        },
    } as BoxComponent) as BoxComponent;

    component.parts.push(createBottom(component));
    component.parts.push(createFrontWall(component));
    component.parts.push(createBackWall(component));
    component.parts.push(createLeftWall(component));
    component.parts.push(createRightWall(component));

    if (component.params.hasClosedTop) component.parts.push(createClosedTop(component));

    if (component.params.hasLid) {
        component.parts.push(createLid(component));
        component.parts.push(createInnerLid(component));
    }

    if (component.params.hasStackable) component.parts.push(createStackable(component));

    if (component.params.hasCardAssist) component.parts.push(createCardAssist(component));

    return component;
};

const createBottom = (boxComponent: BoxComponent) => {
    const thickness = boxComponent.materialThickness;
    const offset = thickness / 2;
    const depth = boxComponent.params.depth;
    const width = boxComponent.params.width;
    const bottom = createRectanglePart({
        id: "bottom",
        width: boxComponent.params.width,
        height: boxComponent.params.depth,
        slots: [
            // Horizontal
            createSlotConfig({ start: [0, offset], end: [width, offset], thickness: thickness, even: false }),
            createSlotConfig({
                start: [0, depth - offset],
                end: [width, depth - offset],
                thickness: thickness,
                even: false,
            }),
            // Vertical
            createSlotConfig({ start: [offset, 0], end: [offset, depth], thickness: thickness, even: false }),
            createSlotConfig({
                start: [width - offset, 0],
                end: [width - offset, depth],
                thickness: thickness,
                even: false,
            }),
        ],
    });

    return bottom;
};

const createClosedTop = (boxComponent: BoxComponent) => {
    // Closed top is essentially the same as the bottom, but with a different id
    const lid = createBottom(boxComponent);
    lid.id = "closedTop";
    return lid;
};

const createLid = (boxComponent: BoxComponent) => {
    return createRectanglePart({
        id: "lid",
        width: boxComponent.params.width,
        height: boxComponent.params.depth,
    });
};

const createInnerLid = (boxComponent: BoxComponent) => {
    const offset = (boxComponent.materialThickness + 1) * 2;
    return createRectanglePart({
        id: "innerLid",
        width: boxComponent.params.width - offset,
        height: boxComponent.params.depth - offset,
        radius: boxComponent.materialThickness,
        insetOffset: 3,
    });
};

const createStackable = (boxComponent: BoxComponent) => {
    const offset = (boxComponent.materialThickness + 1) * 2;
    return createRectanglePart({
        id: "stackable",
        width: boxComponent.params.width - offset,
        height: boxComponent.params.depth - offset,
        radius: boxComponent.materialThickness,
    });
};

const createCardAssist = (boxComponent: BoxComponent) => {
    const offset = (boxComponent.materialThickness + 10) * 2;
    return createRectanglePart({
        id: "cardAssist",
        width: boxComponent.params.width - offset,
        height: boxComponent.params.depth - offset,
        radius: boxComponent.materialThickness,
    });
};

const createLeftWall = (boxComponent: BoxComponent) => {
    const width = boxComponent.params.depth;
    const height = boxComponent.params.height;
    const thickness = boxComponent.materialThickness;
    const offset = thickness / 2;

    const wall = createRectanglePart({
        id: "leftWall",
        width,
        height,
        slots: [
            // Bottom slots
            createSlotConfig({ start: [0, height - offset], end: [width, height - offset], thickness, even: true }),
            // Left/right slots
            createSlotConfig({ start: [offset, 0], end: [offset, height], thickness, even: true }),
            createSlotConfig({ start: [width - offset, 0], end: [width - offset, height], thickness, even: true }),
        ],
    });

    // if closedTop, add slots for the top
    if (boxComponent.params.hasClosedTop)
        wall.slots.push(createSlotConfig({ start: [0, offset], end: [width, offset], thickness, even: true }));

    return wall;
};

const createRightWall = (boxComponent: BoxComponent) => {
    const wall = createLeftWall(boxComponent);
    wall.id = "rightWall";
    return wall;
};

const createFrontWall = (boxComponent: BoxComponent) => {
    const width = boxComponent.params.width;
    const height = boxComponent.params.height;
    const thickness = boxComponent.materialThickness;
    const offset = thickness / 2;

    const wall = createRectanglePart({
        id: "frontWall",
        width,
        height,
        slots: [
            // Bottom slots
            createSlotConfig({ start: [0, height - offset], end: [width, height - offset], thickness, even: true }),
            // Left/right slots
            createSlotConfig({ start: [offset, 0], end: [offset, height], thickness, even: false }),
            createSlotConfig({ start: [width - offset, 0], end: [width - offset, height], thickness, even: false }),
        ],
    });

    // if closedTop, add slots for the top
    if (boxComponent.params.hasClosedTop)
        wall.slots.push(createSlotConfig({ start: [0, offset], end: [width, offset], thickness, even: true }));

    return wall;
};

const createBackWall = (boxComponent: BoxComponent) => {
    const wall = createFrontWall(boxComponent);
    wall.id = "backWall";
    return wall;
};
