import { createSynthProject } from "../../lib/wyrm/project/synthProject.ts";
import { createBase } from "./base.ts";

export const synthWidth = 180;
export const synthHeight = 25;
export const synthDepth = 10;

export const aira = createSynthProject({
    id: "aira",
    name: "Aira",
    description: "A stand for the Aira line of synths",
    sheetWidth: 390,
    trays: [
        {
            angle: 20,
            depth: synthDepth,
            height: synthHeight,
            width: synthWidth,
        },
        {
            angle: 50,
            depth: synthDepth,
            height: synthHeight,
            width: synthWidth,
        },
        {
            angle: 80,
            depth: synthDepth,
            height: synthHeight,
            width: synthWidth,
        },
    ],
});

createBase(aira);
