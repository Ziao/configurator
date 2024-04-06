import paper from "paper";

/**
 * Round a segment of a path. Inserts a new segment and uses cubic bezier curves to round the segment.
 * Ideally used for 90 degree angles, but can be used for any angle.
 * @param path
 * @param segmentIndex
 * @param radius
 * @param handleLength
 */
export const roundSegment = (path: paper.Path, segmentIndex: number, radius: number, handleLength = 0.552284749831) => {
    if (segmentIndex < 1 || segmentIndex >= path.segments.length - 1) {
        throw new Error("Segment index out of bounds");
    }

    const segment = path.segments[segmentIndex];
    const segmentDirection = segment.point.subtract(path.segments[segmentIndex - 1].point).normalize();
    const nextSegmentDirection = path.segments[segmentIndex + 1].point.subtract(segment.point).normalize();
    const nextSegment = segment.clone();
    path.insert(segmentIndex + 1, nextSegment);

    segment.point = segment.point.subtract(segmentDirection.multiply(radius));
    nextSegment.point = nextSegment.point.add(nextSegmentDirection.multiply(radius));

    segment.handleOut = segmentDirection.multiply(handleLength * radius);
    nextSegment.handleIn = nextSegmentDirection.multiply(-handleLength * radius);
};
