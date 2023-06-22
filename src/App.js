/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { GameHolder } from "./Components/GameHolder";
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

  const touchStart = (e) => {
    console.log("touch start");
    const touch = e.touches[0];
    const target = e.currentTarget;
    const index = parseInt(target.getAttribute("data-id"), 10);

    setTileBeingDragged(target);
    target.setAttribute("data-touch-start-x", touch.clientX);
    target.setAttribute("data-touch-start-y", touch.clientY);
    target.setAttribute("data-touch-index", index);
  };

  const dragDrop = (e) => {
    console.log("drag drop");
    setTileBeingReplaced(e.target);
  };

  const touchMove = (e) => {
    console.log("touch move");
    const touch = e.touches[0];
    const target = e.currentTarget;
    const startX = parseInt(target.getAttribute("data-touch-start-x"), 10);
    const startY = parseInt(target.getAttribute("data-touch-start-y"), 10);
    const deltaX = touch.clientX - startX;
    const deltaY = touch.clientY - startY;

    // Perform any touch move logic you need

    e.preventDefault();
  };

  const touchEnd = (e) => {
    console.log("touch end");
    const target = e.currentTarget;
    const tileBeingDraggedId = parseInt(
      target.getAttribute("data-touch-index"),
      10
    );

    // Perform any touch end logic you need

    e.preventDefault();
  };

  const dragEnd = () => {
    const tileBeingDraggedId = parseInt(
      tileBeingDragged.getAttribute("data-id")
    );

    const tileBeingReplacedId = parseInt(
      tileBeingReplaced.getAttribute("data-id")
    );

    const validMoves = [
      tileBeingDraggedId - 1,
      tileBeingDraggedId - width,
      tileBeingDraggedId + 1,
      tileBeingDraggedId + width,
    ];

    const validMove = validMoves.includes(tileBeingReplacedId);

    if (validMove) {
      currentTileArrangement[tileBeingReplacedId] =
        tileBeingDragged.getAttribute("src");
      currentTileArrangement[tileBeingDraggedId] =
        tileBeingReplaced.getAttribute("src");

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
    }
  };

  const createBoard = () => {
    let tempScore;
    if (score != null) {
      tempScore = score;
    } else {
      tempScore = 0;
    }

    const randomTileArrangement = [];

    for (let i = 0; i < width * width; i++) {
      const randomTile = tiles[Math.floor(Math.random() * tiles.length)];

      randomTileArrangement.push(randomTile);
    }

    setCurrentTileArrangement(randomTileArrangement);

    if (!hasValidMoves) {
      createBoard();
    }

    setScore(tempScore);
  };

  const hasValidMoves = (currentTileArrangement, width) => {
    const numRows = width;
    const numCols = width;

    // Iterate over each cell in the board
    for (let row = 0; row < numRows; row++) {
      for (let col = 0; col < numCols; col++) {
        // Check for valid moves to the right and down from the current cell
        if (
          (col + 2 < numCols &&
            currentTileArrangement[row * width + col] ===
              currentTileArrangement[row * width + col + 1] &&
            currentTileArrangement[row * width + col] ===
              currentTileArrangement[row * width + col + 2]) ||
          (row + 2 < numRows &&
            currentTileArrangement[row * width + col] ===
              currentTileArrangement[(row + 1) * width + col] &&
            currentTileArrangement[row * width + col] ===
              currentTileArrangement[(row + 2) * width + col])
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
    }, 90);
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
      <GameHolder
        currentTileArrangement={currentTileArrangement}
        dragStart={dragStart}
        dragDrop={dragDrop}
        dragEnd={dragEnd}
        touchStart={touchStart}
        touchMove={touchMove}
        touchEnd={touchEnd}
        width={width}
      />
      <div>
        <Scoreboard score={score} />
      </div>
    </div>
  );
};

export default App;
