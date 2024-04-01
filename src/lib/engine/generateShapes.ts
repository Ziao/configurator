import { BoxDefinition, GridFeatureType, PartType } from "../../types/boxDefinition.ts";
import { createWall } from "./parts/createWall.ts";
import { applyDrawSlot } from "./features/applyDrawSlot.ts";
import { applyGraphic } from "./features/applyGraphic.ts";
import { packShapes } from "./packShapes.ts";
import paper from "paper";

export const generateShapes = (box: BoxDefinition) => {
    for (const part of box.parts) {
        part.group = new paper.Group();
        switch (part.type) {
            case PartType.wall:
                createWall(box, part);
                break;
            default:
                console.log(`🚨 Part type ${part.type} not implemented`);
                break;
        }

        for (const feature of part.gridFeatures) {
            switch (feature.type) {
                case GridFeatureType.graphic:
                    applyGraphic(box, part, feature);
                    break;
                case GridFeatureType.drawSlot:
                    applyDrawSlot(box, part, feature);

                default:
                    console.log(`🚨 Feature type ${feature.type} not implemented`);
                    break;
            }
        }
    }

    packShapes(box);
};
