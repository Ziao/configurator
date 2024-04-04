import { Feature } from "../feature/feature.ts";
import { Grid } from "../grid/grid.ts";
import { SlotConfig } from "../slot/slotConfig.ts";

export enum PartType {
    rectangle = "rectangle",
}

/**
 * A part is a single piece of material that is cut out of a sheet
 * It can be a simple rectangle, or a more complex shape
 *
 */
export interface BasePart {
    id: string; // Used to identify the part
    type: PartType;
    slots: SlotConfig[];
    // group?: paper.Group; // First child is always the main path. created on the fly when the project is rendered
}

export type Part = RectanglePart;

export interface RectanglePart extends BasePart {
    type: PartType.rectangle;
    width: number;
    height: number;
    grid: Grid;
    features: Feature[];
}
