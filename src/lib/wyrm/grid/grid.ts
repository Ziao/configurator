import paper from "paper";
import { Part } from "../part/types.ts";

export interface Grid {
    width: number;
    height: number;
    offsets: [number, number, number, number]; // top, right, bottom, left
    spacing: number;
}

export const createGrid = (config: Partial<Grid>): Grid => {
    return {
        width: 1,
        height: 1,
        // todo: single offset number for all sides?
        offsets: [0, 0, 0, 0],
        spacing: 0,
        ...config,
    };
};

/**
 * Get the bounds of a single cell in a grid.
 * Considers offset (top, right, bottom, left) and spacing between cells.
 */
export const getGridCellBounds = (part: Part, cell: [number, number]): paper.Rectangle => {
    if (!part.grid) throw new Error("Part does not have a grid");

    const grid = part.grid;

    // Total width/height = width/height - offsets
    const totalGridWidth = part.width - grid.offsets[1] - grid.offsets[3];
    const totalGridHeight = part.height - grid.offsets[0] - grid.offsets[2];

    // Individual width/height
    const cellWidth = (totalGridWidth - grid.spacing * (grid.width - 1)) / grid.width;
    const cellHeight = (totalGridHeight - grid.spacing * (grid.height - 1)) / grid.height;

    // Calculate cell bounds
    const x = grid.offsets[3] + cell[0] * (cellWidth + grid.spacing);
    const y = grid.offsets[0] + cell[1] * (cellHeight + grid.spacing);

    return new paper.Rectangle(x, y, cellWidth, cellHeight);
};
