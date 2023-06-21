export const checkForRowOfFour = ({
  currentTileArrangement,
  Blank,
  setScore,
}) => {
  if (!currentTileArrangement) {
    return; // or handle the case when the currentTileArrangement is undefined
  }
  for (let i = 0; i < 64; i++) {
    const rowOfFour = [i, i + 1, i + 2, i + 3];
    const decidedTile = currentTileArrangement[i];
    const notValid = [
      5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53,
      54, 55, 62, 63, 64,
    ];

    const isBlank = currentTileArrangement[i] === Blank;

    if (notValid.includes(i)) {
      continue;
    }

    if (
      rowOfFour.every(
        (tile) => currentTileArrangement[tile] === decidedTile && !isBlank
      )
    ) {
      setScore((score) => score + 4);
      rowOfFour.forEach((tile) => (currentTileArrangement[tile] = Blank));
      return true;
    }
  }
};

//export default checkForRowOfFour;
