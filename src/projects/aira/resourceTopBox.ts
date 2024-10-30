import {
    createBackWall,
    createBottom,
    createBoxComponent,
    createDividers,
    createFrontWall,
    createInnerLid,
    createLeftWall,
    createLid,
    createRightWall,
} from "../../lib/wyrm/component/createBoxComponent.ts";
import { createGraphicFeature } from "../../lib/wyrm/feature/graphicFeature.ts";
import { createGrid } from "../../lib/wyrm/grid/grid.ts";
import { Project } from "../../lib/wyrm/project/project.ts";
import { generateLidOrnaments } from "./generateLidOrnaments.ts";
import resources from "./graphics/resource.svg?raw";

// Dragons, 4x4 stacks
// Cards (with sleeve) are 60x90
// We pretend the material is 4mm thick, that should add enough margin on all sides
// We have about 3.5mm of clearance vertically, lets round it down to 3.4 because of the feet
// Gives you 24mm x 4 for the stack cards, 96mm total
export const createResourceTopBox = (project: Project) => {
    const resourceTopBox = createBoxComponent(project, {
        name: "ResourceTop Box",
        materialThickness: 3,
        params: {
            width: 285 / 2, // Box width /2
            depth: 285 - 132 - 68, // leftover space
            height: 34 / 2, // Full height boxes are 34 + the lid so 37.
            slotLength: 10,
        },
    });

    createBottom(resourceTopBox, {
        grid: createGrid({ width: 2 }, resourceTopBox),
    });
    createLeftWall(resourceTopBox);
    createRightWall(resourceTopBox);
    createFrontWall(resourceTopBox, {});
    createBackWall(resourceTopBox, {});
    createInnerLid(resourceTopBox, {});
    createLid(resourceTopBox, {
        features: [
            createGraphicFeature({
                params: {
                    svgString: resources,
                    operation: "engrave",
                    height: 20,
                },
            }),
            ...generateLidOrnaments(),
        ],
    });
    createDividers(resourceTopBox);
    // Stackable comes from the innerLid of the box below

    return resourceTopBox;
};
