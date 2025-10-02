import { useState, useEffect } from "react";

const UserDisplay = ({ xp, lvl, streak }) => {
  const [pipCount, setPipCount] = useState(xp);

  useEffect(() => {
    let pips = [];
    let emptyPips = 5 - xp;
    console.log("emptyPips:" + emptyPips);
    for (let i = 0; i < xp; i++) {
      pips.push(<div className="experiencePip fullPip"></div>);
    }
    for (let i = 0; i < emptyPips; i++) {
      pips.push(<div className="experiencePip"></div>);
    }

    setPipCount(pips);
    console.log("xp:" + xp);
    console.log("pips:" + pips);
  }, [xp]);

  return (
    <div className="userDisplay">
      <div className="userHeading">
        <span className="material-symbols-outlined white">person</span>
        <h3 className="white">User Display</h3>
      </div>
      <div className="userContent">
        <span className="userLevel">Level: {lvl}</span>
        <span className="userExperience">Experience Progress:</span>
        <div className="experienceBar">{pipCount}</div>
        <span className="streakCounter">Streak: {streak}</span>
      </div>
    </div>
  );
};

export default UserDisplay;
