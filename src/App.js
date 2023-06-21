/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Game from "./Components/Game";
import { checkForColumnOfFour } from "./Logic/checkForColumnOfFour";
import { checkForRowOfFour } from "./Logic/checkForRowOfFour";
import { checkForColumnOfThree } from "./Logic/checkForColumnOfThree";
import { checkForRowOfThree } from "./Logic/checkForRowOfThree";

import "./index.css";
import Scoreboard from "./Components/ScoreBoard";
import Blank from "./Images/blank.png";
import tiles from "./Types/tiles";

const width = 8;

const App = () => {
  // eslint-disable-next-line no-undef
  const [currentTileArrangement, setCurrentTileArrangement] = useState([]);
  const [tileBeingDragged, setTileBeingDragged] = useState(null);
  const [tileBeingReplaced, setTileBeingReplaced] = useState(null);
  const [score, setScore] = useState(0);
  /* 
  const checkForColumnOfFour = () => {
    for (let i = 0; i <= 39; i++) {
      const columnOfFour = [i, i + width, i + width * 2, i + width * 3];
      const decidedTile = currentTileArrangement[i];
      const isBlank = currentTileArrangement[i] === Blank;

      if (
        columnOfFour.every(
          (tile) => currentTileArrangement[tile] === decidedTile && !isBlank
        )
      ) {
        setScore((score) => score + 4);
        columnOfFour.forEach((tile) => (currentTileArrangement[tile] = Blank));
        return true;
      }
    }
  };

  const checkForRowOfFour = () => {
    for (let i = 0; i < 64; i++) {
      const rowOfFour = [i, i + 1, i + 2, i + 3];
      const decidedTile = currentTileArrangement[i];
      const notValid = [
        5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53,
        54, 55, 62, 63, 64,
      ];

      const isBlank = currentTileArrangement[i] === Blank;

      if (notValid.includes(i)) {
        continue;
      }

      if (
        rowOfFour.every(
          (tile) => currentTileArrangement[tile] === decidedTile && !isBlank
        )
      ) {
        setScore((score) => score + 4);
        rowOfFour.forEach((tile) => (currentTileArrangement[tile] = Blank));
        return true;
      }
    }
  };

  const checkForColumnOfThree = () => {
    for (let i = 0; i <= 47; i++) {
      const columnOfThree = [i, i + width, i + width * 2];
      const decidedTile = currentTileArrangement[i];

      const isBlank = currentTileArrangement[i] === Blank;

      if (
        columnOfThree.every(
          (tile) => currentTileArrangement[tile] === decidedTile && !isBlank
        )
      ) {
        setScore((score) => score + 3);
        columnOfThree.forEach((tile) => (currentTileArrangement[tile] = Blank));
        return true;
      }
    }
  };

  const checkForRowOfThree = () => {
    for (let i = 0; i < 64; i++) {
      const rowOfThree = [i, i + 1, i + 2];
      const decidedTile = currentTileArrangement[i];
      const notValid = [
        6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64,
      ];
      const isBlank = currentTileArrangement[i] === Blank;

      if (notValid.includes(i)) {
        continue;
      }

      if (
        rowOfThree.every(
          (tile) => currentTileArrangement[tile] === decidedTile && !isBlank
        )
      ) {
        setScore((score) => score + 3);
        rowOfThree.forEach((tile) => (currentTileArrangement[tile] = Blank));
        return true;
      }
    }
  }; */

  const moveIntoSpaceBelow = () => {
    for (let i = 0; i <= 55; i++) {
      const firstRow = [0, 1, 2, 3, 4, 5, 6, 7];
      const isFirstRow = firstRow.includes(i);

      if (isFirstRow && currentTileArrangement[i] === Blank) {
        let randomNumber = Math.floor(Math.random() * tiles.length);
        currentTileArrangement[i] = tiles[randomNumber];
      }

      if (currentTileArrangement[i + width] === Blank) {
        currentTileArrangement[i + width] = currentTileArrangement[i];
        currentTileArrangement[i] = Blank;
      }
    }
  };

  const dragStart = (e) => {
    console.log("drag start");
    setTileBeingDragged(e.target);
  };

  const dragDrop = (e) => {
    console.log("drag drop");
    setTileBeingReplaced(e.target);
  };

  const dragEnd = () => {
    console.log("drag end");

    // if (tileBeingDragged === tileBeingReplaced) {
    //   return;

    const tileBeingDraggedId = parseInt(
      tileBeingDragged.getAttribute("data-id")
    );

    const tileBeingReplacedId = parseInt(
      tileBeingReplaced.getAttribute("data-id")
    );

    currentTileArrangement[tileBeingReplacedId] =
      tileBeingDragged.getAttribute("src");
    currentTileArrangement[tileBeingDraggedId] =
      tileBeingReplaced.getAttribute("src");

    console.log("tileBeingDragged", tileBeingDraggedId);
    console.log("tileBeingReplaced", tileBeingReplacedId);

    const validMoves = [
      tileBeingDraggedId - 1,
      tileBeingDraggedId - width,
      tileBeingDraggedId + 1,
      tileBeingDraggedId + width,
    ];

    const validMove = validMoves.includes(tileBeingReplacedId);

    const isARowOfFour = checkForRowOfFour({
      currentTileArrangement,
      width,
      Blank,
      setScore,
    });
    const isAColumnOfFour = checkForColumnOfFour({
      currentTileArrangement,
      width,
      Blank,
      setScore,
    });
    const isARowOfThree = checkForRowOfThree({
      currentTileArrangement,
      width,
      Blank,
      setScore,
    });
    const isAColumnOfThree = checkForColumnOfThree({
      currentTileArrangement,
      width,
      Blank,
      setScore,
    });

    if (
      tileBeingReplacedId &&
      validMove &&
      (isARowOfFour || isAColumnOfFour || isARowOfThree || isAColumnOfThree)
    ) {
      setTileBeingDragged(null);
      setTileBeingReplaced(null);
    } else {
      currentTileArrangement[tileBeingReplacedId] =
        tileBeingReplaced.getAttribute("src");
      currentTileArrangement[tileBeingDraggedId] =
        tileBeingDragged.getAttribute("src");

      setCurrentTileArrangement([...currentTileArrangement]);
    }
  };

  const createBoard = () => {
    setScore(0);
    const randomTileArrangement = [];

    for (let i = 0; i < width * width; i++) {
      const randomTile = tiles[Math.floor(Math.random() * tiles.length)];

      randomTileArrangement.push(randomTile);
    }

    setCurrentTileArrangement(randomTileArrangement);

    if (!hasValidMoves) {
      createBoard();
    }
  };

  // Function to check if there are any valid moves left on the game board
  const hasValidMoves = (board) => {
    const numRows = board.length;
    const numCols = board[0].length;

    // Iterate over each cell in the board
    for (let row = 0; row < numRows; row++) {
      for (let col = 0; col < numCols; col++) {
        // Check for valid moves to the right and down from the current cell
        if (
          (col + 2 < numCols &&
            board[row][col] === board[row][col + 1] &&
            board[row][col] === board[row][col + 2]) ||
          (row + 2 < numRows &&
            board[row][col] === board[row + 1][col] &&
            board[row][col] === board[row + 2][col])
        ) {
          return true; // Found a valid move
        }
      }
    }

    return false; // No valid moves found
  };

  useEffect(() => {
    createBoard();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      checkForColumnOfFour({ currentTileArrangement, width, Blank, setScore });
      checkForRowOfFour({ currentTileArrangement, width, Blank, setScore });
      checkForColumnOfThree({ currentTileArrangement, width, Blank, setScore });
      checkForRowOfThree({ currentTileArrangement, width, Blank, setScore });
      moveIntoSpaceBelow();
      setCurrentTileArrangement([...currentTileArrangement]);
    }, 100);
    return () => clearInterval(timer);
  }, [
    checkForColumnOfFour,
    checkForRowOfFour,
    checkForColumnOfThree,
    checkForRowOfThree,
    moveIntoSpaceBelow,
    currentTileArrangement,
  ]);

  return (
    <div className="app">
      <Game
        currentTileArrangement={currentTileArrangement}
        dragStart={dragStart}
        dragDrop={dragDrop}
        dragEnd={dragEnd}
      />
      {/*  <div className="game">
        {currentTileArrangement.map((tile, index) => (
          <img
            key={index}
            style={{ backgroundTile: tile }}
            src={tile}
            alt={tile}
            data-id={index}
            draggable={true}
            onDragStart={dragStart}
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={(e) => e.preventDefault()}
            onDragLeave={(e) => e.preventDefault()}
            onDrop={dragDrop}
            onDragEnd={dragEnd}
          />
        ))}
      </div> */}
      <div>
        <Scoreboard score={score} />
      </div>
    </div>
  );
};

export default App;
