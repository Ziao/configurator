import pack from "bin-pack-with-constraints";

export const packParts = (groups: paper.Group[], maxWidth: number, padding = 5) => {
    const packableItems = groups.map((group) => ({
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
        item.item.translate([item.x + padding, item.y + padding]);
    });
};
