import pack from "bin-pack-with-constraints";
import paper from "paper";
import { BoxDefinition } from "../../types/boxDefinition.ts";

export const packShapes = (box: BoxDefinition, padding = 10) => {
    const packableItems = box.parts
        // Only the parts that have a path
        .filter((part) => !!part.group)
        .map((part) => ({
            width: part.group.bounds.width + padding,
            height: part.group.bounds.height + padding,
            x: 0,
            y: 0,
            part,
        }));

    pack(packableItems, {
        inPlace: true,
        maxWidth: box.maxPackWidth,
    });

    packableItems.forEach((item) => {
        item.part.group.translate([item.x + padding, item.y + padding]);
    });
};
