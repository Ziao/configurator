import paper, { Item, Path, Rectangle } from "paper";

/**
 * Scales and crops the source object to cover the target object's area.
 * @param source The source Paper.js object to fit and crop.
 * @param target The target Paper.js object to cover.
 * @param padding Optional padding around the target area. Defaults to 0.
 */
export function fitCover(source: paper.ItemPath, target: Item, padding: number = 0): void {
    // Calculate the target bounds considering padding
    const targetBounds = target.bounds.clone().expand(-padding * 2);

    // Determine the scale needed to cover the target area
    const scale = Math.max(targetBounds.width / source.bounds.width, targetBounds.height / source.bounds.height);
    source.scale(scale);

    // Center the source over the target
    source.position = targetBounds.center;

    // Create a rectangle to represent the target area (including padding)
    const croppingArea = new Path.Rectangle(targetBounds);
    croppingArea.fillColor = "black"; // Visual representation (optional)

    // Crop the source by intersecting it with the cropping area
    const cropped = source.intersect(croppingArea);

    // Replace the original source with the cropped version
    source.replaceWith(cropped);

    // Clean up: remove the temporary cropping area path
    croppingArea.remove();
}

/**
 * Fits the source object within the target object's area, ensuring the source is fully visible.
 * @param {Item} source The source Paper.js object to fit.
 * @param {Item} target The target Paper.js object to contain.
 * @param {number} padding Optional padding around the target area.
 */
export function fitContain(source: paper.Item, target: paper.Item, padding: number = 0): void {
    const targetBounds = target.bounds.clone().expand(-padding * 2);
    const scale = Math.min(targetBounds.width / source.bounds.width, targetBounds.height / source.bounds.height);

    source.scale(scale);
    source.position = targetBounds.center;
}
