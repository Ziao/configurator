import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import { FC, useEffect, useRef } from "react";
import { createBox } from "../../lib/engine/createBox.ts";
import { BoxDefinition } from "../../types/boxDefinition.ts";
import { Box, Button, chakra, Icon, Stack } from "@chakra-ui/react";
import paper from "paper";

interface BoxRendererProps {
    definition: BoxDefinition;
}
export const BoxRenderer: FC<BoxRendererProps> = ({ definition }) => {
    const canvasContainer = useRef<HTMLCanvasElement>(null);
    const canvas = useRef<HTMLCanvasElement>(null);
    const didSetup = useRef(false);

    useEffect(() => {
        if (didSetup.current) return;
        if (!canvas.current) return;

        paper.setup(canvas.current);
        // 1px = 1mm, which is is a DPI of 25.4
        paper.view.scale(72 / 25.4, new paper.Point(0, 0));
        paper.project.currentStyle.strokeScaling = false;
        didSetup.current = true;
        // canvas.current.setAttribute("adada", "123");
    }, []);

    useEffect(() => {
        paper.project.activeLayer.removeChildren();
        createBox(definition);
    }, [definition]);

    return (
        <Stack>
            {/*<canvas ref={canvas} />*/}
            <chakra.canvas w={"full"} h={"500px"} ref={canvas} />
            {/*<Box w={"full"} h={"500px"} ref={canvasContainer} />*/}
            <Button
                onClick={() => {
                    const svgString = paper.project.exportSVG({ asString: true }) as string;
                    // Download as svg file
                    const blob = new Blob([svgString], { type: "image/svg+xml" });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = "box.svg";
                    a.click();
                    URL.revokeObjectURL(url);
                }}
                leftIcon={<Icon as={ArrowDownTrayIcon} />}
            >
                Download SVG
            </Button>
        </Stack>
    );
};
