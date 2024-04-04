// import paper, { Path } from "paper";
// import { BoxDefinition, WallSide } from "../../types/boxDefinition.ts";
// import { createSlots } from "./createSlots.ts";
// import { punchSlots, SlotAlignment, SlotInversion, SlotOrientation } from "./punchSlots.ts";
//
// // export const createWall = (box: BoxDefinition, side: WallSide, slots?: paper.Path[]): paper.PathItem => {
// export const createWall = (box: BoxDefinition, side: WallSide): paper.PathItem => {
//     const length = side === "front" || side === "back" ? box.width : box.depth;
//
//     let part: paper.PathItem = new Path.Rectangle({
//         width: length,
//         height: box.height,
//         // fillColor: new paper.Color("red"),
//         strokeColor: new paper.Color("red"),
//     });
//
//     const isFrontOrBack = [WallSide.front, WallSide.back].includes(side);
//
//     const bottomSlots = createSlots(isFrontOrBack ? box.width : box.depth, box.materialThickness, box.slotLength);
//     const sideSlots = createSlots(box.height - box.materialThickness, box.materialThickness, box.slotLength);
//
//     // Bottom slots
//     part = punchSlots({
//         part,
//         slots: bottomSlots,
//         inversion: SlotInversion.ODD,
//         alignment: SlotAlignment.BOTTOM,
//         orientation: SlotOrientation.HORIZONTAL,
//     });
//     bottomSlots.remove();
//
//     // Left side
//     part = punchSlots({
//         part,
//         slots: sideSlots,
//         inversion: isFrontOrBack ? SlotInversion.EVEN : SlotInversion.ODD,
//         alignment: SlotAlignment.TOP_LEFT,
//         orientation: SlotOrientation.VERTICAL,
//     });
//
//     // Right side
//     part = punchSlots({
//         part,
//         slots: sideSlots,
//         inversion: isFrontOrBack ? SlotInversion.EVEN : SlotInversion.ODD,
//         alignment: SlotAlignment.TOP_RIGHT,
//         orientation: SlotOrientation.VERTICAL,
//     });
//
//     sideSlots.remove();
//
//     return part;
// };
