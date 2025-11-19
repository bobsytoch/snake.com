import { BOARD_SIZE } from "./constants";


export function equalCells(a, b) {
    return a.x === b.x && a.y === b.y;
}


export function getRandomCell(snake) {
    while (true) {
        const pos = {
            x: Math.floor(Math.random() * BOARD_SIZE),
            y: Math.floor(Math.random() * BOARD_SIZE),
        };
        if (!snake.some((s) => equalCells(s, pos))) return pos;
    }
}
