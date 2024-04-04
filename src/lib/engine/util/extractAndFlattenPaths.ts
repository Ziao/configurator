// import paper from "paper";
//
// /**
//  * Recursively collects and optionally flattens all paths within an imported SVG structure.
//  * @param item The root item to start searching from (e.g., the result of project.importSVG).
//  * @param flatten Whether to flatten the structure, moving all paths to the root layer.
//  * @returns An array of Path items extracted from the SVG.
//  */
// export const extractAndFlattenPaths = (item: paper.Item, flatten: boolean = false): paper.Path[] => {
//     const paths: paper.Path[] = [];
//
//     function recurse(currentItem: paper.Item): void {
//         if (currentItem instanceof paper.Group) {
//             // For groups, recurse into each child
//             currentItem.children.forEach((child) => recurse(child));
//             if (flatten) {
//                 // Optionally, remove the group to flatten the structure
//                 currentItem.remove();
//             }
//         } else if (currentItem instanceof paper.Path || currentItem instanceof paper.CompoundPath) {
//             // Found a path, add it to the array
//             paths.push(currentItem);
//             if (flatten) {
//                 // Move the path to the root layer to flatten the structure
//                 paper.project.activeLayer.addChild(currentItem);
//             }
//         } else {
//             // console.log(`extractAndFlattenPaths: currentItem is not a Path or Group: ${currentItem}`);
//         }
//     }
//
//     recurse(item);
//
//     return paths;
// };
