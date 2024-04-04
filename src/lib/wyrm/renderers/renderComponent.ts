import { Component } from "../component/types.ts";
import { PartType } from "../part/types.ts";
import { Project } from "../project/project.ts";
import { renderRectanglePart } from "./renderRectanglePart.ts";

export const renderComponent = (project: Project, component: Component) => {
    console.log("Rendering component", component);

    const partGroups: paper.Group[] = [];

    component.parts.forEach((part) => {
        console.log("  Rendering part", part);

        switch (part.type) {
            case PartType.rectangle:
                partGroups.push(renderRectanglePart(project, component, part));

                break;
            default:
                console.warn("⚠️ Unknown part type", part);
        }
    });
};
