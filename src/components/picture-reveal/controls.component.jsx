import React from "react";
import "./picture-reveal.style.css"

function Controls({ onReset, onReveal, isGameOver, getRandomImage, currImage }) {
  return (
    <div className = "controls-div">
        <div>
        <button onClick={onReset}>Reveal All</button>
        {/* {isGameOver && <p>Congratulations! You've revealed the whole image.</p>} */}
        </div>
        <div>
        <button onClick={onReveal}>{isGameOver ? "Play Again" : "Play"}</button> {/* need to add functionality*/}
        </div>
        <div>
        <button onClick={getRandomImage}> {currImage ? <span style={{ textDecoration: 'line-through' }}>Start Game</span> : "Start Game"}</button>
        </div>
        
    </div>
  );
}

export default Controls;
