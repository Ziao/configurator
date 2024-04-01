import paper, { Path } from "paper";
import { BoxDefinition, Part } from "../../../types/boxDefinition.ts";
import { alignCenterHorizontal, alignCenterVertical } from "../util/alignment.ts";

export const createBottomStackableShape = (box: BoxDefinition, part: Part) => {
    const radius = box.materialThickness;

    let path: paper.PathItem = new Path.Rectangle({
        width: box.width - box.materialThickness * 2,
        height: box.depth - box.materialThickness * 2,
        strokeColor: new paper.Color("red"),
        radius,
    });

    part.group.addChild(path);
};
