// import { Svg } from "@svgdotjs/svg.js";
// import paper from "paper";
// import { BoxDefinition, WallSide } from "../../types/boxDefinition.ts";
// import { createBottom } from "./createBottom.tsx";
// import { createWall } from "./createWall.tsx";
// import pack from "bin-pack-with-constraints";
//
// export const createBox = (definition: BoxDefinition): Svg | void => {
//     const parts: paper.PathItem[] = [];
//
//     parts.push(createWall(definition, WallSide.front));
//     parts.push(createWall(definition, WallSide.back));
//     parts.push(createWall(definition, WallSide.left));
//     parts.push(createWall(definition, WallSide.right));
//     parts.push(createBottom(definition));
//
//     packParts(parts, definition.maxPackWidth);
// };
//
// /**
//  * Tries to pack the parts in the most efficient way possible, never exceeding the maxWidth
//  * Parts are never closer than padding pixels. All parts are considered to be rectangular.
//  * @param parts
//  * @param maxWidth
//  * @param padding
//  */
// export const packParts = (parts: paper.PathItem[], maxWidth = 1000, padding = 10) => {
//     const packableItems = parts.map((part) => ({
//         width: part.bounds.width + padding,
//         height: part.bounds.height + padding,
//         x: 0,
//         y: 0,
//         part,
//     }));
//
//     pack(packableItems, {
//         inPlace: true,
//         maxWidth,
//     });
//
//     packableItems.forEach((item) => {
//         item.part.translate([item.x + padding, item.y + padding]);
//     });
// };
