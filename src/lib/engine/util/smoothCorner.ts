// import paper from "paper";
//
// /**
//  * Smooths a corner of a path by adding two new points and handles
//  * Modifies the path in place
//  * Does not work with the first and last points of the path
//  * @param path
//  * @param cornerIndex
//  * @param radius
//  */
//
// export const smoothCorner = (path: paper.Path, cornerIndex: number, radius: number) => {
//     const cornerPoint = path.segments[cornerIndex].point;
//     const prevPoint = path.segments[cornerIndex - 1].point;
//     const nextPoint = path.segments[cornerIndex + 1].point;
//
//     // Calculate the vectors from the corner to the points before and after
//     const toPrev = prevPoint.subtract(cornerPoint);
//     const toNext = nextPoint.subtract(cornerPoint);
//
//     // Scale these vectors down to the specified radius
//     toPrev.length = radius;
//     toNext.length = radius;
//
//     // Calculate the new points
//     const prevNewPoint = cornerPoint.add(toPrev);
//     const nextNewPoint = cornerPoint.add(toNext);
//
//     // Remove the original sharp corner segment
//     path.segments[cornerIndex].remove();
//
//     // Insert the new points and handle to create the smooth corner
//     const newSegment = path.insert(cornerIndex, prevNewPoint);
//     newSegment.handleOut = toPrev.rotate(-180, [0.5, 0.5]).normalize(radius);
//     path.insert(cornerIndex + 1, nextNewPoint);
// };
//
// // export const addRoundedCorner = (path: paper.Path, radius: number, cornerIndex: number): void => {
// //     if (path.segments.length < 4) {
// //         console.error("The path does not have enough segments to round a corner.");
// //         return;
// //     }
// //
// //     if (cornerIndex < 0 || cornerIndex >= path.segments.length) {
// //         console.error("Invalid cornerIndex");
// //         return;
// //     }
// //
// //     const prevIndex = (cornerIndex - 1 + path.segments.length) % path.segments.length;
// //     const nextIndex = (cornerIndex + 1) % path.segments.length;
// //     const corner = path.segments[cornerIndex].point;
// //     const prevCorner = path.segments[prevIndex].point;
// //     const nextCorner = path.segments[nextIndex].point;
// //
// //     // Directions from the corner to the adjacent points, normalized and scaled
// //     const toPrev = prevCorner.subtract(corner).normalize().multiply(radius);
// //     const toNext = nextCorner.subtract(corner).normalize().multiply(radius);
// //
// //     // New start and end points for the arc, moved inside the original shape
// //     const arcStart = corner.add(toPrev);
// //     const arcEnd = corner.add(toNext);
// //
// //     // Calculate vectors perpendicular to the sides for the control points
// //     const handleVector = toNext.rotate(-90).normalize((radius * 4) / 3); // Magic factor for circular arc approximation
// //
// //     // Remove the corner point
// //     path.segments[cornerIndex].remove();
// //
// //     // Insert new segments for the arc
// //     path.insert(cornerIndex, new paper.Segment(arcStart, null, handleVector));
// //     path.insert(cornerIndex + 1, new paper.Segment(arcEnd, handleVector.rotate(180), null));
// // };
//
// export function roundPathCorner(path: paper.Path, segmentIndex: number, radius: number): void {
//     if (path.segments.length < 3) {
//         console.error("Path must have at least 3 segments.");
//         return;
//     }
//
//     // Ensure the segment index is within bounds
//     const index = segmentIndex % path.segments.length;
//     const prevIndex = (index - 1 + path.segments.length) % path.segments.length;
//     const nextIndex = (index + 1) % path.segments.length;
//
//     // Get the points
//     const point = path.segments[index].point;
//     const prevPoint = path.segments[prevIndex].point;
//     const nextPoint = path.segments[nextIndex].point;
//
//     // Calculate vectors from the corner to the previous and next points
//     const toPrev = prevPoint.subtract(point).normalize().multiply(radius);
//     const toNext = nextPoint.subtract(point).normalize().multiply(radius);
//
//     // Calculate the new points for the arc
//     const arcStart = point.subtract(toPrev);
//     const arcEnd = point.subtract(toNext);
//
//     // Remove the original corner point
//     path.segments[index].remove();
//
//     // Calculate the through point for the arc to make it smooth
//     const throughPoint = arcStart.add(arcEnd).divide(2);
//
//     // Insert the arc into the path
//     const startIndex = path.segments.findIndex((seg) => seg.point.equals(arcStart));
//     path.insert(startIndex + 1, throughPoint);
//     path.insert(startIndex + 2, arcEnd);
//
//     // Smooth the inserted points to create a rounded corner
//     // path.segments[startIndex + 1].smooth({ type: "continuous" });
// }
//
// export function drawArcFromRadiusAndAngle(path: paper.Path, radius: number, angle: number) {
//     // Convert angle from degrees to radians for trigonometric functions
//     let angleRadians = angle * (Math.PI / 180);
//
//     // Calculate the offset for the endpoint based on the radius and angle
//     let offsetX = radius * Math.cos(angleRadians);
//     let offsetY = radius * Math.sin(angleRadians);
//
//     // Assuming a simple case where the arc starts going rightward from the starting point
//     // Calculate the end point of the arc
//     let endPoint = new paper.Point(path.lastSegment.point.x + offsetX, path.lastSegment.point.y - offsetY);
//
//     // For a smooth arc, calculate a through point halfway through the arc
//     // This simplification assumes a uniform curvature, which is true for circular arcs
//     let throughPointX = radius * Math.cos(angleRadians / 2);
//     let throughPointY = radius * Math.sin(angleRadians / 2);
//     let throughPoint = new paper.Point(
//         path.lastSegment.point.x + throughPointX,
//         path.lastSegment.point.y - throughPointY,
//     );
//
//     // Draw the arc
//     path.arcTo(throughPoint, endPoint);
// }
