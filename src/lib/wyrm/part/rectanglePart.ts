import { createGrid } from "../grid/grid.ts";
import { PartType, RectanglePart } from "./types.ts";
import { v4 } from "uuid";

export const createRectanglePart = (config: Partial<RectanglePart>): RectanglePart => {
    const part = {
        uuid: v4(),
        id: "rectangle",
        type: PartType.rectangle,
        slots: [],
        width: 100,
        height: 100,
        grid: createGrid({}),
        features: [],
        ...config,
    };

    return part;
};
