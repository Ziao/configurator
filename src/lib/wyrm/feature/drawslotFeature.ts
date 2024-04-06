import { DeepPartial } from "@chakra-ui/react";
import { alignCenterHorizontal, alignCenterVertical, alignTop } from "../../engine/util/alignment.ts";
import { drawArcFromRadiusAndAngle, roundPathCorner, smoothCorner } from "../../engine/util/smoothCorner.ts";
import { Component } from "../component/types.ts";
import { getGridCellBounds } from "../grid/grid.ts";
import { Part } from "../part/types.ts";
import { roundSegment } from "../util/roundSegment.ts";
import { BaseFeature, FeatureType } from "./feature.ts";
import paper, { Path } from "paper";

export interface DrawSlotFeature extends BaseFeature {
    type: FeatureType.drawSlot;
    params: {
        rounded?: boolean;
        width: number;
    };
}

export const createDrawslotFeature = (config?: DeepPartial<DrawSlotFeature>): DrawSlotFeature => ({
    type: FeatureType.drawSlot,
    gridCell: [0, 0],
    ...config,
    params: {
        width: 25,
        rounded: true,
        ...config?.params,
    },
});

export const renderDrawslotFeature = (
    component: Component,
    part: Part,
    feature: DrawSlotFeature,
    group: paper.Group,
) => {
    const bounds = part.grid && feature.gridCell ? getGridCellBounds(part, feature.gridCell) : group.bounds;

    // Top bounds are ALWAYS 0, no matter the grid offset,  otherwise a drawslot makes no sense
    bounds.top = 0;

    let path = group.children[0] as paper.PathItem;

    const width = feature.params.width;
    const height = bounds.height;
    const radius = feature.params.rounded ? feature.params.width / 2 : 0;
    const halfRadius = radius / 2;

    const shape = new paper.Path({
        strokeColor: "green",
        strokeWidth: 0.00001,
        // fillColor: "black",
    });
    shape.fullySelected = true;
    // Imagine a big T shape with rounded corners where it matters
    // the center (0, 0) is the center of the T, underneath the top bar of the T
    shape.moveTo([-height, -width]); // Top left
    shape.lineTo([height, -width]); // Top right
    shape.lineTo([height, 0]);
    shape.lineTo([width / 2, 0]);
    shape.lineTo([width / 2, height]);
    shape.lineTo([-width / 2, height]);
    shape.lineTo([-width / 2, 0]);
    shape.lineTo([-height, 0]);
    shape.closePath();

    roundSegment(shape, 3, halfRadius);
    roundSegment(shape, 5, radius);
    roundSegment(shape, 7, radius);
    roundSegment(shape, 9, halfRadius);

    shape.bounds.center.x = bounds.center.x;
    // alignCenterVertical(bounds, shape);
    // alignCenterHorizontal(path, shape);

    const newPath = path.subtract(shape);
    shape.remove();
    path.replaceWith(newPath);
    // path = newPath;
    // group.addChild(shape);
};
