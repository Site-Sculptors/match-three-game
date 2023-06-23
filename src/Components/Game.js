import React, { useState, useEffect, useRef } from "react";
import "../Styles/gameHolder.css";

export const Game = ({
  currentTileArrangement,
  dragStart,
  dragDrop,
  dragEnd,
  touchStart,
  touchMove,
  touchEnd,
  tilesPerRowOrColumn,
}) => {
  const [tileSize, setTileSize] = useState(0);
  const gridRef = useRef(null);

  /*   useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); */

  /*   function handleResize() {
    const grid = gridRef.current;
    const gridRect = grid.getBoundingClientRect();
    const gridWidth = gridRect.width;
    const gridHeight = gridRect.height;
    const smallestSide = Math.min(gridHeight, gridWidth);
    console.log("Smallest Side:", smallestSide);
    const tileSize = Math.min(smallestSide / tilesPerRowOrColumn, 72); // Subtract grid gap
    console.log("Tile Size:", tileSize);
    setTileSize(tileSize);
  } */

  return (
    <div className="game" ref={gridRef}>
      {currentTileArrangement.map((tile, index) => (
        <div
          className="grid-tile"
          key={index}
          // style={{ width: tileSize, height: tileSize }}
          A
        >
          <img
            key={index}
            className="tile-image"
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
        </div>
      ))}
    </div>
  );
};
