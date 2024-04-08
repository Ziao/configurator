import { DeepPartial } from "@chakra-ui/react";
import { importSvgGroup } from "../../engine/util/importSvgGroup.ts";
import { Color } from "../colors.ts";
import { Component } from "../component/types.ts";
import { getGridCellBounds } from "../grid/grid.ts";
import { Part } from "../part/types.ts";
import { BaseFeature, FeatureType } from "./feature.ts";
import paper from "paper";

export interface GraphicFeature extends BaseFeature {
    type: FeatureType.graphic;
    params: {
        svgString?: string;
        // svgUrl?: string; // todo, makes async a bit annoying
        // imageUrl?: string; // todo, may be easier to implement than svgUrl
        operation: "cut" | "engrave" | "score";
        fit?: "contain" | "cover";
        alignment?:
            | "top"
            | "top-left"
            | "top-right"
            | "left"
            | "right"
            | "bottom"
            | "bottom-left"
            | "bottom-right"
            | "center";
        rotation?: number;
        mirror?: boolean;

        // None or one of these should be set, if both are set, height will take precedence
        width?: number;
        height?: number;

        offset?: [number, number]; // [x, y] offset from the center of the part, where 1 is the full width/height

        /**
         * If set, the final graphic will be scaled by this multiplier
         * Especially useful for fit: cover, and you want a bit of a bleed
         */
        scaleMultiplier?: number;
    };
}

export const createGraphicFeature = (config?: DeepPartial<GraphicFeature>): GraphicFeature => ({
    type: FeatureType.graphic,
    gridCell: [0, 0],
    ...config,
    params: {
        operation: "score",
        alignment: "center",
        ...config?.params,
    },
});

export const renderGraphicFeature = (component: Component, part: Part, feature: GraphicFeature, group: paper.Group) => {
    // todo: adjust these checks once we support other types of graphic sources
    if (!feature.params.svgString) throw new Error("Feature does not have svgString");

    // Todo: based on GRID
    const bounds = part.grid && feature.gridCell ? getGridCellBounds(part, feature.gridCell) : group.bounds;
    let needsMask = false;

    const graphicGroup = importSvgGroup(feature.params.svgString);
    let graphic = new paper.CompoundPath(graphicGroup.children);

    // Fit the graphic to the bounds or position it in the center
    if (feature.params.fit === "contain") {
        graphic.fitBounds(bounds, false);
    } else if (feature.params.fit === "cover") {
        needsMask = true;
        graphic.fitBounds(bounds, true);
    }

    // A bunch of simple transformations
    if (feature.params.width) graphic.scale(feature.params.width / graphic.bounds.width);
    if (feature.params.height) graphic.scale(feature.params.height / graphic.bounds.height);
    if (feature.params.scaleMultiplier) graphic.scale(feature.params.scaleMultiplier);
    if (feature.params.rotation) graphic.rotate(feature.params.rotation);
    if (feature.params.mirror) graphic.scale(-1, 1);
    if (feature.params.offset) {
        graphic.position.x += feature.params.offset[0] * bounds.width;
        graphic.position.y += feature.params.offset[1] * bounds.height;
    }

    // Alignment
    if (feature.params.alignment === "top-left") {
        graphic.bounds.topLeft = bounds.topLeft;
    } else if (feature.params.alignment === "top") {
        graphic.bounds.topCenter = bounds.topCenter;
    } else if (feature.params.alignment === "top-right") {
        graphic.bounds.topRight = bounds.topRight;
    } else if (feature.params.alignment === "left") {
        graphic.bounds.leftCenter = bounds.leftCenter;
    } else if (feature.params.alignment === "center") {
        graphic.position = bounds.center;
    } else if (feature.params.alignment === "right") {
        graphic.bounds.rightCenter = bounds.rightCenter;
    } else if (feature.params.alignment === "bottom-left") {
        graphic.bounds.bottomLeft = bounds.bottomLeft;
    } else if (feature.params.alignment === "bottom") {
        graphic.bounds.bottomCenter = bounds.bottomCenter;
    } else if (feature.params.alignment === "bottom-right") {
        graphic.bounds.bottomRight = bounds.bottomRight;
    }

    // If a mask is needed (eg, cover), create it and intersect it with the graphic
    if (needsMask) {
        const mask = new paper.Path.Rectangle(bounds);
        const subtractPath = graphic.intersect(mask) as paper.CompoundPath;
        graphic.replaceWith(subtractPath);
        graphic = subtractPath;
    }

    if (feature.params.operation === "engrave") {
        graphic.fillColor = new paper.Color(Color.engrave);
        graphic.strokeWidth = 0;
        group.addChild(graphic);
    } else if (feature.params.operation === "cut") {
        const shape = group.children[0] as paper.PathItem;
        const newShape = shape.subtract(graphic);
        shape.replaceWith(newShape);
        graphic.remove();
    } else if (feature.params.operation === "score") {
        graphic.fillColor = null;
        graphic.strokeWidth = 1;
        // graphic.strokeScaling = true;
        graphic.strokeColor = new paper.Color(Color.score);
        group.addChild(graphic);
    } else {
        throw new Error(`Operation ${feature.params.operation} not implemented`);
    }
};
