import paper from "paper";

export const punchSlots = ({
    path,
    start,
    end,
    slotLength,
    thickness,
    mode,
    amount,
    minAmount,
}: {
    path: paper.PathItem;
    start: paper.Point;
    end: paper.Point;
    slotLength: number;
    thickness: number;
    mode: "even" | "odd";
    amount?: number;
    minAmount?: number;
}) => {
    if (slotLength < 5) throw new Error("Slot length must be greater than 5");
    const lineVector = end.subtract(start);
    let { numSlots, actualSlotLength } = getNumSlots(lineVector.length, slotLength);

    if (amount) {
        numSlots = amount;
        actualSlotLength = lineVector.length / numSlots;
    }

    if (minAmount && numSlots < minAmount) {
        numSlots = minAmount;
        actualSlotLength = lineVector.length / numSlots;
    }

    const rectangleSize = new paper.Size(actualSlotLength, thickness);

    let newPath = path;

    for (let i = 0; i < numSlots; i++) {
        const draw = mode == "even" ? i % 2 === 0 : i % 2 !== 0;
        if (!draw) continue;

        const centerPoint = start.add(lineVector.normalize().multiply(i * actualSlotLength + actualSlotLength / 2));
        // const rectangle = new paper.Rectangle(centerPoint.subtract(rectangleSize.divide(2)), rectangleSize);
        const rect = new paper.Path.Rectangle({
            center: centerPoint,
            size: rectangleSize,
            fillColor: "red",
            rotation: lineVector.angle,
        });

        const oldPath = newPath;
        newPath = newPath.subtract(rect);
        oldPath.remove();
        rect.remove();
    }

    return newPath;
};

const getNumSlots = (length: number, slotLength: number) => {
    if (slotLength < 5) throw new Error("Slot length must be greater than 5");

    let numSlots = length / slotLength;

    // Todo: make this a configurable strategy (grow, shrink, even, odd)
    // Round numSlots up or down, whichever is odd to add symmetry
    numSlots = Math.floor(numSlots) % 2 === 0 ? Math.ceil(numSlots) : Math.floor(numSlots);
    // if it's still even (perfect division), add 1 to make it odd
    numSlots = numSlots % 2 === 0 ? numSlots + 1 : numSlots;

    // Ensure at least 3 slots
    numSlots = Math.max(2, numSlots);

    const actualSlotLength = length / numSlots;

    return { numSlots, actualSlotLength };
};
