import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import { FC, useEffect, useRef } from "react";
import { createBox } from "../../lib/engine/createBox.ts";
import { BoxDefinition } from "../../types/boxDefinition.ts";
import { AspectRatio, Box, Button, chakra, Icon, Stack } from "@chakra-ui/react";
import paper from "paper";
import { downloadSvg } from "./downloadSvg.ts";
import { generateShapes } from "./generateShapes.ts";

// 1px = 1mm, which is is a DPI of 25.4
const zoomMultiplier = 72 / 25.4;

interface BoxRendererProps {
    definition: BoxDefinition;
}
export const BoxRenderer: FC<BoxRendererProps> = ({ definition }) => {
    const canvas = useRef<HTMLCanvasElement>(null);
    const didSetup = useRef(false);

    useEffect(() => {
        if (didSetup.current) return;
        if (!canvas.current) return;

        paper.setup(canvas.current);
        paper.view.scale(zoomMultiplier, new paper.Point(0, 0));
        paper.project.currentStyle.strokeScaling = false;
        didSetup.current = true;
    }, []);

    useEffect(() => {
        paper.project.activeLayer.removeChildren();
        generateShapes(definition);
    }, [definition]);

    return (
        <Stack>
            <Box overflow={"scroll"} h={"500px"}>
                <chakra.canvas w={`${definition.maxPackWidth * zoomMultiplier}px`} h={"500"} ref={canvas} />
            </Box>
            <Button colorScheme={"teal"} onClick={() => downloadSvg()} leftIcon={<Icon as={ArrowDownTrayIcon} />}>
                Download SVG
            </Button>
        </Stack>
    );
};
