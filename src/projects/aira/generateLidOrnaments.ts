import { createGraphicFeature } from "../../lib/wyrm/feature/graphicFeature.ts";
import corner from "./graphics/corner.svg?raw";

export const generateLidOrnaments = () => {
    return [
        createGraphicFeature({
            params: {
                svgString: corner,
                operation: "engrave",
                alignment: "bottom-left",
                height: 40,
            },
        }),
        createGraphicFeature({
            params: {
                svgString: corner,
                operation: "engrave",
                alignment: "top-right",
                rotation: 180,
                height: 40,
            },
        }),
    ];
};
