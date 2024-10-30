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
import objective from "./graphics/obj.svg?raw";

// Cards (with sleeve) are 60x90
// We pretend the material is 4mm thick, that should add enough margin on all sides
// We have about 3.5mm of clearance vertically, lets round it down to 3.4 because of the feet
// Gives you 24mm x 4 for the stack cards, 96mm total
export const createObjectiveBox = (project: Project) => {
    const objectiveBox = createBoxComponent(project, {
        name: "Objective Box",
        materialThickness: 3,
        params: {
            width: 55,
            depth: 68,
            height: 34,
            slotLength: 10,
        },
    });

    createBottom(objectiveBox, {});
    createLeftWall(objectiveBox);
    createRightWall(objectiveBox);
    createFrontWall(objectiveBox, {
        features: [createDrawslotFeature({ gridCell: [0, 0] }), createDrawslotFeature({ gridCell: [0, 0] })],
    });

    createBackWall(objectiveBox, {
        features: [createDrawslotFeature({ gridCell: [0, 0] }), createDrawslotFeature({ gridCell: [0, 0] })],
    });

    createLid(objectiveBox, {
        features: [
            createGraphicFeature({
                params: {
                    svgString: objective,
                    operation: "engrave",
                    height: 20,
                },
            }),
            ...generateLidOrnaments(),
        ],
    });
    createInnerLid(objectiveBox, {});
    createCardAssist(objectiveBox);

    return objectiveBox;
};
