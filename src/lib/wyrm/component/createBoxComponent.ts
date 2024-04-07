import { DeepPartial } from "@chakra-ui/react";
import { createGrid, getGridCellBounds } from "../grid/grid.ts";
import { createRectanglePart } from "../part/createRectanglePart.ts";
import { RectanglePart } from "../part/types.ts";
import { createSlotConfig } from "../slot/slotConfig.ts";
import { componentGetPart, componentHasPart } from "../util/componentHasPart.ts";
import { copyAndAlterObject } from "../util/copyAndAlterObject.ts";
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
        grid: createGrid({}, boxComponent),

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
        grid: createGrid({}, boxComponent),

        ...config,
    });
    boxComponent.parts.push(lid);
    return lid;
};

export const createInnerLid = (boxComponent: BoxComponent, config?: Partial<RectanglePart>) => {
    // An extra millimeter of space for the inner lid to account for inaccuracies in the material
    const offset = boxComponent.materialThickness * 2 + 0.5;
    const innerLid = createRectanglePart({
        id: "innerLid",
        width: boxComponent.params.width - offset,
        height: boxComponent.params.depth - offset,
        radius: boxComponent.materialThickness,
        // insetOffset: 3,
        ...config,
    });
    boxComponent.parts.push(innerLid);
    return innerLid;
};

export const createStackable = (boxComponent: BoxComponent, config?: Partial<RectanglePart>) => {
    const offset = boxComponent.materialThickness * 2 + 0.5;
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
    const offset = 10;

    const bottom = componentGetPart<RectanglePart>(boxComponent, "bottom", true);
    const numAssists = bottom.grid.width * bottom.grid.height;
    const cellBounds = getGridCellBounds(bottom, [0, 0]); // any cell has the same size, we just need one
    const assistWidth = cellBounds.width - offset * 2;
    const assistHeight = cellBounds.height - offset * 2;
    for (let i = 0; i < numAssists; i++) {
        const assist = createRectanglePart({
            id: `cardAssist-${i}`,
            width: assistWidth,
            height: assistHeight,
            radius: boxComponent.materialThickness,
            ...config,
        });
        boxComponent.parts.push(assist);
    }
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
        grid: createGrid({}, boxComponent),

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
        grid: createGrid({}, boxComponent),
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

/**
 * Create dividers for the box. Relies on the bottom part having a grid
 * Call this as the last step after creating all other parts, so it can punch holes in the walls
 * @param boxComponent
 * @param config
 */
export const createDividers = (boxComponent: BoxComponent, config?: Partial<RectanglePart>) => {
    const bottomPart = componentGetPart<RectanglePart>(boxComponent, "bottom", true);
    const grid = bottomPart.grid;
    const thickness = boxComponent.materialThickness;
    const dividerHeightNoCompensation = boxComponent.params.dividerHeight ?? boxComponent.params.height - thickness;

    if (!grid) throw new Error("Bottom part does not have a grid");
    if (grid.width <= 1 && grid.height <= 1) throw new Error("Grid is too small to create dividers");

    const horizontalDividers = grid.height - 1;
    const verticalDividers = grid.width - 1;

    // let dividerHeight = boxComponent.params.dividerHeight ?? boxComponent.params.height;
    const topNeedsCompensation =
        componentHasPart(boxComponent, "closedTop") || componentHasPart(boxComponent, "innerLid");

    const dividerHeight = topNeedsCompensation ? dividerHeightNoCompensation - thickness : dividerHeightNoCompensation;

    const slotsStartY = topNeedsCompensation ? -thickness : 0;
    const slotsEndY = topNeedsCompensation ? dividerHeightNoCompensation - thickness : dividerHeight;

    // Vertical slot config from the top of the walls to the start of the bottom, we deal with the compensation later
    const slots = createSlotConfig({
        start: [0, 0],
        end: [0, dividerHeightNoCompensation],
        thickness,
        even: false,
        amount: 2,
        length: dividerHeightNoCompensation,
    });

    // Positions for slots along the width of the box (front wall)
    const horizontalSlotPositions = calculateSlotPositions(boxComponent.params.width, thickness, verticalDividers);

    // Positions for slots along the depth of the box (left wall)
    const verticalSlotPositions = calculateSlotPositions(boxComponent.params.depth, thickness, horizontalDividers);

    // Find the left and right wall and add slots
    [
        componentGetPart<RectanglePart>(boxComponent, "leftWall", true),
        componentGetPart<RectanglePart>(boxComponent, "rightWall", true),
    ].forEach((wall) =>
        wall.slots.push(
            ...verticalSlotPositions.map((pos) =>
                copyAndAlterObject(slots, {
                    start: [pos, 0],
                    end: [pos, dividerHeightNoCompensation],
                    even: true,
                }),
            ),
        ),
    );

    // Find the front and back wall and add slots
    [
        componentGetPart<RectanglePart>(boxComponent, "frontWall", true),
        componentGetPart<RectanglePart>(boxComponent, "backWall", true),
    ].forEach((wall) =>
        wall.slots.push(
            ...horizontalSlotPositions.map((pos) =>
                copyAndAlterObject(slots, {
                    start: [pos, 0],
                    end: [pos, dividerHeightNoCompensation],
                    even: true,
                }),
            ),
        ),
    );

    for (let i = 0; i < horizontalDividers; i++) {
        const divider = createRectanglePart({
            id: `divider-h-${i + 1}`,
            width: boxComponent.params.width,
            height: dividerHeight,
            ...config,
        });

        divider.slots.push(
            copyAndAlterObject(slots, {
                start: [thickness / 2, slotsStartY],
                end: [thickness / 2, slotsEndY],
            }),
            copyAndAlterObject(slots, {
                start: [boxComponent.params.width - thickness / 2, slotsStartY],
                end: [boxComponent.params.width - thickness / 2, slotsEndY],
            }),
        );

        divider.slots.push(
            ...horizontalSlotPositions.map((pos) =>
                copyAndAlterObject(slots, {
                    start: [pos, slotsStartY],
                    end: [pos, slotsEndY],
                    even: true,
                }),
            ),
        );

        boxComponent.parts.push(divider);
    }

    for (let i = 0; i < verticalDividers; i++) {
        const divider = createRectanglePart({
            id: `divider-v-${i + 1}`,
            width: boxComponent.params.depth,
            height: dividerHeight,
            ...config,
        });

        divider.slots.push(
            copyAndAlterObject(slots, {
                start: [thickness / 2, slotsStartY],
                end: [thickness / 2, slotsEndY],
            }),
            copyAndAlterObject(slots, {
                start: [boxComponent.params.depth - thickness / 2, slotsStartY],
                end: [boxComponent.params.depth - thickness / 2, slotsEndY],
            }),
        );

        divider.slots.push(
            ...verticalSlotPositions.map((pos) =>
                copyAndAlterObject(slots, {
                    start: [pos, slotsStartY],
                    end: [pos, slotsEndY],
                    even: false,
                }),
            ),
        );

        boxComponent.parts.push(divider);
    }
};

/**
 * Calculate the positions of slots for a given length, thickness and amount
 * @param length Total length of the divider, including overlap with the walls
 * @param thickness Thickness of the material
 * @param amount Amount of DIVIDERS to create, not grid slots
 */
const calculateSlotPositions = (length: number, thickness: number, amount: number) => {
    const positions: number[] = [];
    const innerLength = length - thickness * 2;
    const interval = innerLength / (amount + 1);

    for (let i = 1; i <= amount; i++) {
        positions.push(thickness + interval * i);
    }

    return positions;
};
