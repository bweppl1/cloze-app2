import { useState, useEffect } from "react";

const UserDisplay = () => {
  const [level, setLevel] = useState(0);
  const [experience, setExperience] = useState(0);

  return (
    <div className="userDisplay">
      <div className="userHeading">
        <span className="material-symbols-outlined white">person</span>
        <h3 className="white">User Display</h3>
      </div>
      <div className="userContent">
        <span className="userLevel">{`Level: ${level}`}</span>
        <span className="userExperience">Experience:</span>
        <div className="experienceBar">
          {/* // Insert experience pip count based on level, style(fill) pips, based on experience */}
        </div>
      </div>
    </div>
  );
};

export default UserDisplay;
