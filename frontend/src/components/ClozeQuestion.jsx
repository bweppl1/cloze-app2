import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const ClozeQuestion = ({ showTranslations, onAnswer }) => {
  const { category } = useParams();
  const [clozeData, setClozeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [resultFeedback, setResultFeedback] = useState(null);

  useEffect(() => {
    if (!category) {
      setError("No category specified");
      setLoading(false);
      return;
    }

    const fetchCloze = async () => {
      try {
        console.log(`Fetching cloze for category: ${category}`); // Debug
        const response = await fetch(`/api/cloze/${category}`);

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(
            `Server responded with ${response.status}: ${errorText}`
          );
        }

        const data = await response.json();
        console.log("Received data:", data); // Debug

        if (!data?.sentence || !data?.options) {
          throw new Error("Invalid data format from server");
        }

        setClozeData(data);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCloze();
  }, [category]);

  const handleAnswer = (option) => {
    const isCorrect = option === clozeData?.correctAnswer;
    setSelectedOption(option);
    setResultFeedback({
      message: isCorrect ? "✅ Correct!" : "❌ Try again!",
      isCorrect,
    });
    onAnswer(isCorrect);
  };

  if (loading) return <div>Loading {category} questions...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!clozeData) return <div>No question data available</div>;

  return (
    <div className="cloze-container">
      <h2>{category.replace(/([a-z])([A-Z])/g, "$1 $2")}</h2>

      <div className="cloze-sentence">
        {clozeData.sentence.replace("___", "_____")}
        {showTranslations && (
          <div className="translation-hint">{clozeData.translation}</div>
        )}
      </div>

      <div className="options-grid">
        {clozeData.options.map((option, index) => (
          <button
            key={index}
            className={`primaryButton ${
              selectedOption === option ? "selected" : ""
            }`}
            onClick={() => handleAnswer(option)}
          >
            {option}
          </button>
        ))}
      </div>

      {resultFeedback && (
        <div
          className={`feedback ${
            resultFeedback.isCorrect ? "correct" : "incorrect"
          }`}
        >
          {resultFeedback.message}
        </div>
      )}
    </div>
  );
};

export default ClozeQuestion;
