import React, {useState, useEffect} from "react";
import crown from "../../assets/images/king-tub/crown.jpg"


function ImageReveal({ rows, cols, revealedSquares, currImage, imageArr}) {
  const totalSquares = rows * cols;

  const squares = [];

  console.log(imageArr);

  for (let i = 0; i < totalSquares; i++) {
    const row = Math.floor(i / cols);
    const col = i % cols;
    const isRevealed = revealedSquares.has(i);      

    squares.push(
      <div
        key={i}
        style={{
            padding: 0,
            margin: 0,
          backgroundColor: "gray",
          backgroundPosition: `${col * 100 / cols}% ${row * 100 / rows}%`,
          opacity: isRevealed ? 0 : 1,
          transition: "opacity 0.2s ease-out", 
          cursor: "pointer",
        }}
        // onClick={() => onClick(i)} 
      />
    );
  }

  return (
    <div
      style={{
        display: "grid",
        BackgroundColor: "blue",
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
        width: "100%",
        aspectRatio: "1 / 1",
        position: "relative",
        backgroundImage: `url(${currImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {squares}
    </div>
  );
}

export default ImageReveal;
