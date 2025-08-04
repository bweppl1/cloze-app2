import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const ClozeQuestion = ({ showTranslations, onAnswer }) => {
  const { category } = useParams();
  const [clozeData, setClozeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAnswering, setIsAnswering] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [resultFeedback, setResultFeedback] = useState({
    message: "",
    isCorrect: null,
  });

  useEffect(() => {
    if (!category) {
      setError("No category specified");
      setLoading(false);
      return;
    }

    fetchCloze();
  }, [category]);

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

  const handleAnswer = (option) => {
    if (isAnswering) {
      return;
    }

    const isCorrect = option === clozeData?.correctAnswer;
    setSelectedOption(option);
    setResultFeedback({
      message: isCorrect ? "Correct!" : "Incorrect!",
      isCorrect: isCorrect ? true : false,
    });
    onAnswer(isCorrect);

    setIsAnswering(true);

    setTimeout(() => {
      setIsAnswering(false);
      setResultFeedback({ message: "", isCorrect: null });
      fetchCloze();
    }, 2000); // 2 second pause on answering
  };

  // if (loading) return <div>Loading {category} questions...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!clozeData) return <div>No question data available</div>;

  return (
    <div className="clozeContainer">
      <h2>Fill in the blank:</h2>

      <div className="clozeSentence">
        {resultFeedback.isCorrect
          ? clozeData.sentence.replace("___", clozeData.correctAnswer)
          : clozeData.sentence}
        {showTranslations && (
          <div className="translation">
            <span>Translation: </span>
            {clozeData.translation}
          </div>
        )}
      </div>

      <div className="options-grid">
        {clozeData.options.map((option, index) => (
          <button
            key={index}
            className="primaryButton"
            onClick={() => handleAnswer(option)}
          >
            {option}
          </button>
        ))}
      </div>

      {resultFeedback.message && (
        <div
          className={`resultFeedback ${
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
