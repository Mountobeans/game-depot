import React from "react";
import "./picture-reveal.style.css"

function Controls({ onReset, onReveal, isGameOver, getRandomImage, currImage }) {
  return (
    <div className = "controls-div">
        <div>
        <button onClick={onReset}>Reset Game</button>
        {isGameOver && <p>Congratulations! You've revealed the whole image.</p>}
        </div>
        <div>
        <button onClick={onReveal}>Reveal Picture</button>
        </div>
        <div>
        <button onClick={getRandomImage}>{currImage ? "Get Picture" : "All Out"}</button>
        </div>
    </div>
  );
}

export default Controls;
