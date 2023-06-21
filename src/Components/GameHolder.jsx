import React, { useState, useEffect } from "react";
import { Game } from "./Game";
import BackgroundTile from "../Images/background-tile.png";
import "../index.css";

export const GameHolder = ({
  currentTileArrangement,
  dragStart,
  dragDrop,
  dragEnd,
  width,
}) => {
  const [backgroundTileArrangement, setBackgroundTileArrangement] = useState(
    []
  );

  useEffect(() => {
    createBackground();
  }, []);

  const createBackground = () => {
    const tiles = [];
    for (let i = 0; i < 64; i++) {
      tiles.push(BackgroundTile);
    }
    setBackgroundTileArrangement(tiles);
  };

  return (
    <div className="game">
      {backgroundTileArrangement.map((backgroundTile, index) => (
        <img src={backgroundTile} alt={`Tile ${index}`} key={index} />
      ))}
      <Game
        currentTileArrangement={currentTileArrangement}
        dragStart={dragStart}
        dragDrop={dragDrop}
        dragEnd={dragEnd}
        width={width}
      />
    </div>
  );
};
