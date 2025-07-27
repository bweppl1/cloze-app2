import { useState } from "react";

const OptionsBar = ({ showTranslations, onToggle }) => {
  return (
    <div className="optionsBar">
      <span className="material-symbols-outlined">settings</span>
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
