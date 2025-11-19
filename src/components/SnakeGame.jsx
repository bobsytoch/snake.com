import React, { useEffect, useRef, useState } from "react";
import {
    BOARD_SIZE,
    INITIAL_SNAKE,
    INITIAL_DIRECTION,
    FOOD_SCORE,
} from "../game/constants";
import { equalCells, getRandomCell } from "../game/logic";

export default function SnakeGame() {
    const gameRef = useRef({
        snake: [...INITIAL_SNAKE],
        direction: { ...INITIAL_DIRECTION },
        pendingDir: null,
        food: getRandomCell(INITIAL_SNAKE),
        running: true,
        gameOver: false,
        t0: Date.now(),
        time: 0,
        bestScore: Number(localStorage.getItem("snake-best") || 0),
    });

    const [, rerender] = useState(0);
    const update = () => rerender((x) => x + 1);

    // Keyboard
    useEffect(() => {
        const handler = (e) => {
            const k = e.key;
            let dir = null;
            if (k === "ArrowUp") dir = { x: 0, y: -1 };
            if (k === "ArrowDown") dir = { x: 0, y: 1 };
            if (k === "ArrowLeft") dir = { x: -1, y: 0 };
            if (k === "ArrowRight") dir = { x: 1, y: 0 };
            if (dir) gameRef.current.pendingDir = dir;
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, []);

    // Game loop
    useEffect(() => {
        const loop = setInterval(() => {
            const state = gameRef.current;
            if (!state.running || state.gameOver) return;

            let { snake, direction, pendingDir, food } = state;

            if (pendingDir) {
                const last = direction;
                if (last.x + pendingDir.x !== 0 || last.y + pendingDir.y !== 0)
                    direction = { ...pendingDir };
                state.direction = direction;
                state.pendingDir = null;
            }

            const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

            // Collisions
            if (
                head.x < 0 ||
                head.x >= BOARD_SIZE ||
                head.y < 0 ||
                head.y >= BOARD_SIZE ||
                snake.some((s) => equalCells(s, head))
            ) {
                state.running = false;
                state.gameOver = true;
                update();
                return;
            }

            const hasFood = equalCells(head, food);
            const newSnake = hasFood ? [head, ...snake] : [head, ...snake.slice(0, -1)];

            state.snake = newSnake;
            if (hasFood) state.food = getRandomCell(newSnake);

            const score = newSnake.length * FOOD_SCORE - FOOD_SCORE * INITIAL_SNAKE.length;
            if (score > state.bestScore) {
                state.bestScore = score;
                localStorage.setItem("snake-best", score);
            }

            state.time = Date.now() - state.t0;
            update();
        }, 130);

        return () => clearInterval(loop);
    }, []);

    const state = gameRef.current;
    const score = state.snake.length * FOOD_SCORE - FOOD_SCORE * INITIAL_SNAKE.length;

    const restart = () => {
        gameRef.current = {
            ...gameRef.current,
            snake: [...INITIAL_SNAKE],
            direction: { ...INITIAL_DIRECTION },
            pendingDir: null,
            food: getRandomCell(INITIAL_SNAKE),
            running: true,
            gameOver: false,
            time: 0,
            t0: Date.now(),
        };
        update();
    };

    // Render grid
    const cells = [];
    for (let y = 0; y < BOARD_SIZE; y++) {
        for (let x = 0; x < BOARD_SIZE; x++) {
            const isFood = equalCells(state.food, { x, y });
            const idx = state.snake.findIndex((s) => equalCells(s, { x, y }));
            const cls =
                idx === 0
                    ? "cell snake snake-head"
                    : idx > 0
                        ? "cell snake"
                        : isFood
                            ? "cell food"
                            : "cell";
            cells.push(<div key={`${x}-${y}`} className={cls} />);
        }
    }

    return (
        <div
            style={{
                maxWidth: "fit-content",
                padding: "20px",
                textAlign: "center",
                margin: "0 auto",
                background: "rgb(33 43 57 / 84%)"
            }}
        >
            <h2>snek!</h2>
            <div
                className="stats"
            >
                <div>Score: {score}</div>
                <div>Best: {state.bestScore}</div>
                <div>Time: {Math.floor(state.time / 1000)}s</div>
            </div>
            <div
                className="game-board"
                style={{
                    width: 400,
                    height: 400,
                    display: "grid",
                    gridTemplateColumns: `repeat(${BOARD_SIZE}, 1fr)`
                }}
            >
                {cells}
                {state.gameOver && (
                    <div className="gameover-modal">
                        <h2>Game Over</h2>
                        <p>Your score: {score}</p>
                        <button className="btn" onClick={restart}>
                            Restart
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
