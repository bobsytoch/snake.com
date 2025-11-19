import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            textAlign: "center",
        }}>
            <h1 style={{ fontSize: "3rem", color: "var(--color-primary)" }}>snek!</h1>
            <p style={{ marginTop: "12px", opacity: 0.8 }}>by the bobiboba organization</p>
            <Link to="/play">
                <button
                    style={{
                        padding: "14px 32px",
                        marginTop: "28px",
                        background: "var(--color-primary)",
                        border: "none",
                        borderRadius: "10px",
                        fontSize: "1.2rem",
                        color: "white",
                        cursor: "pointer",
                    }}
                >
                    Play
                </button>
            </Link>
        </div>
    );
}
