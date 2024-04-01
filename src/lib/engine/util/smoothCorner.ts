import paper from "paper";

/**
 * Smooths a corner of a path by adding two new points and handles
 * Modifies the path in place
 * Does not work with the first and last points of the path
 * @param path
 * @param cornerIndex
 * @param radius
 */

export const smoothCorner = (path: paper.Path, cornerIndex: number, radius: number) => {
    const cornerPoint = path.segments[cornerIndex].point;
    const prevPoint = path.segments[cornerIndex - 1].point;
    const nextPoint = path.segments[cornerIndex + 1].point;

    // Calculate the vectors from the corner to the points before and after
    const toPrev = prevPoint.subtract(cornerPoint);
    const toNext = nextPoint.subtract(cornerPoint);

    // Scale these vectors down to the specified radius
    toPrev.length = radius;
    toNext.length = radius;

    // Calculate the new points
    const prevNewPoint = cornerPoint.add(toPrev);
    const nextNewPoint = cornerPoint.add(toNext);

    // Remove the original sharp corner segment
    path.segments[cornerIndex].remove();

    // Insert the new points and handle to create the smooth corner
    const newSegment = path.insert(cornerIndex, prevNewPoint);
    newSegment.handleOut = toPrev.rotate(-180).normalize(radius);
    path.insert(cornerIndex + 1, nextNewPoint);
};
