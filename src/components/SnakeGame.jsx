import React from "react";
import { BOARD_SIZE } from "../game/constants";

export default function SnakeGame() {
    const cells = [];
    for (let y = 0; y < BOARD_SIZE; y++) {
        for (let x = 0; x < BOARD_SIZE; x++) {
            cells.push(<div key={`${x}-${y}`} className="cell" />);
        }
    }

    return (
        <div
            style={{
                maxWidth: "fit-content",
                padding: "20px",
                textAlign: "center",
                margin: "0 auto",
                background: "#b9b9b9ff",
            }}
        >
            <h2>snek!</h2>
            <div className="stats">
                <div>Score: —</div>
                <div>Best: —</div>
                <div>Time: —</div>
            </div>

            <div
                className="game-board"
                style={{
                    width: 400,
                    height: 400,
                    display: "grid",
                    gridTemplateColumns: `repeat(${BOARD_SIZE}, 1fr)`,
                }}
            >
                {cells}
            </div>
        </div>
    );
}
