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
import tokens from "./graphics/coin.svg?raw";

// Dragons, 4x4 stacks
// Cards (with sleeve) are 60x90
// We pretend the material is 4mm thick, that should add enough margin on all sides
// We have about 3.5mm of clearance vertically, lets round it down to 3.4 because of the feet
// Gives you 24mm x 4 for the stack cards, 96mm total
export const createTokensTopBox = (project: Project) => {
    const tokensTopBox = createBoxComponent(project, {
        name: "TokensTop Box",
        materialThickness: 3,
        params: {
            width: 285 / 2, // Box width /2
            depth: 285 - 132 - 68, // leftover space
            height: 34 / 2, // Full height boxes are 34 + the lid so 37.
            slotLength: 10,
        },
    });

    createBottom(tokensTopBox, {
        grid: createGrid({ width: 2 }, tokensTopBox),
    });
    createLeftWall(tokensTopBox);
    createRightWall(tokensTopBox);
    createFrontWall(tokensTopBox, {});
    createBackWall(tokensTopBox, {});
    createInnerLid(tokensTopBox, {});
    createLid(tokensTopBox, {
        features: [
            createGraphicFeature({
                params: {
                    svgString: tokens,
                    operation: "engrave",
                    height: 20,
                },
            }),
            ...generateLidOrnaments(),
        ],
    });
    createDividers(tokensTopBox);
    // Stackable comes from the innerLid of the box below

    return tokensTopBox;
};
