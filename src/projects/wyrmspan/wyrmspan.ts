import { createProject } from "../../lib/wyrm/project/project.ts";
import { createDragonBox } from "./dragonBox.ts";
import { createEggBox } from "./eggBox.ts";

// const boxWidth = 285;
// const boxDepth = 285;

export const wyrmspan = createProject({
    name: "WyrmSpan",
    description: "Inlays for the Wyrmspan game box",
    sheetWidth: 390,
});

// 4x4 box holding the dragon cards
createDragonBox(wyrmspan);
createEggBox(wyrmspan);
