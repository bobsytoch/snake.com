export function equalCells(a, b) {
    return a && b && a.x === b.x && a.y === b.y;
}

export function getRandomCell() {
    // deterministic placeholder for previews
    return { x: 0, y: 0 };
}
