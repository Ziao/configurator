import {
    createBackWall,
    createBottom,
    createBoxComponent,
    createFrontWall,
    createInnerLid,
    createLeftWall,
    createLid,
    createRightWall,
} from "../../lib/wyrm/component/createBoxComponent.ts";
import { createGraphicFeature } from "../../lib/wyrm/feature/graphicFeature.ts";
import { Project } from "../../lib/wyrm/project/project.ts";
import { generateLidOrnaments } from "./generateLidOrnaments.ts";
import eggs from "./graphics/egg.svg?raw";

// Dragons, 4x4 stacks
// Cards (with sleeve) are 60x90
// We pretend the material is 4mm thick, that should add enough margin on all sides
// We have about 3.5mm of clearance vertically, lets round it down to 3.4 because of the feet
// Gives you 24mm x 4 for the stack cards, 96mm total
export const createEggBox = (project: Project) => {
    const eggBox = createBoxComponent(project, {
        name: "Egg Box",
        materialThickness: 3,
        params: {
            width: 285 - 192, // Box width - width of dragon box
            depth: 132, // Same as dragon box
            height: 34, // Same as dragon box
            slotLength: 10,
        },
    });

    createBottom(eggBox, {});
    createLeftWall(eggBox);
    createRightWall(eggBox);
    createFrontWall(eggBox, {});
    createBackWall(eggBox, {});
    createLid(eggBox, {
        features: [
            createGraphicFeature({
                params: {
                    svgString: eggs,
                    operation: "engrave",
                    height: 20,
                },
            }),
            ...generateLidOrnaments(),
        ],
    });
    createInnerLid(eggBox, {});

    return eggBox;
};
