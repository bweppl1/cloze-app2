import { useState } from "react";

const OptionsBar = () => {
  const [showTranslations, setShowTranslations] = useState(true);

  return (
    <div className="optionsBar">
      <div className="primary-bg">
        <span className="material-symbols-outlined">settings</span>
      </div>
      <button className="settingsButton" onChange={handleTranslationToggle()}>
        Toggle Translations
      </button>
    </div>
  );
};

export default OptionsBar;
