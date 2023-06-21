export const checkForColumnOfFour = ({
  currentTileArrangement,
  width,
  Blank,
  setScore,
}) => {
  if (!currentTileArrangement) {
    return; // or handle the case when the currentTileArrangement is undefined
  }

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

//export default checkForColumnOfFour;
