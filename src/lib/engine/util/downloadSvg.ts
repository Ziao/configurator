import paper from "paper";

export const downloadSvg = (filename?: string) => {
    const svgString = paper.project.exportSVG({ asString: true }) as string;
    const blob = new Blob([svgString], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename ?? "file.svg";
    a.click();
    URL.revokeObjectURL(url);
};
