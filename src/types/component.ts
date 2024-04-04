import { Part } from "./part.ts";

enum ComponentType {
    box = "box",
}

interface BoxParams {
    width: number;
    depth: number;
    height: number;
}

interface BaseComponent {
    name: string;
    type: ComponentType;
    params: never;
    parts: Part[];
    materialThickness: number; // or move to project?
}

export interface BoxComponent extends BaseComponent {
    type: ComponentType.box;
    params: BoxParams;
}

const x: BoxComponent = {
    width: 10,
    name: "box",
    type: ComponentType.box,
    params: {
        width: 10,
        height: 10,
        depth: 10,
    },
};

console.log(x);

export type Component = BoxComponent;
