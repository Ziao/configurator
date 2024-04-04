import { Component } from "../component/types.ts";
import { RectanglePart } from "../part/types.ts";
import { Project } from "../project/project.ts";
import paper from "paper";

export const renderRectanglePart = (project: Project, component: Component, part: RectanglePart) => {
    console.log("    Rendering rectangle part", part);

    const group = new paper.Group();

    // Create the rectangle
    const rectangle = new paper.Path.Rectangle({
        size: [part.width, part.height],
        strokeColor: "red",
        strokeWidth: 1,
    });

    group.addChild(rectangle);

    return group;
};
