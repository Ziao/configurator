import { Component } from "../component/types.ts";

export interface Project {
    id: string;
    name: string;
    description?: string;
    sheetWidth: number;
    components: Component[];
}

export const createProject = (config: Partial<Project>): Project => {
    return {
        id: config.id || Math.random().toString(36).slice(2, 9),
        name: config.name || "New Project",
        description: config.description,
        sheetWidth: config.sheetWidth || 0,
        components: config.components || [],
    };
};
