// import paper, { Path } from "paper";
// import { BoxDefinition, Part } from "../../../types/boxDefinition.ts";
// import { alignCenterHorizontal, alignCenterVertical } from "../util/alignment.ts";
//
// export const createLidBottomShape = (box: BoxDefinition, part: Part) => {
//     const radius = box.materialThickness;
//
//     let path: paper.PathItem = new Path.Rectangle({
//         width: box.width - box.materialThickness * 2,
//         height: box.depth - box.materialThickness * 2,
//         strokeColor: new paper.Color("red"),
//         radius,
//     });
//
//     const edgeThickness = box.materialThickness * 2;
//     const minSize = box.materialThickness * 2 + edgeThickness * 2 + 10;
//
//     if (box.width > minSize && box.depth > minSize) {
//         // Cut out a hollow center
//         const innerPath = new Path.Rectangle({
//             width: box.width - box.materialThickness * 2 - edgeThickness * 2,
//             height: box.depth - box.materialThickness * 2 - edgeThickness * 2,
//             strokeColor: new paper.Color("blue"),
//             radius: radius * 0.2,
//         });
//
//         alignCenterVertical(path, innerPath);
//         alignCenterHorizontal(path, innerPath);
//
//         const newPath = path.subtract(innerPath);
//         path.replaceWith(newPath);
//         path = newPath;
//         innerPath.remove();
//     }
//
//     part.group.addChild(path);
// };
