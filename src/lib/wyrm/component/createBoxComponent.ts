import { DeepPartial } from "@chakra-ui/react";
import { createGrid } from "../grid/grid.ts";
import { createRectanglePart } from "../part/createRectanglePart.ts";
import { Part, RectanglePart } from "../part/types.ts";
import { createSlotConfig } from "../slot/slotConfig.ts";
import { componentHasPart } from "../util/componentHasPart.ts";
import { createComponent } from "./component.ts";
import { BoxComponent, ComponentType } from "./types.ts";
import { Project } from "../project/project.ts";

export const createBoxComponent = (project: Project, config: DeepPartial<BoxComponent>): BoxComponent => {
    const component = createComponent({
        name: "Box",
        ...config,
        type: ComponentType.box,
        params: {
            width: 100,
            depth: 100,
            height: 100,
            ...config.params,
        },
    } as BoxComponent) as BoxComponent;

    project.components.push(component);
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
        grid: createGrid({ offsets: [thickness, thickness, thickness, thickness] }),

        ...config,
        slots: [
            // Horizontal
            createSlotConfig({
                start: [0, offset],
                end: [width, offset],
                thickness: thickness,
                even: false,
                length: boxComponent.params.slotLength,
            }),
            createSlotConfig({
                start: [0, depth - offset],
                end: [width, depth - offset],
                thickness: thickness,
                even: false,
                length: boxComponent.params.slotLength,
            }),
            // Vertical
            createSlotConfig({
                start: [offset, 0],
                end: [offset, depth],
                thickness: thickness,
                even: false,
                length: boxComponent.params.slotLength,
            }),
            createSlotConfig({
                start: [width - offset, 0],
                end: [width - offset, depth],
                thickness: thickness,
                even: false,
                length: boxComponent.params.slotLength,
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
    const thickness = boxComponent.materialThickness;
    const lid = createRectanglePart({
        id: "lid",
        width: boxComponent.params.width,
        height: boxComponent.params.depth,
        grid: createGrid({ offsets: [thickness, thickness, thickness, thickness] }),

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

/**
 * Create a left wall for the box
 * Make sure this is called AFTER closedTop
 */
export const createLeftWall = (boxComponent: BoxComponent, config?: Partial<RectanglePart>) => {
    const width = boxComponent.params.depth;
    const height = boxComponent.params.height;
    const thickness = boxComponent.materialThickness;
    const offset = thickness / 2;

    const wall = createRectanglePart({
        id: "leftWall",
        width,
        height,
        grid: createGrid({ offsets: [thickness, thickness, thickness, thickness] }),

        ...config,
        slots: [
            // Bottom slots
            createSlotConfig({
                start: [0, height - offset],
                end: [width, height - offset],
                thickness,
                even: true,
                length: boxComponent.params.slotLength,
            }),
            // Left/right slots
            createSlotConfig({
                start: [offset, componentHasPart(boxComponent, "closedTop") ? thickness : 0],
                end: [offset, height - thickness],
                thickness,
                even: true,
                length: boxComponent.params.slotLength,
            }),
            createSlotConfig({
                start: [width - offset, componentHasPart(boxComponent, "closedTop") ? thickness : 0],
                end: [width - offset, height - thickness],
                thickness,
                even: true,
                length: boxComponent.params.slotLength,
            }),
            ...(config?.slots ?? []),
        ],
    });

    // if closedTop, add slots for the top
    if (componentHasPart(boxComponent, "closedTop")) {
        wall.slots.push(
            createSlotConfig({
                start: [0, offset],
                end: [width, offset],
                thickness,
                even: true,
                length: boxComponent.params.slotLength,
            }),
        );
    }

    boxComponent.parts.push(wall);
    return wall;
};

/**
 * Create a right wall for the box
 * Make sure this is called AFTER closedTop
 */
export const createRightWall = (boxComponent: BoxComponent, config?: Partial<RectanglePart>) => {
    const wall = createLeftWall(boxComponent, config);
    wall.id = "rightWall";
    return wall;
};

/**
 * Create a front wall for the box
 * Make sure this is called AFTER closedTop
 */
export const createFrontWall = (boxComponent: BoxComponent, config?: Partial<RectanglePart>) => {
    const width = boxComponent.params.width;
    const height = boxComponent.params.height;
    const thickness = boxComponent.materialThickness;
    const offset = thickness / 2;

    const wall = createRectanglePart({
        id: "frontWall",
        width,
        height,
        grid: createGrid({ offsets: [thickness, thickness, thickness, thickness] }),
        ...config,
        slots: [
            // Bottom slots
            createSlotConfig({
                start: [0, height - offset],
                end: [width, height - offset],
                thickness,
                even: true,
                length: boxComponent.params.slotLength,
            }),
            // Left/right slots
            createSlotConfig({
                start: [offset, componentHasPart(boxComponent, "closedTop") ? thickness : 0],
                end: [offset, height - thickness],
                thickness,
                even: false,
                length: boxComponent.params.slotLength,
            }),
            createSlotConfig({
                start: [width - offset, componentHasPart(boxComponent, "closedTop") ? thickness : 0],
                end: [width - offset, height - thickness],
                thickness,
                even: false,
                length: boxComponent.params.slotLength,
            }),
            ...(config?.slots ?? []),
        ],
    });

    // if closedTop, add slots for the top
    if (componentHasPart(boxComponent, "closedTop")) {
        wall.slots.push(
            createSlotConfig({
                start: [0, offset],
                end: [width, offset],
                thickness,
                even: true,
                length: boxComponent.params.slotLength,
            }),
        );
    }

    boxComponent.parts.push(wall);

    return wall;
};

/**
 * Create a back wall for the box
 * Make sure this is called AFTER closedTop
 */
export const createBackWall = (boxComponent: BoxComponent, config?: Partial<RectanglePart>) => {
    const wall = createFrontWall(boxComponent, config);
    wall.id = "backWall";
    return wall;
};
