import { BoxDefinition, GridFeature, GridFeatureType, Part } from "../../../types/boxDefinition.ts";
import paper, { Path, Shape } from "paper";
import { alignCenterHorizontal, alignCenterVertical } from "../util/alignment.ts";
import { extractAndFlattenPaths } from "../util/extractAndFlattenPaths.ts";
import { fitContain, fitCover } from "../util/fit.ts";
export const applyDrawSlot = (box: BoxDefinition, part: Part, feature: GridFeature) => {
    if (feature.type !== GridFeatureType.drawSlot) throw new Error("Feature is not of type drawSlot");
    if (!part.group) throw new Error("Part does not have a group");
    if (!part.group.children[0]) throw new Error("Part does not have a path");

    let path = part.group.children[0] as Path | Shape;

    // Todo: configurable
    const paddingX = 10;
    const paddingY = 10;
    const radius = 10;

    const slotRect = new paper.Path.Rectangle({
        width: path.bounds.width - paddingX * 2,
        height: path.bounds.height - paddingY,
        x: path.bounds.x + paddingX,
        y: path.bounds.y,
        radius,
        fillColor: "black",
    });

    let newPath = path.subtract(slotRect);
    slotRect.remove();
    path.replaceWith(newPath);
    path = newPath;

    const slotTop = new paper.Path.Rectangle({
        width: path.bounds.width - paddingX * 2,
        height: radius,
        x: path.bounds.x + paddingX,
        y: path.bounds.y,
        fillColor: "black",
    });

    newPath = path.subtract(slotTop);
    slotTop.remove();
    path.replaceWith(newPath);
    path = newPath;
};
