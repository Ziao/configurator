import { createProject, Project } from "./project.ts";

interface Tray {
    /**
     * The angle of the synth tray
     * 0 is horizontal, 90 is vertical
     */
    angle: number;
    width: number;
    height: number;
    depth: number;
}

export interface SynthProject extends Project {
    trays: Tray[];
}

export const createSynthProject = (config: Partial<SynthProject>): SynthProject => {
    const project = createProject(config);
    return {
        ...project,
        trays: config.trays || [],
    };
};
