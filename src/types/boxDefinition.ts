export interface BoxDefinition {
    shape: BoxShape;
    // All measurements are in millimeters
    // If there's artwork on the box, width is always the top and bottom when looking at the artwork
    width: number;
    depth: number;
    height: number;
    // innerDimensions: boolean; // for now, outer only

    materialThickness: number;
    maxPackWidth?: number;
    maxPackHeight?: number;

    // features: BoxFeature[];
    innerWalls: InnerWall[];
    slotLength: number;

    hasLid: boolean;
    hasLidInset: boolean;
    hasOuterWall: boolean;
    hasCardAssist: boolean;
}

export interface InnerWall {
    percentage: number;
    // Horizontal = left to right, so 100% has roughly the same length as the width
    direction: "horizontal" | "vertical";
}

export enum BoxShape {
    rectangle = "rectangle",
}

export enum WallSide {
    // top = "top",
    // bottom = "bottom",
    left = "left",
    right = "right",
    front = "front",
    back = "back",
}

// export enum BoxFeature {
//     lid = "lid",
//     lidInset = "lidInset",
//     wallInset = "wallInset",
//     cardAssist = "cardAssist",
// }
