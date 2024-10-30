import {
    createBackWall,
    createBottom,
    createBoxComponent,
    createDividers,
    createFrontWall,
    createInnerLid,
    createLeftWall,
    createRightWall,
} from "../../lib/wyrm/component/createBoxComponent.ts";
import { createGrid } from "../../lib/wyrm/grid/grid.ts";
import { Project } from "../../lib/wyrm/project/project.ts";

// Dragons, 4x4 stacks
// Cards (with sleeve) are 60x90
// We pretend the material is 4mm thick, that should add enough margin on all sides
// We have about 3.5mm of clearance vertically, lets round it down to 3.4 because of the feet
// Gives you 24mm x 4 for the stack cards, 96mm total
export const createResourceBottomBox = (project: Project) => {
    const resourceBottomBox = createBoxComponent(project, {
        name: "ResourceBottom Box",
        materialThickness: 3,
        params: {
            width: 285 / 2, // Box width /2
            depth: 285 - 132 - 68, // leftover space
            height: 34 / 2, // Full height boxes are 34 + the lid so 37.
            slotLength: 10,
        },
    });

    createBottom(resourceBottomBox, {
        grid: createGrid({ width: 2 }, resourceBottomBox),
    });
    createLeftWall(resourceBottomBox);
    createRightWall(resourceBottomBox);
    createFrontWall(resourceBottomBox, {});
    createBackWall(resourceBottomBox, {});
    createDividers(resourceBottomBox);

    return resourceBottomBox;
};
