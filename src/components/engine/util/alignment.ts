import { Item, Point } from "paper";

// Aligns objectB's left edge to objectA's left edge
export function alignLeft(objectA: Item, objectB: Item): void {
    const deltaX = objectA.bounds.left - objectB.bounds.left;
    objectB.position = new Point(objectB.position.x + deltaX, objectB.position.y);
}

// Aligns objectB's right edge to objectA's right edge
export function alignRight(objectA: Item, objectB: Item): void {
    const deltaX = objectA.bounds.right - objectB.bounds.right;
    objectB.position = new Point(objectB.position.x + deltaX, objectB.position.y);
}

// Aligns objectB's top edge to objectA's top edge
export function alignTop(objectA: Item, objectB: Item): void {
    const deltaY = objectA.bounds.top - objectB.bounds.top;
    objectB.position = new Point(objectB.position.x, objectB.position.y + deltaY);
}

// Aligns objectB's bottom edge to objectA's bottom edge
export function alignBottom(objectA: Item, objectB: Item): void {
    const deltaY = objectA.bounds.bottom - objectB.bounds.bottom;
    objectB.position = new Point(objectB.position.x, objectB.position.y + deltaY);
}

// Centers objectB horizontally to objectA
export function alignCenterHorizontal(objectA: Item, objectB: Item): void {
    const deltaY = objectA.bounds.center.y - objectB.bounds.center.y;
    objectB.position = new Point(objectB.position.x, objectB.position.y + deltaY);
}

// Centers objectB vertically to objectA
export function alignCenterVertical(objectA: Item, objectB: Item): void {
    const deltaX = objectA.bounds.center.x - objectB.bounds.center.x;
    objectB.position = new Point(objectB.position.x + deltaX, objectB.position.y);
}
