import { checkForColumnOfFour } from "./checkForColumnOfFour";
import { checkForRowOfFour } from "./checkForRowOfFour";
import { checkForColumnOfThree } from "./checkForColumnOfThree";
import { checkForRowOfThree } from "./checkForRowOfThree";

export const checkForMatches = ({
  currentTileArrangement,
  tilesPerRowOrColumn,
  Blank,
  setScore,
}) => {
  const matches = [];

  const columnOfFourTiles = checkForColumnOfFour({
    currentTileArrangement,
    tilesPerRowOrColumn,
    Blank,
  });

  if (columnOfFourTiles && columnOfFourTiles.length > 0) {
    matches.push(...columnOfFourTiles);
  }

  const rowOfFourTiles = checkForRowOfFour({
    currentTileArrangement,
    Blank,
  });

  if (rowOfFourTiles && rowOfFourTiles.length > 0) {
    rowOfFourTiles.forEach((tile) => {
      matches.push(tile);
    });
  }

  const columnOfThreeTiles = checkForColumnOfThree({
    currentTileArrangement,
    tilesPerRowOrColumn,
    Blank,
  });

  if (columnOfThreeTiles && columnOfThreeTiles.length > 0) {
    columnOfThreeTiles.forEach((tile) => {
      matches.push(tile);
    });
  }

  const rowOfThreeTiles = checkForRowOfThree({
    currentTileArrangement,
    Blank,
  });

  if (rowOfThreeTiles && rowOfThreeTiles.length > 0) {
    rowOfThreeTiles.forEach((tile) => {
      matches.push(tile);
    });
  }

  let scoreBooster = 0;

  if (matches.length > 0) {
    matches.forEach((tile, index) => {
      currentTileArrangement[tile] = Blank;
      if (index == 3) {
        scoreBooster = 3;
      }
      setScore((score) => score + 1 + scoreBooster);
    });
  }
};
