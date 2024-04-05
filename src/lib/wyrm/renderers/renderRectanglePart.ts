import { Color } from "../colors.ts";
import { Component } from "../component/types.ts";
import { RectanglePart } from "../part/types.ts";
import { Project } from "../project/project.ts";
import paper from "paper";

export const renderRectanglePart = (project: Project, component: Component, part: RectanglePart) => {
    console.log("    Rendering rectangle", part);

    const group = new paper.Group();

    // Create the rectangle
    let rectangle: paper.PathItem = new paper.Path.Rectangle({
        size: [part.width, part.height],
        strokeColor: Color.cut,
        strokeWidth: 1,
        radius: part.radius ?? 0,
    });

    // Subtract an inner part if needed
    if (part.insetOffset) {
        const inset = new paper.Path.Rectangle({
            size: [part.width - part.insetOffset * 2, part.height - part.insetOffset * 2],
            strokeColor: Color.cut,
            strokeWidth: 1,
            radius: Math.max((part.radius ?? 0) - part.insetOffset, 0),
        });

        inset.position = rectangle.position;

        const newPath = rectangle.subtract(inset);
        rectangle.replaceWith(newPath);
        rectangle = newPath;

        inset.remove();
    }

    group.addChild(rectangle);

    return group;
};
