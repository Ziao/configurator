// import { BoxDefinition, GridFeature, GridFeatureType, Part } from "../../../types/boxDefinition.ts";
// import { getTextAsPath } from "../util/getTextAsPath.ts";
//
// export const applyText = (box: BoxDefinition, part: Part, feature: GridFeature) => {
//     if (feature.type !== GridFeatureType.text) throw new Error("Feature is not of type text");
//     if (!part.group) throw new Error("Part does not have a group");
//     if (!part.group.children[0]) throw new Error("Part does not have a path");
//     if (!feature.text) throw new Error("Feature does not have text");
//
//     // let path = part.group.children[0] as paper.Path | paper.Shape;
//
//     console.log("feature.text.content", feature.text);
//
//     // let text = new paper.PointText({
//     //     point: new paper.Point(10, 10),
//     //     content: feature.text,
//     //     fillColor: "black",
//     //     fontSize: 8,
//     //     fontWeight: "bold",
//     //     fontFamily: "Helvetica",
//     // });
//     //
//     // path.subtract(text.toPath());
//
//     getTextAsPath(feature.text);
//
//     // // Todo: configurable
//     // const width = 25;
//     // const height = path.bounds.height - box.materialThickness * 2;
//     // const radius = width / 2;
//     //
//     // // Main slot, with rounded corners
//     // const slotRect = new paper.Path.Rectangle({
//     //     // width: path.bounds.width - paddingX * 2,
//     //     // height: path.bounds.height - paddingY,
//     //     width,
//     //     height,
//     //     // x: path.bounds.x + paddingX,
//     //     // y: path.bounds.y,
//     //     radius,
//     //     fillColor: "black",
//     // });
//     //
//     // alignCenterVertical(path, slotRect);
//     // alignTop(path, slotRect);
//     //
//     // let newPath = path.subtract(slotRect);
//     // slotRect.remove();
//     // path.replaceWith(newPath);
//     // path = newPath;
//     //
//     // // A little extra rectangle to mitigate the top radius of the previous rectangle
//     // const slotTop = new paper.Path.Rectangle({
//     //     width,
//     //     height: radius,
//     //     fillColor: "black",
//     // });
//     //
//     // alignCenterVertical(path, slotTop);
//     // alignTop(path, slotTop);
//     //
//     // newPath = path.subtract(slotTop);
//     // slotTop.remove();
//     // path.replaceWith(newPath);
//     // path = newPath;
//     //
//     // // This seems to work perfectly for now but the indexes may not always work?
//     // smoothCorner(path, 5, radius);
//     // smoothCorner(path, 1, radius);
// };
