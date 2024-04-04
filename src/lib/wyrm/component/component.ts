import { BaseComponent, Component } from "./types.ts";

export const createComponent = (config: Partial<Component> & Pick<Component, "type">): BaseComponent => {
    return {
        id: config.id || Math.random().toString(36).slice(2, 9),
        name: config.name || "New Component",
        parts: config.parts || [],
        materialThickness: config.materialThickness || 3,
        ...config,
    };
};
