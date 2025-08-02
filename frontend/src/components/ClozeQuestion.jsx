import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const ClozeQuestion = ({ showTranslations, onAnswer }) => {
  const { category } = useParams(); // Gets "top10" from URL
  const [clozeData, setClozeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [resultFeedback, setResultFeeback] = useState("");

  useEffect(() => {
    const fetchCloze = async () => {
      try {
        const response = await fetch(`/api/cloze/${category}`);
        if (!response.ok) throw new Error("Failed to fetch");
        const data = await response.json();
        setClozeData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCloze();
  }, [category]); // Refetches when category changes

  if (loading) return <div>Loading {category} questions...</div>;
  if (error)
    return (
      <div>
        Error loading {category}: {error}
      </div>
    );

  const isCorrect = selectedOption === cloze.answer;
  setResultFeeback({
    message: isCorrect ? "Correct!!" : "WRONG!",
    isCorrect,
  });

  onAnswer(isCorrect);

  return (
    <div className="cloze-container">
      <h2>{category.replace(/([A-Z])/g, " $1").trim()} Questions</h2>

      {/* Display the cloze question */}
      <div className="cloze-sentence">{clozeData.sentence}</div>

      {/* Multiple choice options */}
      <div className="options-grid">
        {clozeData.options.map((option, index) => (
          <button
            key={index}
            className="primaryButton"
            onClick={() => handleAnswer(option === clozeData.word)}
          >
            {option}
          </button>
        ))}
        {resultFeedback}
      </div>
    </div>
  );
};

export default ClozeQuestion;
