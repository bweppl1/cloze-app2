import { useState } from "react";

const ClozeAnswer = ({ checkAnswer, randomCloze }) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      checkAnswer(input, randomCloze);
      setInput("");
    }
  };

  return (
    <div className="clozeAnswer">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="What is the missing word?"
        />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default ClozeAnswer;
