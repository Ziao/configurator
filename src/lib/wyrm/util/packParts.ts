import pack, { PackableItem } from "bin-pack-with-constraints";
import { MaxRectsPacker, PACKING_LOGIC } from "maxrects-packer";
import paper from "paper";

export const packParts = (groups: paper.Group[], maxWidth: number, padding = 5) => {
    const packableItems: PackableItem<paper.Group>[] = groups.map((group) => ({
        width: group.bounds.width + padding,
        height: group.bounds.height + padding,
        x: 0,
        y: 0,
        item: group,
    }));

    pack(packableItems, {
        inPlace: true,
        maxWidth: maxWidth,
    });

    packableItems.forEach((item) => {
        // item.item.translate([item.x + padding, item.y + padding]);
        item.item.bounds.topLeft = new paper.Point(item.x + padding, item.y + padding);
    });
};

export const packParts2 = (groups: paper.Group[], maxWidth: number, padding = 5) => {
    const packableItems: PackableItem<paper.Group>[] = groups.map((group) => ({
        width: group.bounds.width,
        height: group.bounds.height,
        x: 0,
        y: 0,
        item: group,
    }));

    const packer = new MaxRectsPacker<PackableItem<paper.Group>>(maxWidth, 100000, padding, {
        // https://github.com/soimy/maxrects-packer?tab=readme-ov-file#api
        allowRotation: false,
        smart: true,
        // square: true,
        logic: PACKING_LOGIC.MAX_AREA,
    });

    packableItems.forEach((item) => packer.add(item));

    packer.addArray(packableItems);
    // packer.next();
    packer.bins.forEach((bin) => {
        bin.rects.forEach((item) => {
            item.item.bounds.topLeft = new paper.Point(item.x, item.y);
        });
    });
};
