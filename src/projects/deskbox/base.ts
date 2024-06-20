import {
    createBackWall,
    createBottom,
    createBoxComponent,
    createFrontWall,
    createLeftWall,
    createRightWall,
} from "../../lib/wyrm/component/createBoxComponent.ts";
import { Project } from "../../lib/wyrm/project/project.ts";

// Miscs, 4x4 stacks
// Cards (with sleeve) are 60x90
// We pretend the material is 4mm thick, that should add enough margin on all sides
// We have about 3.5mm of clearance vertically, lets round it down to 3.4 because of the feet
// Gives you 24mm x 4 for the stack cards, 96mm total
export const createBase = (project: Project) => {
    const base = createBoxComponent(project, {
        name: "Base",
        materialThickness: 3,
        params: {
            width: 60 * 4 + 3 * 2,
            depth: 60 * 2 + 3 * 2,
            height: 20,
            slotLength: 10,
        },
    });

    createBottom(base);
    createLeftWall(base);
    createRightWall(base);
    createFrontWall(base);

    createBackWall(base);

    return base;
};
