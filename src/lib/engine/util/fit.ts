import paper from "paper";
import { alignCenterHorizontal, alignCenterVertical } from "./alignment.ts";

/**
 * Scales and crops the source object to cover the target object's area.
 * @param source The source Paper.js object to fit and crop.
 * @param target The target Paper.js object to cover.
 * @param padding Optional padding around the target area. Defaults to 0.
 * @param returnNew Optional flag to return a new object instead of modifying the source. Defaults to false.
 * @todo: conver to object params
 */
export function fitCover(
    source: paper.Item,
    target: paper.Item,
    padding: number = 0,
    returnNew = false,
    scale?: number,
) {
    // Calculate the target bounds considering padding
    const targetBounds = target.bounds.clone().expand(-padding * 2);

    // Determine the scale needed to cover the target area
    const idealScale = Math.max(targetBounds.width / source.bounds.width, targetBounds.height / source.bounds.height);
    source.scale(idealScale);
    source.scale(scale ?? 1);

    // Center the source over the target
    source.position = targetBounds.center;

    // Create a rectangle to represent the target area (including padding)
    const croppingArea = new paper.Path.Rectangle(targetBounds);
    // croppingArea.fillColor = "black"; // Visual representation (optional)

    // Crop the source by intersecting it with the cropping area
    const cropped = source.intersect(croppingArea) as paper.Item;
    // cropped.fillColor = "red"; // Visual representation (optional)

    // Clean up: remove the temporary cropping area path
    croppingArea.remove();

    if (returnNew) {
        // cropped.position = source.bounds.center;
        // alignCenterVertical(target, cropped);
        // alignCenterHorizontal(target, cropped);
        return cropped;
    } else {
        source.replaceWith(cropped);
    }
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
