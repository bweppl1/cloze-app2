import ClozeQuestion from "../components/ClozeQuestion";

function Quiz({ showTranslations, onAnswer }) {
  return (
    <div className="Quiz">
      <ClozeQuestion onAnswer={onAnswer} showTranslations={showTranslations} />
    </div>
  );
}

export default Quiz;
