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
    const graphicsGroup = new paper.Group(graphicPaths);
    graphicsGroup.scale(0.01, [0, 0]);
    graphic.remove();

    let path = part.group.children[0] as Path | Shape;

    switch (feature.graphic.fit) {
        case "contain":
            // fitContain(graphicPath, path, feature.graphic.padding ?? 0);
            fitContain(graphicsGroup, path, feature.graphic.padding ?? 0);
            break;
        case "cover":
            // fitCover(graphicPath, path, feature.graphic.padding ?? 0);
            fitCover(graphicsGroup, path, feature.graphic.padding ?? 0);
            break;
        default:
            // Simply center it
            alignCenterHorizontal(path, graphicPath);
            alignCenterVertical(path, graphicPath);
    }

    switch (feature.graphic.operation) {
        case "subtract":
            graphicPaths.forEach((graphicPath) => {
                const newPath = path.subtract(graphicPath);
                path.replaceWith(newPath);
                path = newPath;
            });
            graphicsGroup.remove();
            break;
        case "engrave":
            graphicsGroup.fillColor = "blue";
            graphicsGroup.strokeWidth = 0;
            part.group.addChild(graphicsGroup);
            break;
        case "outline":
            console.log("outline");
            graphicsGroup.strokeColor = "green";
            graphicsGroup.strokeWidth = 0.5;
            graphicsGroup.fillColor = null;
            part.group.addChild(graphicsGroup);
            break;
        default:
            console.warn(`🚨 Operation ${feature.graphic.operation} not implemented`);
    }
};
