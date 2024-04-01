import paper, { Path } from "paper";
import { BoxDefinition, Part } from "../../../types/boxDefinition.ts";

export const createCardAssistShape = (box: BoxDefinition, part: Part) => {
    const radius = box.materialThickness;

    const width = box.width - box.materialThickness * 2 - 10;
    const height = box.depth - box.materialThickness * 2 - 10;

    if (width < 0 || height < 0) throw new Error("Card assist shape is too small");

    let path: paper.PathItem = new Path.Rectangle({
        width,
        height,
        radius,
        strokeColor: new paper.Color("red"),
    });

    part.group.addChild(path);
};
