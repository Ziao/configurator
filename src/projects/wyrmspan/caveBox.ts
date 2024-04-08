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
import { generateLidOrnaments } from "./generateLidOrnaments.ts";
import caves from "./graphics/cave.svg?raw";

// Caves, 2x1 stacks
// CAVE cards (with sleeve) are 60x60
// We pretend the material is 4mm thick, that should add enough margin on all sides
// We have about 3.5mm of clearance vertically, lets round it down to 3.4 because of the feet
export const createCaveBox = (project: Project) => {
    const caveBox = createBoxComponent(project, {
        name: "Cave Box",
        materialThickness: 3,
        params: {
            width: 132, // 60 * 2 + 4 (material) * 3
            depth: 68, // 60 + 4 (material) * 2
            height: 34,
            slotLength: 10,
        },
    });

    createBottom(caveBox, {
        grid: createGrid({ width: 2, height: 1 }, caveBox),
    });
    createLeftWall(caveBox);
    createRightWall(caveBox);
    createFrontWall(caveBox, {
        grid: createGrid({ width: 2 }, caveBox),
        features: [createDrawslotFeature({ gridCell: [0, 0] }), createDrawslotFeature({ gridCell: [1, 0] })],
    });

    createBackWall(caveBox, {
        grid: createGrid({ width: 2 }, caveBox),
        features: [createDrawslotFeature({ gridCell: [0, 0] }), createDrawslotFeature({ gridCell: [1, 0] })],
    });

    createLid(caveBox, {
        features: [
            createGraphicFeature({
                params: {
                    svgString: caves,
                    operation: "engrave",
                    alignment: "center",
                    height: 20,
                },
            }),
            ...generateLidOrnaments(),
        ],
    });
    createInnerLid(caveBox, {});
    createDividers(caveBox);
    createCardAssist(caveBox);

    return caveBox;
};
