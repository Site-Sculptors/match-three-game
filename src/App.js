import React, { useState, useEffect } from "react";

const width = 8;
const candyColors = ["blue", "green", "orange", "purple", "red", "yellow"];

const App = () => {
  // eslint-disable-next-line no-undef
  const [currentColorArrangement, setCurrentColorArrangement] = useState([]);

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

  return (
    <div className="app">
      <div className="game">
        {currentColorArrangement.map((candyColor, index) => (
          <img
            key={index}
            style={{ backgroundColor: candyColor }}
            alt={candyColor}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
