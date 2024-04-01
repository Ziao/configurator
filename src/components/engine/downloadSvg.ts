import paper from "paper";

export const downloadSvg = () => {
    const svgString = paper.project.exportSVG({ asString: true }) as string;
    // Download as svg file
    const blob = new Blob([svgString], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "box.svg";
    a.click();
    URL.revokeObjectURL(url);
};
