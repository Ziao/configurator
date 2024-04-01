import paper from "paper";
import { BoxDefinition, GridFeatureType, PartType } from "../../types/boxDefinition.ts";
import { applyDrawSlot } from "./features/applyDrawSlot.ts";
import { applyGraphic } from "./features/applyGraphic.ts";
import { packShapes } from "./packShapes.ts";
import { createBottomShape } from "./parts/createBottomShape.ts";
import { createBottomStackableShape } from "./parts/createBottomStackableShape.ts";
import { createCardAssistShape } from "./parts/createCardAssistShape.ts";
import { createLidBottomShape } from "./parts/createLidBottomShape.ts";
import { createLidTopShape } from "./parts/createLidTopShape.ts";
import { createWallShape } from "./parts/createWallShape.ts";

export const generateShapes = (box: BoxDefinition) => {
    for (const part of box.parts) {
        part.group = new paper.Group();
        switch (part.type) {
            case PartType.wall:
                createWallShape(box, part);
                break;
            case PartType.bottom:
                createBottomShape(box, part);
                break;
            case PartType.bottomStackable:
                createBottomStackableShape(box, part);
                break;
            case PartType.lidTop:
                createLidTopShape(box, part);
                break;
            case PartType.lidBottom:
                createLidBottomShape(box, part);
                break;

            case PartType.cardAssist:
                createCardAssistShape(box, part);
                break;

            default:
                console.log(`🚨 Part type ${part.type} not implemented`);
                break;
        }

        for (const feature of part.gridFeatures) {
            if (!feature.enabled) continue;

            switch (feature.type) {
                case GridFeatureType.graphic:
                    applyGraphic(box, part, feature);
                    break;
                case GridFeatureType.drawSlot:
                    applyDrawSlot(box, part, feature);
                    break;
                default:
                    console.log(`🚨 Feature type ${feature.type} not implemented`);
                    break;
            }
        }
    }

    packShapes(box);
};
