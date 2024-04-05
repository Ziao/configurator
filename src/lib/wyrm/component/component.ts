import { DeepPartial } from "@chakra-ui/react";
import { BaseComponent, Component } from "./types.ts";

export const createComponent = (config: DeepPartial<Component> & Pick<Component, "type">): BaseComponent => {
    return {
        id: Math.random().toString(36).slice(2, 9),
        name: "New Component",
        materialThickness: config.materialThickness || 3,
        ...config,
        parts: [],
    };
};
