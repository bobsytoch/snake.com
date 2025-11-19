import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SnakeGame from "./components/SnakeGame";
import "./index.css";


export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/play" element={<SnakeGame />} />
            </Routes>
        </Router>
    );
}
