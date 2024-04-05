import { DeepPartial } from "@chakra-ui/react";
import { createRectanglePart } from "../part/rectanglePart.ts";
import { Part, RectanglePart } from "../part/types.ts";
import { createSlotConfig } from "../slot/slotConfig.ts";
import { componentHasPart } from "../util/componentHasPart.ts";
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
            // hasLid: false,
            // hasClosedTop: false,
            // hasStackable: false,
            // hasCardAssist: false,
            ...config.params,
        },
    } as BoxComponent) as BoxComponent;

    // component.parts.push(createBottom(component));
    // component.parts.push(createFrontWall(component));
    // component.parts.push(createBackWall(component));
    // component.parts.push(createLeftWall(component));
    // component.parts.push(createRightWall(component));

    // if (component.params.hasClosedTop) component.parts.push(createClosedTop(component));

    // if (component.params.hasLid) {
    //     component.parts.push(createLid(component));
    //     component.parts.push(createInnerLid(component));
    // }

    // if (component.params.hasStackable) component.parts.push(createStackable(component));

    // if (component.params.hasCardAssist) component.parts.push(createCardAssist(component));

    return component;
};

export const createBottom = (boxComponent: BoxComponent, config?: Partial<RectanglePart>) => {
    const thickness = boxComponent.materialThickness;
    const offset = thickness / 2;
    const depth = boxComponent.params.depth;
    const width = boxComponent.params.width;
    const bottom = createRectanglePart({
        id: "bottom",
        width: boxComponent.params.width,
        height: boxComponent.params.depth,
        ...config,
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
            ...(config?.slots ?? []),
        ],
    });

    boxComponent.parts.push(bottom);

    return bottom;
};

export const createClosedTop = (boxComponent: BoxComponent, config?: Partial<RectanglePart>) => {
    // Closed top is essentially the same as the bottom, but with a different id
    const lid = createBottom(boxComponent, config);
    lid.id = "closedTop";
    return lid;
};

export const createLid = (boxComponent: BoxComponent, config?: Partial<RectanglePart>) => {
    const lid = createRectanglePart({
        id: "lid",
        width: boxComponent.params.width,
        height: boxComponent.params.depth,
        ...config,
    });
    boxComponent.parts.push(lid);
    return lid;
};

export const createInnerLid = (boxComponent: BoxComponent, config?: Partial<RectanglePart>) => {
    const offset = (boxComponent.materialThickness + 1) * 2;
    const innerLid = createRectanglePart({
        id: "innerLid",
        width: boxComponent.params.width - offset,
        height: boxComponent.params.depth - offset,
        radius: boxComponent.materialThickness,
        insetOffset: 3,
        ...config,
    });
    boxComponent.parts.push(innerLid);
    return innerLid;
};

export const createStackable = (boxComponent: BoxComponent, config?: Partial<RectanglePart>) => {
    const offset = (boxComponent.materialThickness + 1) * 2;
    const stackable = createRectanglePart({
        id: "stackable",
        width: boxComponent.params.width - offset,
        height: boxComponent.params.depth - offset,
        radius: boxComponent.materialThickness,
        ...config,
    });
    boxComponent.parts.push(stackable);
    return stackable;
};

export const createCardAssist = (boxComponent: BoxComponent, config?: Partial<RectanglePart>) => {
    const offset = (boxComponent.materialThickness + 10) * 2;
    const cardAssist = createRectanglePart({
        id: "cardAssist",
        width: boxComponent.params.width - offset,
        height: boxComponent.params.depth - offset,
        radius: boxComponent.materialThickness,
        ...config,
    });
    boxComponent.parts.push(cardAssist);
    return cardAssist;
};

export const createLeftWall = (boxComponent: BoxComponent, config?: Partial<RectanglePart>) => {
    const width = boxComponent.params.depth;
    const height = boxComponent.params.height;
    const thickness = boxComponent.materialThickness;
    const offset = thickness / 2;

    const wall = createRectanglePart({
        id: "leftWall",
        width,
        height,
        ...config,
        slots: [
            // Bottom slots
            createSlotConfig({ start: [0, height - offset], end: [width, height - offset], thickness, even: true }),
            // Left/right slots
            createSlotConfig({ start: [offset, 0], end: [offset, height], thickness, even: true }),
            createSlotConfig({ start: [width - offset, 0], end: [width - offset, height], thickness, even: true }),
            ...(config?.slots ?? []),
        ],
    });

    // if closedTop, add slots for the top
    if (componentHasPart(boxComponent, "closedTop")) {
        wall.slots.push(createSlotConfig({ start: [0, offset], end: [width, offset], thickness, even: true }));
    }

    boxComponent.parts.push(wall);
    return wall;
};

export const createRightWall = (boxComponent: BoxComponent, config?: Partial<RectanglePart>) => {
    const wall = createLeftWall(boxComponent, config);
    wall.id = "rightWall";
    return wall;
};

export const createFrontWall = (boxComponent: BoxComponent, config?: Partial<RectanglePart>) => {
    const width = boxComponent.params.width;
    const height = boxComponent.params.height;
    const thickness = boxComponent.materialThickness;
    const offset = thickness / 2;

    const wall = createRectanglePart({
        id: "frontWall",
        width,
        height,
        ...config,
        slots: [
            // Bottom slots
            createSlotConfig({ start: [0, height - offset], end: [width, height - offset], thickness, even: true }),
            // Left/right slots
            createSlotConfig({ start: [offset, 0], end: [offset, height], thickness, even: false }),
            createSlotConfig({ start: [width - offset, 0], end: [width - offset, height], thickness, even: false }),
            ...(config?.slots ?? []),
        ],
    });

    // if closedTop, add slots for the top
    if (componentHasPart(boxComponent, "closedTop")) {
        wall.slots.push(createSlotConfig({ start: [0, offset], end: [width, offset], thickness, even: true }));
    }

    boxComponent.parts.push(wall);

    return wall;
};

export const createBackWall = (boxComponent: BoxComponent, config?: Partial<RectanglePart>) => {
    const wall = createFrontWall(boxComponent, config);
    wall.id = "backWall";
    return wall;
};
