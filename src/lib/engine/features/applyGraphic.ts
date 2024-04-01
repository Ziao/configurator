import { BoxDefinition, GridFeature, GridFeatureType, Part } from "../../../types/boxDefinition.ts";
import paper, { Path, Shape } from "paper";
import { alignCenterHorizontal, alignCenterVertical } from "../util/alignment.ts";
import { extractAndFlattenPaths } from "../util/extractAndFlattenPaths.ts";
import { fitContain, fitCover } from "../util/fit.ts";
export const applyGraphic = (box: BoxDefinition, part: Part, feature: GridFeature) => {
    if (feature.type !== GridFeatureType.graphic) throw new Error("Feature is not of type graphic");
    if (!feature.graphic) throw new Error("Feature does not have a graphic");
    if (!part.group) throw new Error("Part does not have a group");
    if (!part.group.children[0]) throw new Error("Part does not have a path");
    if (!feature.graphic.svgContent) throw new Error("Feature does not have svgContent");

    const graphic = paper.project.importSVG(feature.graphic.svgContent);
    graphic.scale(2, [0, 0]);

    const graphicPaths = extractAndFlattenPaths(graphic, false);
    graphic.remove();

    // const graphicsGroup = new paper.Group(graphicPaths);
    // graphicsGroup.scale(0.01, [0, 0]);

    let compound = new paper.CompoundPath(graphicPaths);

    let path = part.group.children[0] as Path | Shape;

    switch (feature.graphic.fit) {
        case "contain":
            // fitContain(graphicPath, path, feature.graphic.padding ?? 0);
            fitContain(compound, path, feature.graphic.padding ?? 0);
            if (feature.graphic.scale) compound.scale(feature.graphic.scale);
            break;
        case "cover":
            // fitCover(graphicPath, path, feature.graphic.padding ?? 0);
            compound = fitCover(compound, path, feature.graphic.padding ?? 0, true, feature.graphic.scale);
            break;
        default:
            // Simply center it
            alignCenterHorizontal(path, compound);
            alignCenterVertical(path, compound);
            if (feature.graphic.scale) compound.scale(feature.graphic.scale);
            break;
    }

    switch (feature.graphic.operation) {
        case "subtract":
            const newPath = path.subtract(compound);
            compound.remove();
            path.replaceWith(newPath);
            path = newPath;

            break;
        case "engrave":
            // graphicsGroup.fillColor = "#aaaaaa";
            // graphicsGroup.strokeWidth = 0;
            compound.fillColor = "#aaaaaa";
            compound.strokeWidth = 0;
            part.group.addChild(compound);
            break;
        case "outline":
            compound.strokeColor = "#ffaaaa";
            compound.strokeWidth = 0.5;
            compound.fillColor = null;
            part.group.addChild(compound);
            break;
        default:
            console.warn(`🚨 Operation ${feature.graphic.operation} not implemented`);
    }
};
