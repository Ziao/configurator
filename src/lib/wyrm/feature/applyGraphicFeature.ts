import { importSvgGroup } from "../../engine/util/importSvgGroup.ts";
import { Color } from "../colors.ts";
import { Component } from "../component/types.ts";
import { getGridCellBounds } from "../grid/grid.ts";
import { Part } from "../part/types.ts";
import { Project } from "../project/project.ts";
import { GraphicFeature } from "./feature.ts";
import paper from "paper";

export const applyGraphicFeature = (component: Component, part: Part, feature: GraphicFeature, group: paper.Group) => {
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
    } else if (feature.params.fit === "center") {
        graphic.position = bounds.center;
    }

    // A bunch of simple transformations
    if (feature.params.width) graphic.scale(feature.params.width / graphic.bounds.width);
    if (feature.params.height) graphic.scale(feature.params.height / graphic.bounds.height);
    if (feature.params.scaleMultiplier) graphic.scale(feature.params.scaleMultiplier);
    if (feature.params.rotation) graphic.rotate(feature.params.rotation);
    if (feature.params.mirror) graphic.scale(-1, 1);

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

// import { BoxDefinition, GridFeature, GridFeatureType, Part } from "../../../types/boxDefinition.ts";
// import paper, { Path, Shape } from "paper";
// import { alignCenterHorizontal, alignCenterVertical } from "../util/alignment.ts";
// import { extractAndFlattenPaths } from "../util/extractAndFlattenPaths.ts";
// import { fitContain, fitCover } from "../util/fit.ts";
// export const applyGraphic = (box: BoxDefinition, part: Part, feature: GridFeature) => {
//     if (feature.type !== GridFeatureType.graphic) throw new Error("Feature is not of type graphic");
//     if (!feature.graphic) throw new Error("Feature does not have a graphic");
//     if (!part.group) throw new Error("Part does not have a group");
//     if (!part.group.children[0]) throw new Error("Part does not have a path");
//     if (!feature.graphic.svgContent) throw new Error("Feature does not have svgContent");
//
//     const graphic = paper.project.importSVG(feature.graphic.svgContent);
//     graphic.scale(2, [0, 0]);
//
//     const graphicPaths = extractAndFlattenPaths(graphic, false);
//     graphic.remove();
//
//     // const graphicsGroup = new paper.Group(graphicPaths);
//     // graphicsGroup.scale(0.01, [0, 0]);
//
//     let compound = new paper.CompoundPath(graphicPaths);
//
//     let path = part.group.children[0] as Path | Shape;
//
//     switch (feature.graphic.fit) {
//         case "contain":
//             // fitContain(graphicPath, path, feature.graphic.padding ?? 0);
//             fitContain(compound, path, feature.graphic.padding ?? 0);
//             if (feature.graphic.scale) compound.scale(feature.graphic.scale);
//             break;
//         case "cover":
//             // fitCover(graphicPath, path, feature.graphic.padding ?? 0);
//             compound = fitCover(compound, path, feature.graphic.padding ?? 0, true, feature.graphic.scale);
//             break;
//         default:
//             // Simply center it
//             alignCenterHorizontal(path, compound);
//             alignCenterVertical(path, compound);
//             if (feature.graphic.scale) compound.scale(feature.graphic.scale);
//             break;
//     }
//
//     switch (feature.graphic.operation) {
//         case "subtract":
//             // eslint-disable-next-line no-case-declarations
//             const newPath = path.subtract(compound);
//             compound.remove();
//             path.replaceWith(newPath);
//             path = newPath;
//
//             break;
//         case "engrave":
//             // graphicsGroup.fillColor = "#aaaaaa";
//             // graphicsGroup.strokeWidth = 0;
//             compound.fillColor = "#aaaaaa";
//             compound.strokeWidth = 0;
//             part.group.addChild(compound);
//             break;
//         case "outline":
//             compound.strokeColor = "#ffaaaa";
//             compound.strokeWidth = 0.5;
//             compound.fillColor = null;
//             part.group.addChild(compound);
//             break;
//         default:
//             console.warn(`🚨 Operation ${feature.graphic.operation} not implemented`);
//     }
// };
