const OptionsBar = ({
  playSound,
  onSoundToggle,
  showTranslations,
  onTranslationToggle,
}) => {
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
            onChange={() => onTranslationToggle(!showTranslations)}
          ></input>
          Show Translations
        </label>
        <label>
          <input
            type="checkbox"
            checked={playSound}
            onChange={() => onSoundToggle(!playSound)}
          ></input>
          Play Sounds
        </label>
      </div>
    </div>
  );
};

export default OptionsBar;
