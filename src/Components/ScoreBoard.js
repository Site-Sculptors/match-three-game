import React from "react";
import "../Styles/index.css";

const ScoreBoard = ({ score }) => {
  return (
    <div className="scoreBoard">
      <h1 className="scoreDisplay">{score}</h1>
    </div>
  );
};

export default ScoreBoard;
