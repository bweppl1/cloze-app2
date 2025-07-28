import { useState } from "react";

const OptionsBar = ({ showTranslations, onToggle }) => {
  return (
    <div className="settingsBar">
      <div className="settingsHeader">
        <span className="material-symbols-outlined white">settings</span>
        <h3 className="white">Settings</h3>
      </div>
      <div className="settingsContent">
        <label>
          <input
            type="checkbox"
            checked={showTranslations}
            onChange={() => onToggle(!showTranslations)}
          ></input>
          Show Translations
        </label>
      </div>
    </div>
  );
};

export default OptionsBar;
