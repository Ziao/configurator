// import paper, { Path } from "paper";
// import { BoxDefinition, Part } from "../../../types/boxDefinition.ts";
// import { punchSlots } from "../punchSlotsNew.ts";
//
// export const createBottomShape = (box: BoxDefinition, part: Part) => {
//     let path: paper.PathItem = new Path.Rectangle({
//         width: box.width,
//         height: box.depth,
//         strokeColor: new paper.Color("red"),
//     });
//
//     // Top and bottom slots
//     for (let i = 0; i < 2; i++) {
//         const y = i === 0 ? box.materialThickness * 0.5 : box.depth - box.materialThickness * 0.5;
//         const newPath = punchSlots({
//             path,
//             start: new paper.Point(0, y),
//             end: new paper.Point(box.width, y),
//             slotLength: box.slotLength,
//             thickness: box.materialThickness,
//             mode: "odd",
//         });
//         path.replaceWith(newPath);
//         path = newPath;
//     }
//
//     // Left and right slots
//     for (let i = 0; i < 2; i++) {
//         const x = i === 0 ? box.materialThickness * 0.5 : box.width - box.materialThickness * 0.5;
//         const newPath = punchSlots({
//             path,
//             start: new paper.Point(x, 0),
//             end: new paper.Point(x, box.depth),
//             slotLength: box.slotLength,
//             thickness: box.materialThickness,
//             mode: "odd",
//         });
//         path.replaceWith(newPath);
//         path = newPath;
//     }
//
//     part.group.addChild(path);
// };
