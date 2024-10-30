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
import dk from "./graphics/DK.svg?raw";
import eye from "./graphics/eye.svg?raw";
// Dragons, 4x4 stacks
// Cards (with sleeve) are 60x90
// We pretend the material is 4mm thick, that should add enough margin on all sides
// We have about 3.5mm of clearance vertically, lets round it down to 3.4 because of the feet
// Gives you 24mm x 4 for the stack cards, 96mm total
export const createDiceBox = (project: Project) => {
    const diceBox = createBoxComponent(project, {
        name: "Egg Box",
        materialThickness: 3,
        params: {
            width: 70, // Box width - width of dragon box
            depth: 70, // Same as dragon box
            height: 35, // Same as dragon box
            slotLength: 10,
        },
    });

    createBottom(diceBox, {});
    createLeftWall(diceBox);
    createRightWall(diceBox);
    createFrontWall(diceBox, {});
    createBackWall(diceBox, {});
    createLid(diceBox, {
        features: [
            // createGraphicFeature({
            //     params: {
            //         svgString: eye,
            //         operation: "engrave",
            //         // height: 20,
            //         alignment: "center",
            //         fit: "contain",
            //         // scaleMultiplier: 2,
            //
            //     },
            // }),
            // ...generateLidOrnaments(),
        ],
    });
    createInnerLid(diceBox, {});

    return diceBox;
};
