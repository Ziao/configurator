import paper from "paper";

export enum SlotInversion {
    EVEN = "even",
    ODD = "odd",
}

export enum SlotAlignment {
    TOP = "top",
    BOTTOM = "bottom",
    LEFT = "left",
    RIGHT = "right",
    TOP_LEFT = "top-left",
    TOP_RIGHT = "top-right",
    BOTTOM_LEFT = "bottom-left",
    BOTTOM_RIGHT = "bottom-right",
}

export enum SlotOrientation {
    HORIZONTAL = "horizontal",
    VERTICAL = "vertical",
}

interface SlotOptions {
    part: paper.PathItem;
    slots: paper.Group;
    inversion: SlotInversion;
    alignment: SlotAlignment;
    orientation: SlotOrientation;
}

export const punchSlots = ({ part, slots, inversion, alignment, orientation }: SlotOptions) => {
    const slotsCopy = slots.clone();

    if (orientation === SlotOrientation.VERTICAL) slotsCopy.rotate(90);

    // Move the slots into the part
    // part.addChild(slotsCopy);

    switch (alignment) {
        case SlotAlignment.TOP:
            slotsCopy.position.set(part.bounds.topCenter);
            slotsCopy.translate([0, slotsCopy.bounds.height * 0.5]);
            break;
        case SlotAlignment.BOTTOM:
            slotsCopy.position.set(part.bounds.bottomCenter);
            slotsCopy.translate([0, -slotsCopy.bounds.height * 0.5]);
            break;
        case SlotAlignment.LEFT:
            slotsCopy.position.set(part.bounds.leftCenter);
            slotsCopy.translate([slotsCopy.bounds.width * 0.5, 0]);
            break;
        case SlotAlignment.RIGHT:
            slotsCopy.position.set(part.bounds.rightCenter);
            slotsCopy.translate([-slotsCopy.bounds.width * 0.5, 0]);
            break;
        case SlotAlignment.TOP_LEFT:
            slotsCopy.position.set(part.bounds.topLeft);
            slotsCopy.translate([slotsCopy.bounds.width * 0.5, slotsCopy.bounds.height * 0.5]);
            break;
        case SlotAlignment.TOP_RIGHT:
            slotsCopy.position.set(part.bounds.topRight);
            slotsCopy.translate([-slotsCopy.bounds.width * 0.5, slotsCopy.bounds.height * 0.5]);
            break;
        case SlotAlignment.BOTTOM_LEFT:
            slotsCopy.position.set(part.bounds.bottomLeft);
            slotsCopy.translate([slotsCopy.bounds.width * 0.5, -slotsCopy.bounds.height * 0.5]);
            break;
        case SlotAlignment.BOTTOM_RIGHT:
            slotsCopy.position.set(part.bounds.bottomRight);
            slotsCopy.translate([-slotsCopy.bounds.width * 0.5, -slotsCopy.bounds.height * 0.5]);
            break;
    }

    slotsCopy.children.forEach((slot, i) => {
        if (inversion === SlotInversion.EVEN && i % 2 === 0) return;
        if (inversion === SlotInversion.ODD && i % 2 !== 0) return;

        if (!(slot instanceof paper.PathItem)) return;
        const oldPath = part;
        part = part.subtract(slot);
        oldPath.remove();

        // We can't remove children NOW because we're still iterating over them, it would lead to a mess
        // slot.remove();
    });

    slotsCopy.removeChildren();

    return part;
};
