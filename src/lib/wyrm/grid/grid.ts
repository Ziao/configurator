export interface Grid {
    width: number;
    height: number;
    offsets: [number, number, number, number]; // top, right, bottom, left
}

export const createGrid = (config: Partial<Grid>): Grid => {
    return {
        width: config.width || 1,
        height: config.height || 1,
        offsets: config.offsets || [0, 0, 0, 0],
    };
};
