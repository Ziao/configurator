import { DeepPartial } from "@chakra-ui/react";
import { createRectanglePart } from "../part/rectanglePart.ts";
import { createSlotConfig } from "../slot/slotConfig.ts";
import { createComponent } from "./component.ts";
import { BoxComponent, ComponentType } from "./types.ts";

export const createBoxComponent = (config: Partial<BoxComponent>): BoxComponent => {
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
            hasStackableBottom: false,
            hasCardAssist: false,
            ...config.params,
        },
    }) as BoxComponent;

    component.parts.push(createBottom(component));

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
            createSlotConfig({ start: [0, offset], end: [width, offset], thickness: thickness, even: true }),
            createSlotConfig({
                start: [0, depth - offset],
                end: [width, depth - offset],
                thickness: thickness,
                even: true,
            }),
            // Vertical
            createSlotConfig({ start: [offset, 0], end: [offset, depth], thickness: thickness, even: true }),
            createSlotConfig({
                start: [width - offset, 0],
                end: [width - offset, depth],
                thickness: thickness,
                even: true,
            }),
        ],
    });

    boxComponent.parts.push(bottom);

    return bottom;
};
