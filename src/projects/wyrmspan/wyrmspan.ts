import { createProject } from "../../lib/wyrm/project/project.ts";
import { createCaveBox } from "./caveBox.ts";
import { createDragonBox } from "./dragonBox.ts";
import { createEggBox } from "./eggBox.ts";
import { createResourceTopBox } from "./resourceTopBox.ts";
import { createResourceBottomBox } from "./resourceBottomBox.ts";
import { createMiscBox } from "./miscBox.ts";
import { createObjectiveBox } from "./objectiveBox.ts";
import { createTokensBottomBox } from "./tokensBottomBox.ts";
import { createTokensTopBox } from "./tokensTopBox.ts";

// const boxWidth = 285;
// const boxDepth = 285;

export const wyrmspan = createProject({
    id: "wyrmspan",
    name: "WyrmSpan",
    description: "Inlays for the Wyrmspan game box",
    sheetWidth: 390,
});

// 4x4 box holding the dragon cards
createResourceTopBox(wyrmspan);
createResourceBottomBox(wyrmspan);
createTokensTopBox(wyrmspan);
createTokensBottomBox(wyrmspan);
createDragonBox(wyrmspan);
createEggBox(wyrmspan);
createMiscBox(wyrmspan);
createCaveBox(wyrmspan);
createObjectiveBox(wyrmspan);
