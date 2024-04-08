import {
    createBackWall,
    createBottom,
    createBoxComponent,
    createCardAssist,
    createFrontWall,
    createInnerLid,
    createLeftWall,
    createLid,
    createRightWall,
} from "../../lib/wyrm/component/createBoxComponent.ts";
import { createDrawslotFeature } from "../../lib/wyrm/feature/drawslotFeature.ts";
import { createGraphicFeature } from "../../lib/wyrm/feature/graphicFeature.ts";
import { Project } from "../../lib/wyrm/project/project.ts";
import { generateLidOrnaments } from "./generateLidOrnaments.ts";
import misc from "./graphics/misc.svg?raw";

// Miscs, 4x4 stacks
// Cards (with sleeve) are 60x90
// We pretend the material is 4mm thick, that should add enough margin on all sides
// We have about 3.5mm of clearance vertically, lets round it down to 3.4 because of the feet
// Gives you 24mm x 4 for the stack cards, 96mm total
export const createMiscBox = (project: Project) => {
    const miscBox = createBoxComponent(project, {
        name: "Misc Box",
        materialThickness: 3,
        params: {
            width: 98, // 90 + 4 (material) * 2
            depth: 68, // 60  + 4 (material) * 2
            height: 34,
            slotLength: 10,
        },
    });

    createBottom(miscBox, {});
    createLeftWall(miscBox);
    createRightWall(miscBox);
    createFrontWall(miscBox, {
        features: [createDrawslotFeature({ gridCell: [0, 0] }), createDrawslotFeature({ gridCell: [1, 0] })],
    });

    createBackWall(miscBox, {
        features: [createDrawslotFeature({ gridCell: [0, 0] }), createDrawslotFeature({ gridCell: [1, 0] })],
    });

    createLid(miscBox, {
        features: [
            createGraphicFeature({
                params: {
                    svgString: misc,
                    operation: "engrave",
                    height: 20,
                },
            }),
            ...generateLidOrnaments(),
        ],
    });
    createInnerLid(miscBox, {});
    createCardAssist(miscBox);
    return miscBox;
};
