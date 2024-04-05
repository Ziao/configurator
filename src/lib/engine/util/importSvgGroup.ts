import paper from "paper";

/**
 * Recursively collects and optionally flattens all paths within an imported SVG structure.
 * @param svgContent The SVG content to extract paths from.
 * @returns A group containing all paths found in the SVG content.
 */
export const importSvgGroup = (svgContent: string) => {
    const graphic = paper.project.importSVG(svgContent);

    const paths: paper.Item[] = []; // or Path | CompoundPath

    function recurse(currentItem: paper.Item): void {
        if (currentItem instanceof paper.Group) {
            // For groups, recurse into each child
            currentItem.children.forEach((child) => recurse(child));
        } else if (currentItem instanceof paper.Path || currentItem instanceof paper.CompoundPath) {
            // Found a path, add it to the array
            paths.push(currentItem);
        } else {
            // console.log(`extractAndFlattenPaths: currentItem is not a Path or Group: ${currentItem}`);
        }
    }

    recurse(graphic);

    const group = new paper.Group(paths);
    group.remove();

    return group;
};
