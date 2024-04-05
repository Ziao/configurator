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
import { createProject } from "../../lib/wyrm/project/project.ts";
import seahorseSvg from "./seahorse.svg?raw";

export const wyrmspan = createProject({
    name: "WyrmSpan",
    description: "Inlays for the Wyrmspan game box",
    sheetWidth: 300,
});

// Cave cards
const caveBox = createBoxComponent(wyrmspan, {
    name: "Cave Box",
    materialThickness: 3.3,
    params: {
        width: 80,
        depth: 80,
        height: 40,
        slotLength: 10,
    },
});

createBottom(caveBox);
createLeftWall(caveBox);
createRightWall(caveBox);
createFrontWall(caveBox, {
    features: [createDrawslotFeature({})],
});
createBackWall(caveBox, {
    features: [createDrawslotFeature({})],
});
createLid(caveBox, {
    features: [
        createGraphicFeature({
            params: {
                svgString: seahorseSvg,
                operation: "cut",
                fit: "center",
                height: 30,
                offset: [-0.025, 0],
            },
        }),
    ],
});
createInnerLid(caveBox);
createCardAssist(caveBox);
