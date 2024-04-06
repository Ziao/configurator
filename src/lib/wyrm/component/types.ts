import { Part } from "../part/types.ts";

export enum ComponentType {
    box = "box",
}
export interface BaseComponent {
    id: string;
    name: string;
    type: ComponentType;
    params?: unknown;
    parts: Part[];
    materialThickness: number; // or move to project?
}

export type Component = BoxComponent;

interface BoxParams {
    width: number;
    depth: number;
    height: number;
    dividerHeight?: number; // if not set, uses height. bottom / closedTop thickness is automatically subtracted
    slotLength?: number;
    // hasLid: boolean;
    // hasClosedTop: boolean;
    // hasStackable: boolean;
    // hasCardAssist: boolean;
}

export interface BoxComponent extends BaseComponent {
    type: ComponentType.box;
    params: BoxParams;
}
