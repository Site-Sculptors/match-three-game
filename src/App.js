/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import "./index.css";

const width = 8;
const candyColors = ["blue", "green", "orange", "purple", "red", "yellow"];

const App = () => {
  // eslint-disable-next-line no-undef
  const [currentColorArrangement, setCurrentColorArrangement] = useState([]);
  const [squareBeingDragged, setSquareBeingDragged] = useState(null);
  const [squareBeingReplaced, setSquareBeingReplaced] = useState(null);

  const checkForColumnOfFour = () => {
    for (let i = 0; i <= 39; i++) {
      const columnOfFour = [i, i + width, i + width * 2, i + width * 3];
      const decidedColor = currentColorArrangement[i];
      //const isBlank = currentColorArrangement[i] === blank;

      if (
        columnOfFour.every(
          (square) => currentColorArrangement[square] === decidedColor
        ) // && !isBlank)
      ) {
        columnOfFour.forEach(
          (square) => (currentColorArrangement[square] = "")
        );
        return true;
      }
    }
  };

  const checkForRowOfFour = () => {
    for (let i = 0; i < 64; i++) {
      const rowOfFour = [i, i + 1, i + 2, i + 3];
      const decidedColor = currentColorArrangement[i];
      const notValid = [
        5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53,
        54, 55, 62, 63, 64,
      ];
      //const isBlank = currentColorArrangement[i] === blank;

      if (notValid.includes(i)) {
        continue;
      }

      if (
        rowOfFour.every(
          (square) => currentColorArrangement[square] === decidedColor
        )
      ) {
        // && !isBlank))
        rowOfFour.forEach((square) => (currentColorArrangement[square] = ""));
        return true;
      }
    }
  };

  const checkForColumnOfThree = () => {
    for (let i = 0; i <= 47; i++) {
      const columnOfThree = [i, i + width, i + width * 2];
      const decidedColor = currentColorArrangement[i];
      //const isBlank = currentColorArrangement[i] === blank;
      if (
        columnOfThree.every(
          (square) => currentColorArrangement[square] === decidedColor
        )
      ) {
        columnOfThree.forEach(
          (square) => (currentColorArrangement[square] = "")
        );
        return true;
      }
    }
  };

  const checkForRowOfThree = () => {
    for (let i = 0; i < 64; i++) {
      const rowOfThree = [i, i + 1, i + 2];
      const decidedColor = currentColorArrangement[i];
      const notValid = [
        6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64,
      ];
      //const isBlank = currentColorArrangement[i] === blank;

      if (notValid.includes(i)) {
        continue;
      }

      if (
        rowOfThree.every(
          (square) => currentColorArrangement[square] === decidedColor
        )
      ) {
        // &&!isBlank)

        rowOfThree.forEach((square) => (currentColorArrangement[square] = ""));
        return true;
      }
    }
  };

  const moveIntoSquareBelow = () => {
    for (let i = 0; i <= 55; i++) {
      const firstRow = [0, 1, 2, 3, 4, 5, 6, 7];
      const isFirstRow = firstRow.includes(i);

      if (isFirstRow && currentColorArrangement[i] === "") {
        let randomNumber = Math.floor(Math.random() * candyColors.length);
        currentColorArrangement[i] = candyColors[randomNumber];
      }

      if (currentColorArrangement[i + width] === "") {
        currentColorArrangement[i + width] = currentColorArrangement[i];
        currentColorArrangement[i] = "";
      }
    }
  };

  const dragStart = (e) => {
    console.log("drag start");
    setSquareBeingDragged(e.target);
  };

  const dragDrop = (e) => {
    console.log("drag drop");
    setSquareBeingReplaced(e.target);
  };

  const dragEnd = () => {
    console.log("drag end");

    // if (squareBeingDragged === squareBeingReplaced) {
    //   return;

    const squareBeingDraggedId = parseInt(
      squareBeingDragged.getAttribute("data-id")
    );

    const squareBeingReplacedId = parseInt(
      squareBeingReplaced.getAttribute("data-id")
    );

    currentColorArrangement[squareBeingReplacedId] =
      squareBeingDragged.style.backgroundColor;
    currentColorArrangement[squareBeingDraggedId] =
      squareBeingReplaced.style.backgroundColor;
    // currentColorArrangement[squareBeingReplacedId] =
    //   squareBeingDragged.getAttribute("src");
    // currentColorArrangement[squareBeingDraggedId] =
    //   squareBeingReplaced.getAttribute("src");

    //  squareBeingReplaced.setCurrentColorArrangement();

    console.log("squareBeingDragged", squareBeingDraggedId);
    console.log("squareBeingReplaced", squareBeingReplacedId);

    const validMoves = [
      squareBeingDraggedId - 1,
      squareBeingDraggedId - width,
      squareBeingDraggedId + 1,
      squareBeingDraggedId + width,
    ];

    const validMove = validMoves.includes(squareBeingReplacedId);

    const isARowOfFour = checkForRowOfFour();
    const isAColumnOfFour = checkForColumnOfFour();
    const isARowOfThree = checkForRowOfThree();
    const isAColumnOfThree = checkForColumnOfThree();

    if (
      squareBeingReplacedId &&
      validMove &&
      (isARowOfFour || isAColumnOfFour || isARowOfThree || isAColumnOfThree)
    ) {
      setSquareBeingDragged(null);
      setSquareBeingReplaced(null);
    } else {
      currentColorArrangement[squareBeingReplacedId] =
        squareBeingReplaced.style.backgroundColor;
      currentColorArrangement[squareBeingDraggedId] =
        squareBeingDragged.style.backgroundColor;
      // currentColorArrangement[squareBeingReplacedId] =
      //   squareBeingReplaced.getAttribute("src");
      // currentColorArrangement[squareBeingDraggedId] =
      //   squareBeingDragged.getAttribute("src");

      setCurrentColorArrangement([...currentColorArrangement]);
    }
  };

  const createBoard = () => {
    const randomColorArrangement = [];

    // random colors for squares
    for (let i = 0; i < width * width; i++) {
      const randomColor =
        candyColors[Math.floor(Math.random() * candyColors.length)];

      randomColorArrangement.push(randomColor);
    }

    setCurrentColorArrangement(randomColorArrangement);
  };

  useEffect(() => {
    createBoard();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      checkForColumnOfFour();
      checkForRowOfFour();
      checkForColumnOfThree();
      checkForRowOfThree();
      moveIntoSquareBelow();
      setCurrentColorArrangement([...currentColorArrangement]);
    }, 100);
    return () => clearInterval(timer);
  }, [
    checkForColumnOfFour,
    checkForRowOfFour,
    checkForColumnOfThree,
    checkForRowOfThree,
    moveIntoSquareBelow,
    currentColorArrangement,
  ]);

  return (
    <div className="app">
      <div className="game">
        {currentColorArrangement.map((candyColor, index) => (
          <img
            key={index}
            style={{ backgroundColor: candyColor }}
            alt={candyColor}
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
      </div>
    </div>
  );
};

export default App;
