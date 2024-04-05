import {
    createBackWall,
    createBottom,
    createBoxComponent,
    createCardAssist,
    createClosedTop,
    createFrontWall,
    createInnerLid,
    createLeftWall,
    createLid,
    createRightWall,
    createStackable,
} from "../../lib/wyrm/component/createBoxComponent.ts";
import { GraphicFeature } from "../../lib/wyrm/feature/feature.ts";
import { createGrid } from "../../lib/wyrm/grid/grid.ts";
import { createProject } from "../../lib/wyrm/project/project.ts";
import seahorseSvg from "./seahorse.svg?raw";

export const wyrmspan = createProject({
    name: "WyrmSpan",
    description: "Inlays for the Wyrmspan game box",
    sheetWidth: 300,
});

const caveBox = createBoxComponent({
    name: "Cave Box",
    params: {
        width: 80,
        depth: 80,
        height: 40,
    },
});

createBottom(caveBox);
// createClosedTop(caveBox);
createLeftWall(caveBox);
createRightWall(caveBox);
createFrontWall(caveBox);
createBackWall(caveBox);
// createStackable(caveBox);
createLid(caveBox, {
    // grid: createGrid({
    //     width: 2,
    // }),
    features: [
        {
            type: "graphic",
            gridCell: [0, 0],
            params: {
                svgString: seahorseSvg,
                operation: "cut",
                fit: "center",
                height: 50,
                offset: [-0.05, 0],
            },
        } as GraphicFeature,
    ],
});
createInnerLid(caveBox);
createCardAssist(caveBox);

wyrmspan.components.push(caveBox);
