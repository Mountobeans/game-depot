import React, { useState, useEffect } from "react";
import ImageReveal from "./image-reveal.component";
import Controls from "./controls.component";
import storyItems from "../../kingtube.data";

function PictureReveal() {
  const rows = 5; // Number of rows in the grid
  const cols = 5; // Number of columns in the grid
  const totalSquares = rows * cols;

  const [revealedSquares, setRevealedSquares] = useState(new Set()); // Keep track of revealed squares
  const [imageArr, setImageArr] = useState(storyItems.filter(card => card.image).map(card => card.image))
  const [currImage, setCurrImage] = useState()
  const [displayedImages, setDisplayedImages] = useState([])

  const handleClick = () => {
    if(currImage) {
    const randomIndex = Math.floor(totalSquares * Math.random());
    if (!revealedSquares.has(randomIndex) && revealedSquares.size < totalSquares) {
      setRevealedSquares((prev) => new Set(prev).add(randomIndex));
    } else {
      (handleClick())
    }}
  }

       const getRandomImage = () => {
        const tempDisplayArray = imageArr.filter(image => !displayedImages.includes(image))
        if (tempDisplayArray.length > 0) {
        let tempCurrImage = tempDisplayArray[Math.floor(Math.random()*tempDisplayArray.length)]
        setCurrImage(tempCurrImage)
        setDisplayedImages((prev) => [...prev, tempCurrImage])
      } else {
        setCurrImage(null);
      }
        }   

  const resetGame = () => {
    setRevealedSquares(new Set());
    setDisplayedImages([])
    getRandomImage()
  };

  useEffect(() => {
    if (displayedImages.length === 0) {
      getRandomImage();
    }
  }, [displayedImages]);

  return (
    <div className = "picture-reveal-div">
      <h1>Image Reveal</h1>
      <ImageReveal
        rows={rows}
        cols={cols}
        revealedSquares={revealedSquares}
        // getRandomImage={getRandomImage}
        currImage = {currImage}
        imageArr = {imageArr}
      />
      <Controls onReset={resetGame} onReveal={handleClick} 
      getRandomImage={getRandomImage} 
      isGameOver={revealedSquares.size === totalSquares} 
      currImage = {currImage}
      />
    </div>
  );
}

export default PictureReveal;
