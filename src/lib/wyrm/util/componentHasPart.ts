import { Component } from "../component/types.ts";
import { BasePart } from "../part/types.ts";

export const componentHasPart = (component: Component, partId: string) => {
    return component.parts.some((part) => part.id === partId);
};

type componentGetPartOverload = {
    <T extends BasePart>(component: Component, partId: string, throwIfNotFound: true): T;
    <T extends BasePart>(component: Component, partId: string, throwIfNotFound?: boolean): T | undefined;
};

export const componentGetPart: componentGetPartOverload = <T extends BasePart>(
    component: Component,
    partId: string,
    throwIfNotFound = false,
) => {
    const part = component.parts.find((part) => part.id === partId) as T | undefined;
    if (throwIfNotFound && !part) {
        throw new Error(`Part with id ${partId} not found in component ${component.name}`);
    }
    return part;
};
