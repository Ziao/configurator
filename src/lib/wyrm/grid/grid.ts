export interface Grid {
    width: number;
    height: number;
    offsets: [number, number, number, number]; // top, right, bottom, left
}

export const createGrid = (config: Partial<Grid>): Grid => {
    return {
        width: 1,
        height: 1,
        offsets: [0, 0, 0, 0],
        ...config,
    };
};
