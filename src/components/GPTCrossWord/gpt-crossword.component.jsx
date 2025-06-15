import { useEffect, useState } from "react";
import "./gpt-crossword.styles.css";

const size = 12;
const words = ["cross", "sword", "word", "grid", "dog", "cow"];

const GPTCrossword = () => {
  const [grid, setGrid] = useState([]);
  const [newWord, setNewWord] = useState("chicken")

    const testFunction = () => {
    // console.log(newWord)

    let testWord1 = ["boy", "frog", "zebra"]
    let testWord2 = "easy"

    let result = testWord1.join('').split('').sort()
    let obj = {}
    for (let i; i<result.length; i++) {
      let obj
    }
    console.log(result)


    // console.log (placedObj1.word.split("").find((letter) => letter === "f"))
    
  }

    const placedObj1 = {word: "elephant", dir: "vertical", startcell: 26}
  
      //  const canPlace = (word) => {
      //    let intersectedLetter = placedObj1.word.some(letter)
      //     let letter 
      //   } && hasSpace(word) && !
        

  useEffect(() => {
    const createEmptyGrid = () =>
      Array(size)
        .fill(null)
        .map(() => Array(size).fill(null));

    const canPlace = (grid, word, r, c, dir) => {
      for (let i = 0; i < word.length; i++) {
        const x = dir === "across" ? c + i : c;
        const y = dir === "across" ? r : r + i;
        if (x >= size || y >= size) return false;
        const existing = grid[y][x];
        if (existing && existing !== word[i]) return false;
      }
      return true;
    };



    const placeWord = (grid, word) => {
      // Try to intersect with existing words first
      for (let existingRow = 0; existingRow < size; existingRow++) {
        for (let existingCol = 0; existingCol < size; existingCol++) {
          const letter = grid[existingRow][existingCol];
          if (!letter) continue;

          for (let i = 0; i < word.length; i++) {
            if (word[i] !== letter) continue;

            // Try placing horizontally
            const startCol = existingCol - i;
            if (canPlace(grid, word, existingRow, startCol, "across")) {
              for (let j = 0; j < word.length; j++) {
                grid[existingRow][startCol + j] = word[j];
              }
              return;
            }

            // Try placing vertically
            const startRow = existingRow - i;
            if (canPlace(grid, word, startRow, existingCol, "down")) {
              for (let j = 0; j < word.length; j++) {
                grid[startRow + j][existingCol] = word[j];
              }
              return;
            }
          }
        }
      }

      // If no intersection possible, try random placement
      for (let attempts = 0; attempts < 100; attempts++) {
        const dir = Math.random() > 0.5 ? "across" : "down";
        const row = Math.floor(Math.random() * size);
        const col = Math.floor(Math.random() * size);
        if (canPlace(grid, word, row, col, dir)) {
          for (let i = 0; i < word.length; i++) {
            const r = dir === "across" ? row : row + i;
            const c = dir === "across" ? col + i : col;
            grid[r][c] = word[i];
          }
          return;
        }
      }
    };


    const newGrid = createEmptyGrid();
    words.forEach((word) => placeWord(newGrid, word.toUpperCase()));
    setGrid(newGrid);
  }, []);

  return (
    <div className = "cw-cont-and-input">
    <div className="gpt-crossword-container">
      {grid.map((row, r) =>
        row.map((cell, c) => (
          <div key={`${r}-${c}`} className="gpt-cell">
            {cell || ""}
          </div>
        ))
      )}
    </div>
    <input
    onChange={(e) => setNewWord(e.target.value)}
    value = {newWord}
    // onSubmit = {handleSubmit}
    >
    </input>
    <button onClick = {testFunction}> button type</button>
    </div>
  );
};

export default GPTCrossword;
