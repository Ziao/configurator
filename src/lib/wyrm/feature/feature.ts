import { DrawSlotFeature } from "./drawslotFeature.ts";
import { GraphicFeature } from "./graphicFeature.ts";

export enum FeatureType {
    drawSlot = "drawSlot",
    graphic = "graphic",
}

export interface BaseFeature {
    type: FeatureType;
    gridCell?: [number, number]; // will throw an error if the part has no grid
    params: unknown;
}

export type Feature = DrawSlotFeature | GraphicFeature;
