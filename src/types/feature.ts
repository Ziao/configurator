export enum FeatureType {
    drawSlot = "drawSlot",
}

interface BaseFeature {
    type: FeatureType;
    gridCell?: [number, number];
    params: never;
}

export interface DrawSlotFeature extends BaseFeature {
    type: FeatureType.drawSlot;
    params: {
        bottomOffset: number;
        width: number; // usually 20, width of a finger
    };
}

// todo: graphic

export type Feature = DrawSlotFeature;
