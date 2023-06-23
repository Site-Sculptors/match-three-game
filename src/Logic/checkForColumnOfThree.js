export const checkForColumnOfThree = ({
  currentTileArrangement,
  tilesPerRowOrColumn,
  Blank,
}) => {
  if (!currentTileArrangement) {
    return; // or handle the case when the currentTileArrangement is undefined
  }
  for (let i = 0; i <= 47; i++) {
    const columnOfThree = [
      i,
      i + tilesPerRowOrColumn,
      i + tilesPerRowOrColumn * 2,
    ];
    const decidedTile = currentTileArrangement[i];

    const isBlank = currentTileArrangement[i] === Blank;

    if (
      columnOfThree.every(
        (tile) => currentTileArrangement[tile] === decidedTile && !isBlank
      )
    ) {
      /*   setScore((score) => score + 3);
      columnOfThree.forEach((tile) => (currentTileArrangement[tile] = Blank)); */
      return columnOfThree; //true;
    }
  }
};

//export default checkForColumnOfThree;
