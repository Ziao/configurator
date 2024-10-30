import { start } from "happy-dom/lib/PropertySymbol.d.ts.js";
import paper, { Color, Group, Path, Point, PointText } from "paper";
import { FormShape } from "../parts/dice/formShape.ts";

export const drawDice = (config: FormShape) => {
    console.log("Drawing dice");
    if (!paper.project) return;
    paper.project.clear();

    const outer = new Path.Circle(new Point(0, 0), config.outerRadius);
    const inner = new Path.Circle(new Point(0, 0), config.innerRadius);

    // Cut hole out of disk
    const disk = outer.subtract(inner);
    disk.strokeColor = new Color("red");

    // Clean up
    outer.remove();
    inner.remove();

    const rowOuterDiameter = config.outerRadius - config.outerPadding;
    const rowInnerDiameter = config.innerRadius + config.innerPadding;
    const rowHeight = (rowOuterDiameter - rowInnerDiameter - config.rowMargin * 2) / 3;

    const row1InnerDiameter = rowInnerDiameter;
    const row2InnerDiameter = row1InnerDiameter + rowHeight + config.rowMargin;
    const row3InnerDiameter = row2InnerDiameter + rowHeight + config.rowMargin;

    // Draw an extra circle on the inside of the numbers
    const innerCircle = new Path.Circle(new Point(0, 0), row1InnerDiameter - config.rowMargin);
    innerCircle.strokeColor = new Color("grey");

    drawRow(row1InnerDiameter, rowHeight, config.row1Count, config.rowMarginAngle);
    drawRow(row2InnerDiameter, rowHeight, config.row2Count, config.rowMarginAngle);
    drawRow(row3InnerDiameter, rowHeight, config.row3Count, config.rowMarginAngle);

    drawNumbers(row1InnerDiameter + rowHeight / 2, config.font, config.fontSize, config.row1Count);
    drawNumbers(row2InnerDiameter + rowHeight / 2, config.font, config.fontSize, config.row2Count);
    drawNumbers(row3InnerDiameter + rowHeight / 2, config.font, config.fontSize, config.row3Count);

    paper.view.center = disk.bounds.center;
};

const drawRow = (innerRadius: number, height: number, segments: number, paddingAngle: number) => {
    const group = new Group();

    const outerRadius = innerRadius + height;

    // Draw the row, segment by segment
    for (let i = 0; i < segments; i += 1) {
        const startAngle = i * (360 / segments) + paddingAngle / 2;
        const endAngle = (i + 1) * (360 / segments) - paddingAngle / 2;

        const segment = new Path();

        segment.moveTo(new Point({ length: outerRadius, angle: startAngle })); // top left
        segment.arcTo(
            new Point({ length: outerRadius, angle: startAngle + (endAngle - startAngle) / 2 }),
            new Point({ length: outerRadius, angle: endAngle }),
        );
        segment.lineTo(new Point({ length: innerRadius, angle: endAngle })); // bottom right
        segment.arcTo(
            new Point({ length: innerRadius, angle: endAngle - (endAngle - startAngle) / 2 }),
            new Point({ length: innerRadius, angle: startAngle }),
        );

        segment.closePath();
        segment.strokeColor = new Color("grey");
        segment.addTo(group);
    }

    return group;
};

const drawNumbers = (radius: number, font: string, fontSize: number, amount: number) => {
    const group = new Group();

    const numbers = Array.from({ length: amount }, (_, i) => i);

    // Shuffle the numbers
    for (let i = numbers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }

    for (let i = 0; i < amount; i += 1) {
        const angle = i * (360 / amount) + 360 / amount / 2;

        // const c = new Path.Circle(new Point({ length: radius, angle }), 4);
        // c.fillColor = new Color("red");
        // c.addTo(group);

        const center = new Point({ length: radius, angle });

        const text = new PointText({
            point: center, // inaccurate
            content: numbers[i].toString(),
            fillColor: new Color("black"),
            justification: "center",
            rotation: angle + 90,
            fontSize,
            font,
        });

        text.bounds.center = center; // actually fix center
        text.addTo(group);
    }

    return group;
};
