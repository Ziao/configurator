import {
    createBackWall,
    createBottom,
    createBoxComponent,
    createCardAssist,
    createDividers,
    createFrontWall,
    createInnerLid,
    createLeftWall,
    createLid,
    createRightWall,
} from "../../lib/wyrm/component/createBoxComponent.ts";
import { createDrawslotFeature } from "../../lib/wyrm/feature/drawslotFeature.ts";
import { createGraphicFeature } from "../../lib/wyrm/feature/graphicFeature.ts";
import { createGrid } from "../../lib/wyrm/grid/grid.ts";
import { Project } from "../../lib/wyrm/project/project.ts";
import dragons from "./graphics/Dragons.svg?raw";

// Dragons, 4x4 stacks
// Cards (with sleeve) are 60x90
// We pretend the material is 4mm thick, that should add enough margin on all sides
// We have about 3.5mm of clearance vertically, lets round it down to 3.4 because of the feet
// Gives you 24mm x 4 for the stack cards, 96mm total
export const createDragonBox = (project: Project) => {
    const dragonBox = createBoxComponent(project, {
        name: "Dragon Box",
        materialThickness: 3,
        params: {
            width: 192, // 90 * 2 + 4 (material) * 3
            depth: 132, // 60 * 2 + 4 (material) * 3
            height: 34,
            slotLength: 10,
        },
    });

    createBottom(dragonBox, {
        grid: createGrid({ width: 2, height: 2 }, dragonBox),
    });
    createLeftWall(dragonBox);
    createRightWall(dragonBox);
    createFrontWall(dragonBox, {
        grid: createGrid({ width: 2 }, dragonBox),
        features: [createDrawslotFeature({ gridCell: [0, 0] }), createDrawslotFeature({ gridCell: [1, 0] })],
    });

    createBackWall(dragonBox, {
        grid: createGrid({ width: 2 }, dragonBox),
        features: [createDrawslotFeature({ gridCell: [0, 0] }), createDrawslotFeature({ gridCell: [1, 0] })],
    });

    createLid(dragonBox, {
        features: [
            createGraphicFeature({
                params: {
                    svgString: dragons,
                    operation: "engrave",
                    fit: "center",
                    height: 18,
                },
            }),
        ],
    });
    createInnerLid(dragonBox, {});
    createDividers(dragonBox);
    createCardAssist(dragonBox);
};
