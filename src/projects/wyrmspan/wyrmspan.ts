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

export const wyrmspan = createProject({
    name: "WyrmSpan",
    description: "Inlays for the Wyrmspan game box",
    sheetWidth: 300,
});

// Cave cards
const caveBox = createBoxComponent(wyrmspan, {
    name: "Cave Box",
    materialThickness: 3.4,
    params: {
        width: 120,
        depth: 40,
        height: 40,
        slotLength: 10,
    },
});

createBottom(caveBox, {
    grid: createGrid({
        width: 3,
        height: 1,
    }),
});
createLeftWall(caveBox);
createRightWall(caveBox);
createFrontWall(caveBox, {
    grid: createGrid({
        width: 3,
        height: 1,
    }),
    features: [
        createDrawslotFeature({
            gridCell: [0, 0],
            params: {
                width: 10,
            },
        }),
        createGraphicFeature({
            gridCell: [2, 0],
            params: {
                svgString: seahorseSvg,
                operation: "score",
                fit: "contain",
                height: 20,
                // offset: [-0.025, 0],
            },
        }),
    ],
});
createBackWall(caveBox, {
    // features: [createDrawslotFeature({})],
});
// createLid(caveBox, {
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
// });
createInnerLid(caveBox);
// createCardAssist(caveBox);
createDividers(caveBox);
