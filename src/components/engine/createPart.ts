import { Part, PartType } from "../../types/boxDefinition.ts";
import paper from "paper";

export const createPart = (type: PartType, partial?: Partial<Part>) => {
    const part: Part = {
        type: type,
        enabled: true,
        gridWallOffset: false,
        gridWidth: 1,
        gridHeight: 1,
        gridFeatures: [],
        ...partial,
    };

    return part;
};
