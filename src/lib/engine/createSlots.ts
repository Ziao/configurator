import paper, { Path } from "paper";

export const createSlots = (length: number, thickness: number, slotLength: number) => {
    let numSlots = length / slotLength;

    if (slotLength < 5) throw new Error("Slot length must be greater than 5");

    // Todo: make this a configurable strategy (grow, shrink, even, odd)
    // Round numSlots up or down, whichever is odd to add symmetry
    numSlots = Math.floor(numSlots) % 2 === 0 ? Math.ceil(numSlots) : Math.floor(numSlots);
    // if it's still even (perfect division), add 1 to make it odd
    numSlots = numSlots % 2 === 0 ? numSlots + 1 : numSlots;

    // Ensure at least 3 slots
    numSlots = Math.max(3, numSlots);

    const actualSlotLength = length / numSlots;

    const group = new paper.Group();

    // Draw a rectangle for EVERY slot and tab
    for (let i = 0; i < numSlots; i += 1) {
        group.addChild(
            new Path.Rectangle({
                width: actualSlotLength,
                height: thickness,
                x: i * actualSlotLength,
                y: 0,
                // y: (i % 2) * 20, //-thickness * 0.5,
                // fillColor: new paper.Color(i % 2 === 0 ? "blue" : "red"),
                fillColor: new paper.Color("black"),
            }),
        );
    }

    return group;
};
