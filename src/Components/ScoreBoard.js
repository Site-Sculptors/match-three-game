import React from "react";
import "../Styles/scoreBoard.css";
import ScoreBoardImage from "../Images/score-board.png";

const ScoreBoard = ({ score }) => {
  return (
    <div className="scoreBoard">
      <h1 className="scoreDisplay">{score}</h1>
    </div>
  );
};

export default ScoreBoard;
