import { useEffect, useState } from "react";
import ClozeQuestion from "./components/ClozeQuestion";
import ClozeAnswer from "./components/ClozeAnswer";

function App() {
  const [sentence, setSentence] = useState("");

  let clozeSentences = {
    de: [
      "___ donde eres?",
      "El libro ___ mi hermana está en la mesa.",
      "La película ___ terror me dio miedo.",
    ],
  };

  // Randomized return function
  function randomCloze() {
    let i = Math.floor(Math.random() * clozeSentences.de.length);
    // console.log(i);
    let newSentence = clozeSentences.de[i];
    setSentence(newSentence);
    return newSentence;
  }

  useEffect(() => {
    randomCloze();
  }, []);

  const checkAnswer = (answer) => {
    const key = "de";

    console.log("Key: ", key);
    console.log("Answer: ", answer);

    if (answer === key) {
      console.log("Correct!");
      return true;
    } else {
      console.log("Wrong!");
      return false;
    }
  };

  return (
    <>
      <h2>Cloze Quiz</h2>
      <ClozeQuestion sentence={sentence} />
      <ClozeAnswer checkAnswer={checkAnswer} randomCloze={randomCloze} />
    </>
  );
}

export default App;
