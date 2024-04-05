import { DeepPartial } from "@chakra-ui/react";
import { alignCenterVertical, alignTop } from "../../engine/util/alignment.ts";
import { smoothCorner } from "../../engine/util/smoothCorner.ts";
import { Component } from "../component/types.ts";
import { getGridCellBounds } from "../grid/grid.ts";
import { Part } from "../part/types.ts";
import { BaseFeature, FeatureType } from "./feature.ts";
import paper from "paper";

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
    // bounds.top = 0;

    let path = group.children[0] as paper.PathItem;

    //     // Todo: configurable
    const width = feature.params.width;
    const height = bounds.height; //- box.materialThickness * 2;
    const radius = feature.params.rounded ? feature.params.width / 2 : 0;

    // Main slot, with rounded corners
    const slotRect = new paper.Path.Rectangle({
        // width: path.bounds.width - paddingX * 2,
        // height: path.bounds.height - paddingY,
        width,
        height,
        // x: path.bounds.x + paddingX,
        // y: path.bounds.y,
        radius,
        fillColor: "black",
    });

    alignCenterVertical(path, slotRect);
    alignTop(path, slotRect);
    let newPath = path.subtract(slotRect);
    slotRect.remove();
    path.replaceWith(newPath);
    path = newPath;

    if (feature.params.rounded) {
        // A little extra rectangle to mitigate the top radius of the previous rectangle
        const slotTop = new paper.Path.Rectangle({
            width,
            height: radius,
            fillColor: "black",
        });

        alignCenterVertical(path, slotTop);
        alignTop(path, slotTop);

        newPath = path.subtract(slotTop);
        slotTop.remove();
        path.replaceWith(newPath);
        path = newPath;
    }

    // This seems to work perfectly for now but the indexes may not always work?
    smoothCorner(path as paper.Path, 5, radius / 2);
    smoothCorner(path as paper.Path, 1, radius / 2);
};
