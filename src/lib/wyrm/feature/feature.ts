export enum FeatureType {
    drawSlot = "drawSlot",
}

interface BaseFeature {
    type: FeatureType;
    gridCell?: [number, number];
    params: unknown;
}

interface DrawSlotParams {
    bottomOffset: number;
    width: number;
}

export interface DrawSlotFeature extends BaseFeature {
    type: FeatureType.drawSlot;
    params: DrawSlotParams;
}

// todo: graphic

export type Feature = DrawSlotFeature;
