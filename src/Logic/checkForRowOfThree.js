export const checkForRowOfThree = ({
  currentTileArrangement,
  Blank,
  setScore,
}) => {
  if (!currentTileArrangement) {
    return; // or handle the case when the currentTileArrangement is undefined
  }
  for (let i = 0; i < 64; i++) {
    const rowOfThree = [i, i + 1, i + 2];
    const decidedTile = currentTileArrangement[i];
    const notValid = [
      6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64,
    ];
    const isBlank = currentTileArrangement[i] === Blank;

    if (notValid.includes(i)) {
      continue;
    }

    if (
      rowOfThree.every(
        (tile) => currentTileArrangement[tile] === decidedTile && !isBlank
      )
    ) {
      setScore((score) => score + 3);
      rowOfThree.forEach((tile) => (currentTileArrangement[tile] = Blank));
      return true;
    }
  }
};

//export default checkForRowOfThree;
