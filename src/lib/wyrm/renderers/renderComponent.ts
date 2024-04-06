import paper from "paper";
import { punchSlots } from "../../engine/punchSlotsNew.ts";
import { Component } from "../component/types.ts";
import { renderDrawslotFeature } from "../feature/drawslotFeature.ts";
import { FeatureType } from "../feature/feature.ts";
import { renderGraphicFeature } from "../feature/graphicFeature.ts";
import { Part, PartType } from "../part/types.ts";
import { Project } from "../project/project.ts";
import { packParts } from "../util/packParts.ts";
import { renderRectanglePart } from "./renderRectanglePart.ts";

export const renderComponent = (project: Project, component: Component) => {
    console.log("Rendering component", component);

    const partGroups = component.parts.map((part) => {
        console.log("  Rendering part", part);

        // Render base part shape
        const group = renderBaseShape(project, component, part);

        // Apply features
        renderFeatures(component, part, group);

        // Punch slots
        renderSlots(part, group);

        return group;
    });

    console.log("Packing parts ");
    packParts(partGroups, project.sheetWidth);
};

const renderBaseShape = (project: Project, component: Component, part: Part) => {
    let group: paper.Group;

    switch (part.type) {
        case PartType.rectangle:
            group = renderRectanglePart(project, component, part);
            break;
        default:
            throw new Error(`⚠️ Unknown part type: ${part.type}`);
    }

    return group;
};

const renderSlots = (part: Part, group: paper.Group) => {
    part.slots.forEach((slot) => {
        console.log("    Punching slots", slot);
        punchSlots({
            path: group.children[0] as paper.PathItem,
            start: new paper.Point(slot.start),
            end: new paper.Point(slot.end),
            mode: slot.even ? "even" : "odd",
            thickness: slot.thickness,
            slotLength: slot.length,
            amount: slot.amount,
        });
    });
};

const renderFeatures = (component: Component, part: Part, group: paper.Group) => {
    part.features.forEach((feature) => {
        console.log("    Applying feature", feature);
        switch (feature.type) {
            case FeatureType.graphic:
                renderGraphicFeature(component, part, feature, group);
                break;
            case FeatureType.drawSlot:
                // console.warn("    Skipping drawslot feature");
                renderDrawslotFeature(component, part, feature, group);
                break;
            default:
                // @ts-ignore
                throw new Error(`⚠️ Unknown feature type: ${feature.type}`);
        }
    });
};
