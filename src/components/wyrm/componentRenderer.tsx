import { Box, Button, chakra, Icon, Stack } from "@chakra-ui/react";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import paper from "paper";
import { FC, useEffect, useRef } from "react";
import { downloadSvg } from "../../lib/engine/util/downloadSvg.ts";
import { Component } from "../../lib/wyrm/component/types.ts";
import { roundingTest } from "../../lib/wyrm/feature/drawslotFeature.ts";
import { Project } from "../../lib/wyrm/project/project.ts";
import { renderComponent } from "../../lib/wyrm/renderers/renderComponent.ts";

// 1px = 1mm, which is is a DPI of 25.4
const zoomMultiplier = 72 / 25.4;
// const zoomMultiplier = 1;

interface ComponentRendererProps {
    project: Project;
    component: Component;
}
export const ComponentRenderer: FC<ComponentRendererProps> = ({ project, component }) => {
    const canvas = useRef<HTMLCanvasElement>(null);
    const didSetup = useRef(false);

    useEffect(() => {
        if (didSetup.current) return;
        if (!canvas.current) return;

        paper.setup(canvas.current);
        paper.view.scale(zoomMultiplier, new paper.Point(0, 0));
        // Ensure that strokes are hairlines, regardless of zoom level
        paper.project.currentStyle.strokeScaling = true;
        didSetup.current = true;
    }, []);

    useEffect(() => {
        paper.view.viewSize = new paper.Size(project.sheetWidth * zoomMultiplier, 5000);
        paper.project.activeLayer.removeChildren();
        renderComponent(project, component);
        // roundingTest();
    }, [project, component]);

    return (
        <Stack>
            <Box overflow={"scroll"} h={"500px"}>
                <chakra.canvas ref={canvas} />
            </Box>
            <Button colorScheme={"teal"} onClick={() => downloadSvg()} leftIcon={<Icon as={ArrowDownTrayIcon} />}>
                Download SVG
            </Button>
        </Stack>
    );
};
