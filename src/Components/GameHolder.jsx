import React, { useState, useEffect } from "react";
import { Game } from "./Game";
import BackgroundTile from "../Images/background-tile.png";
import "../Styles/gameHolder.css";

export const GameHolder = ({
  currentTileArrangement,
  dragStart,
  dragDrop,
  dragEnd,
  tilesPerRowOrColumn,
}) => {
  const [backgroundTileArrangement, setBackgroundTileArrangement] = useState(
    []
  );

  useEffect(() => {
    createBackground();
  }, []);

  const createBackground = () => {
    const tiles = [];
    for (let i = 0; i < tilesPerRowOrColumn * tilesPerRowOrColumn; i++) {
      tiles.push(BackgroundTile);
    }
    setBackgroundTileArrangement(tiles);
  };

  return (
    <div className="gameHolder">
      {backgroundTileArrangement.map((backgroundTile, index) => (
        <img src={backgroundTile} alt={`Tile ${index}`} key={index} />
      ))}
      <Game
        currentTileArrangement={currentTileArrangement}
        dragStart={dragStart}
        dragDrop={dragDrop}
        dragEnd={dragEnd}
        tilesPerRowOrColumn={tilesPerRowOrColumn}
      />
    </div>
  );
};
