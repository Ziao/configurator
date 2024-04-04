import { createGrid } from "../grid/grid.ts";
import { PartType, RectanglePart } from "./types.ts";

export const createRectanglePart = (config: Partial<RectanglePart>): RectanglePart => {
    const part = {
        id: config.id || "rectangle",
        type: PartType.rectangle,
        slots: config.slots || [],
        width: config.width || 100,
        height: config.height || 100,
        grid: config.grid || createGrid({}),
        features: config.features || [],
        ...config,
    };

    return part;
};
