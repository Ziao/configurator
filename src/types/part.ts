import { Grid } from "./grid.ts";
import { SlotConfig } from "./slotConfig";

export enum PartType {
    rectangle = "rectangle",
}

interface BasePart {
    id: string; // Used to identify the part
    type: PartType;
    slots: SlotConfig[];
    group: paper.Group; // First child is always the main path
}

export interface RectanglePart extends BasePart {
    type: PartType.rectangle;
    width: number;
    height: number;
    grid: Grid;
    features: Feature[];
}

export type Part = RectanglePart;
