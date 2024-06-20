import { createProject } from "../../lib/wyrm/project/project.ts";
import { createBase } from "./base.ts";

// const boxWidth = 285;
// const boxDepth = 285;

// Each component occupies 60x60 mm, or multiples of that. The inner sizes can go fuck themselves.

export const deskbox = createProject({
    name: "DeskBox",
    description: "A modular desk organizer",
    sheetWidth: 390,
});

createBase(deskbox);
