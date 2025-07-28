import { useState } from "react";

const OptionsBar = ({ showTranslations, onToggle }) => {
  return (
    <div className="optionsBar">
      <div className="settingsCog primary-bg">
        <span className="material-symbols-outlined white">settings</span>
      </div>

      <label>
        <input
          type="checkbox"
          checked={showTranslations}
          onChange={() => onToggle(!showTranslations)}
        ></input>
        Show Translations
      </label>
    </div>
  );
};

export default OptionsBar;
