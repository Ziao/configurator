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
import { createProject } from "../../lib/wyrm/project/project.ts";
import seahorseSvg from "./seahorse.svg?raw";

const boxWidth = 285;
const boxDepth = 285;

export const wyrmspan = createProject({
    name: "WyrmSpan",
    description: "Inlays for the Wyrmspan game box",
    sheetWidth: 300,
});

// Cave cards
const dragonBox = createBoxComponent(wyrmspan, {
    name: "Dragon Box",
    materialThickness: 3.4,
    params: {
        width: boxWidth,
        depth: 67,
        height: 40,
        slotLength: 10,
    },
});

createBottom(dragonBox, {
    grid: createGrid({ width: 3 }, dragonBox),
});
createLeftWall(dragonBox);
createRightWall(dragonBox);
createFrontWall(dragonBox, {
    grid: createGrid({ width: 3 }, dragonBox),
    features: [
        createDrawslotFeature({ gridCell: [0, 0] }),
        createDrawslotFeature({ gridCell: [1, 0] }),
        createDrawslotFeature({ gridCell: [2, 0] }),
    ],
});

createBackWall(dragonBox, {
    grid: createGrid({ width: 3 }, dragonBox),
    features: [
        createDrawslotFeature({ gridCell: [0, 0] }),
        createDrawslotFeature({ gridCell: [1, 0] }),
        createDrawslotFeature({ gridCell: [2, 0] }),
    ],
});

createLid(dragonBox, {
    //     features: [
    //         createGraphicFeature({
    //             params: {
    //                 svgString: seahorseSvg,
    //                 operation: "cut",
    //                 fit: "center",
    //                 height: 30,
    //                 offset: [-0.025, 0],
    //             },
    //         }),
    //     ],
});
createInnerLid(dragonBox);

createDividers(dragonBox);

createCardAssist(dragonBox);
