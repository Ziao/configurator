import { createBoxComponent } from "../../lib/wyrm/component/createBoxComponent.ts";
import { GraphicFeature } from "../../lib/wyrm/feature/feature.ts";
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
        depth: 40,
        height: 40,
        hasLid: true,
        hasClosedTop: true,
        hasCardAssist: true,
        hasStackable: true,
    },
});

const lid = caveBox.parts.find((p) => p.id === "lid")!;

// todo: createFeature?
lid.features.push({
    type: "graphic",
    gridCell: [0, 0],
    params: {
        svgString: seahorseSvg,
        operation: "cut",
        fit: "center",
        height: 20,
    },
} as GraphicFeature);

wyrmspan.components.push(caveBox);
