// import { BoxDefinition, GridFeature, GridFeatureType, Part } from "../../../types/boxDefinition.ts";
// import paper, { Path, Shape } from "paper";
// import { alignCenterVertical, alignTop } from "../util/alignment.ts";
// import { smoothCorner } from "../util/smoothCorner.ts";
//
// export const applyDrawSlot = (box: BoxDefinition, part: Part, feature: GridFeature) => {
//     if (feature.type !== GridFeatureType.drawSlot) throw new Error("Feature is not of type drawSlot");
//     if (!part.group) throw new Error("Part does not have a group");
//     if (!part.group.children[0]) throw new Error("Part does not have a path");
//
//     let path = part.group.children[0] as Path | Shape;
//
//     // Todo: configurable
//     const width = 25;
//     const height = path.bounds.height - box.materialThickness * 2;
//     const radius = width / 2;
//
//     // Main slot, with rounded corners
//     const slotRect = new paper.Path.Rectangle({
//         // width: path.bounds.width - paddingX * 2,
//         // height: path.bounds.height - paddingY,
//         width,
//         height,
//         // x: path.bounds.x + paddingX,
//         // y: path.bounds.y,
//         radius,
//         fillColor: "black",
//     });
//
//     alignCenterVertical(path, slotRect);
//     alignTop(path, slotRect);
//
//     let newPath = path.subtract(slotRect);
//     slotRect.remove();
//     path.replaceWith(newPath);
//     path = newPath;
//
//     // A little extra rectangle to mitigate the top radius of the previous rectangle
//     const slotTop = new paper.Path.Rectangle({
//         width,
//         height: radius,
//         fillColor: "black",
//     });
//
//     alignCenterVertical(path, slotTop);
//     alignTop(path, slotTop);
//
//     newPath = path.subtract(slotTop);
//     slotTop.remove();
//     path.replaceWith(newPath);
//     path = newPath;
//
//     // This seems to work perfectly for now but the indexes may not always work?
//     smoothCorner(path, 5, radius / 2);
//     smoothCorner(path, 1, radius / 2);
// };
