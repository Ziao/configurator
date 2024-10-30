import paper from "paper";
import { useEffect, useRef } from "react";

export const usePaper = (canvas: HTMLCanvasElement | null) => {
    const didSetup = useRef(false);

    useEffect(() => {
        if (didSetup.current) return;
        if (!canvas) return;

        console.log("Setting up paper.js");

        paper.setup(canvas);
        // paper.view.scale(zoomMultiplier, new paper.Point(0, 0));
        // Ensure that strokes are hairlines, regardless of zoom level
        paper.project.currentStyle.strokeScaling = true;

        // Ensure that 1px = 1mm
        const scaleFactor = 72 / 25.4;
        paper.project.view.scale(scaleFactor, new paper.Point(0, 0));
        paper.project.currentStyle.strokeWidth = 0.5;

        didSetup.current = true;
        return () => {
            console.log("Cleaning up paper.js");
            if (paper.project) paper.project.remove();
        };
    }, [canvas]);
};

export const setupPaper = (canvas: HTMLCanvasElement) => {
    console.log("Setting up paper.js");

    paper.setup(canvas);
    // paper.view.scale(zoomMultiplier, new paper.Point(0, 0));
    // Ensure that strokes are hairlines, regardless of zoom level
    paper.project.currentStyle.strokeScaling = true;

    // Ensure that 1px = 1mm
    const scaleFactor = 72 / 25.4;
    paper.project.view.scale(scaleFactor, new paper.Point(0, 0));
    paper.project.currentStyle.strokeWidth = 0.5;
};
