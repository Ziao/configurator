import paper, { Path } from "paper";
import { BoxDefinition, Part, WallSide } from "../../types/boxDefinition.ts";
import { punchSlots } from "./punchSlotsNew.ts";

export const createWall = (box: BoxDefinition, part: Part) => {
    if (!part.side) throw new Error("Wall part must have a side");

    const isFrontOrBack = [WallSide.front, WallSide.back].includes(part.side);
    const length = isFrontOrBack ? box.width : box.depth;

    let path: paper.PathItem = new Path.Rectangle({
        width: length,
        height: box.height,
        strokeColor: new paper.Color("red"),
    });

    // Bottom slots
    path = punchSlots({
        path,
        start: new paper.Point(0, box.height - box.materialThickness * 0.5),
        end: new paper.Point(length, box.height - box.materialThickness * 0.5),
        slotLength: box.slotLength,
        thickness: box.materialThickness,
        mode: "even",
    });

    // Left slots
    path = punchSlots({
        path,
        start: new paper.Point(box.materialThickness * 0.5, 0),
        end: new paper.Point(box.materialThickness * 0.5, box.height - box.materialThickness),
        slotLength: box.slotLength,
        thickness: box.materialThickness,
        mode: isFrontOrBack ? "even" : "odd",
    });

    // Right slots
    path = punchSlots({
        path,
        start: new paper.Point(length - box.materialThickness * 0.5, 0),
        end: new paper.Point(length - box.materialThickness * 0.5, box.height - box.materialThickness),
        slotLength: box.slotLength,
        thickness: box.materialThickness,
        mode: isFrontOrBack ? "even" : "odd",
    });

    // part.path = path;
    part.group.addChild(path);
};
