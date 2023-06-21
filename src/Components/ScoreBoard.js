import React from "react";
import "../index.css";

const ScoreBoard = ({ score }) => {
  return (
    <div className="scoreBoard">
      <h1 className="scoreDisplay">Score: {score}</h1>
    </div>
  );
};

export default ScoreBoard;
