export const checkForColumnOfFour = ({
  currentTileArrangement,
  tilesPerRowOrColumn,
  Blank,
  // setScore,
}) => {
  if (!currentTileArrangement) {
    return; // or handle the case when the currentTileArrangement is undefined
  }

  for (let i = 0; i <= 39; i++) {
    const columnOfFour = [
      i,
      i + tilesPerRowOrColumn,
      i + tilesPerRowOrColumn * 2,
      i + tilesPerRowOrColumn * 3,
    ];
    const decidedTile = currentTileArrangement[i];
    const isBlank = currentTileArrangement[i] === Blank;

    if (
      columnOfFour.every(
        (tile) => currentTileArrangement[tile] === decidedTile && !isBlank
      )
    ) {
      // setScore((score) => score + 4);
      // columnOfFour.forEach((tile) => (currentTileArrangement[tile] = Blank));
      return columnOfFour; //true;
    }
  }
};

//export default checkForColumnOfFour;
