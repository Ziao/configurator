// import paper, { Path } from "paper";
// import { BoxDefinition } from "../../types/boxDefinition.ts";
// import { createSlots } from "./createSlots.ts";
// import { punchSlots, SlotAlignment, SlotInversion, SlotOrientation } from "./punchSlots.ts";
//
// // export const createWall = (box: BoxDefinition, side: WallSide, slots?: paper.Path[]): paper.PathItem => {
// export const createBottom = (box: BoxDefinition): paper.PathItem => {
//     let part: paper.PathItem = new Path.Rectangle({
//         width: box.width,
//         height: box.depth,
//         // fillColor: new paper.Color("red"),
//         strokeColor: new paper.Color("red"),
//     });
//
//     const widthSlots = createSlots(box.width, box.materialThickness, box.slotLength);
//     const depthSlots = createSlots(box.depth, box.materialThickness, box.slotLength);
//
//     // Bottom slots
//     part = punchSlots({
//         part,
//         slots: widthSlots,
//         inversion: SlotInversion.EVEN,
//         alignment: SlotAlignment.BOTTOM,
//         orientation: SlotOrientation.HORIZONTAL,
//     });
//     part = punchSlots({
//         part,
//         slots: widthSlots,
//         inversion: SlotInversion.EVEN,
//         alignment: SlotAlignment.TOP,
//         orientation: SlotOrientation.HORIZONTAL,
//     });
//     widthSlots.remove();
//
//     // Side slots
//     part = punchSlots({
//         part,
//         slots: depthSlots,
//         inversion: SlotInversion.EVEN,
//         alignment: SlotAlignment.LEFT,
//         orientation: SlotOrientation.VERTICAL,
//     });
//     part = punchSlots({
//         part,
//         slots: depthSlots,
//         inversion: SlotInversion.EVEN,
//         alignment: SlotAlignment.RIGHT,
//         orientation: SlotOrientation.VERTICAL,
//     });
//     depthSlots.remove();
//
//     return part;
// };
