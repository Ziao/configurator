import { Project } from "../lib/wyrm/project/project.ts";
import { aira } from "./aira/aira.ts";
import { deskbox } from "./deskbox";
import { wyrmspan } from "./wyrmspan/wyrmspan.ts";

export const projects: Project[] = [deskbox, wyrmspan, aira];
