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
    hasStackableBottom: boolean;
    hasCardAssist: boolean;

    parts: Part[];
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

export enum PartType {
    lidTop = "lidTop",
    lidBottom = "lidBottom",
    bottom = "bottom",
    bottomStackable = "bottomStackable",
    wall = "wall",
    wallOuter = "wallOuter",
    cardAssist = "cardAssist",
    // leftWall = "leftWall",
    // leftWallOuter = "leftWallOuter",
    // rightWall = "rightWall",
    // rightWallOuter = "rightWallOuter",
    // frontWall = "frontWall",
    // frontWallOuter = "frontWallOuter",
    // backWall = "backWall",
    // backWallOuter = "backWallOuter",
}

export interface Part {
    type: PartType;
    side?: WallSide;
    enabled: boolean;
    gridWallOffset: boolean; // Does the grid start at the very edge or do we respect the wall thickness?
    gridWidth: number;
    gridHeight: number;
    gridFeatures: GridFeature[];
    // gridInsets: GridInset[];
    // path?: paper.PathItem;
    // The first child should ALWAYS be the main path
    group: paper.Group;
}

export interface GridFeature {
    enabled: boolean;
    x: number;
    y: number;
    type: GridFeatureType;
    graphic?: Graphic;
    text?: string; // todo: conver to featureparams or something
}

export enum GridFeatureType {
    // Engrave or cut a graphic
    graphic = "graphic",
    // Engrave a text -> cancelled, texts dont convert to paths
    // text = "text",
    // Cut out a slot for easy drawing of cards
    drawSlot = "drawSlot",
}

export interface Graphic {
    // part: PartType;
    type: "vector" | "image";
    svgContent?: string;
    scale?: number; // Applied after the other calculations, before the operation
    fit?: "contain" | "cover";
    padding?: number;
    offsetX?: number;
    offsetY?: number;
    rotation?: number;
    operation: "subtract" | "engrave" | "outline";
}
