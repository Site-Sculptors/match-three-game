import React from "react";

import "../Styles/index.css";

export const Game = ({
  currentTileArrangement,
  dragStart,
  dragDrop,
  dragEnd,
  touchStart,
  touchMove,
  touchEnd,
}) => {
  return (
    <div className="game">
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
          onTouchStart={touchStart}
          onTouchMove={touchMove}
          onTouchEnd={touchEnd}
          onTouchCancel={touchEnd}
        />
      ))}
    </div>
  );
};

// Rest of your code...
