export enum FeatureType {
    drawSlot = "drawSlot",
    graphic = "graphic",
}

interface BaseFeature {
    type: FeatureType;
    gridCell?: [number, number]; // will throw an error if the part has no grid
    params: unknown;
}

export interface DrawSlotFeature extends BaseFeature {
    type: FeatureType.drawSlot;
    params: {
        bottomOffset: number;
        width: number;
    };
}

export interface GraphicFeature extends BaseFeature {
    type: FeatureType.graphic;
    params: {
        svgString?: string;
        // svgUrl?: string; // todo, makes async a bit annoying
        // imageUrl?: string; // todo, may be easier to implement than svgUrl
        operation: "cut" | "engrave" | "score";
        fit: "contain" | "cover" | "center";
        rotation?: number;
        mirror?: boolean;

        // None or one of these should be set, if both are set, height will take precedence
        width?: number;
        height?: number;

        /**
         * If set, the final graphic will be scaled by this multiplier
         * Especially useful for fit: cover, and you want a bit of a bleed
         */
        scaleMultiplier?: number;
    };
}

export type Feature = DrawSlotFeature | GraphicFeature;
