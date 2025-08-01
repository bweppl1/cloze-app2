import { useState, useEffect } from "react";

const ClozeQuestion = ({ showTranslations, onAnswer }) => {
  const [cloze, setCloze] = useState(null); // setting the cloze to use
  const [isAnswering, setIsAnswering] = useState(false); // to block multiclicks
  const [resultFeedback, setResultFeeback] = useState({
    message: "",
    isCorrect: null,
  }); // displays "correct" or "wrong"

  // top 10 most common words
  const top10 = ["de", "el", "la", "que", "en", "y", "a", "del", "se", "los"];

  // temporary library of clozes
  const clozeSentences = {
    de: [
      "El libro ___ Juan está aquí. (Juan's book is here.)",
      "Es un regalo ___ mi madre. (It's a gift for my mom.)",
      "Salimos ___ la casa. (We leave the house.)",
    ],
    el: [
      "___ niño juega en el parque. (The boy plays in the park.)",
      "Voy a ___ supermercado. (I go to the supermarket.)",
      "___ agua es fría. (The water is cold.)",
    ],
    la: [
      "___ puerta está abierta. (The door is open.)",
      "Veo ___ película. (I watch a movie.)",
      "___ comida está lista. (The food is ready.)",
    ],
    que: [
      "El libro ___ leíste es bueno. (The book that you read is good.)",
      "Dime ___ quieres. (Tell me what you want.)",
      "Es el coche ___ compré. (It's the car that I bought.)",
    ],
    en: [
      "Estoy ___ casa. (I'm at home.)",
      "El perro ___ el jardín. (The dog is in the garden.)",
      "Vivo ___ España. (I live in Spain.)",
    ],
    y: [
      "Pan ___ mantequilla. (Bread and butter.)",
      "Tú ___ yo. (You and I.)",
      "Blanco ___ negro. (White and black.)",
    ],
    a: [
      "Voy ___ la escuela. (I go to school.)",
      "Dáselo ___ María. (Give it to Maria.)",
      "Empieza ___ llover. (It starts to rain.)",
    ],
    del: [
      "El hijo ___ profesor. (The son of the teacher.)",
      "Es el coche ___ vecino. (It's the car of the neighbor.)",
      "La luz ___ sol. (The light of the sun.)",
    ],
    se: [
      "___ olvidó el libro. (He forgot the book.)",
      "___ venden frutas aquí. (They sell fruits here.)",
      "___ hizo tarde. (It became late.)",
    ],
    los: [
      "___ niños están felices. (The children are happy.)",
      "Veo ___ pájaros. (I see some birds.)",
      "___ libros son interesantes. (The books are interesting.)",
    ],
  };

  // generating cloze question
  const generateCloze = () => {
    // choosing a random word from top10
    const randomWord = top10[Math.floor(Math.random() * top10.length)];
    // isolating clozes related to the chosen word
    const clozes = clozeSentences[randomWord];
    // choosing a random cloze related to the selected word
    let randomCloze = clozes[Math.floor(Math.random() * clozes.length)];

    // displaying translation based on toggle flag
    const noTranslation = showTranslations // update variable name, its opposite
      ? randomCloze
      : randomCloze.split("(")[0].trim();

    // set cloze state
    // setCloze(randomCloze);

    // choosing 3 incorrect answers
    const wrongOptions = top10
      .filter((option) => option !== randomWord)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);

    // set cloze state
    setCloze({
      sentence: noTranslation, // cloze without translation
      fullSentence: randomCloze, // cloze with translation
      options: [...wrongOptions, randomWord].sort(() => 0.5 - Math.random()), // 3 wrong answers + 1 correct answer
      answer: randomWord, // correct answer
    });
  };

  // Toggle translations instantly
  useEffect(() => {
    if (cloze) {
      setCloze((prev) => ({
        ...prev,
        sentence: showTranslations
          ? prev.fullSentence
          : prev.fullSentence.split("(")[0].trim(),
      }));
    }
  }, [showTranslations]);

  // Generate first quiz on component mount
  useEffect(() => {
    generateCloze();
  }, []);

  // Loading message
  if (!cloze) return <div>Loading quiz...</div>;

  // Events to trigger on each answer
  const handleAnswer = (selectedOption) => {
    if (isAnswering) {
      return;
    }

    const isCorrect = selectedOption === cloze.answer;
    setResultFeeback({
      message: isCorrect ? "Correct!!" : "WRONG!",
      isCorrect,
    });

    onAnswer(isCorrect);

    // // google tts
    // const speakSpanish = (text) => {
    //   if ("speechSynthesis" in window) {
    //     const utterance = new SpeechSynthesisUtterance(text);
    //     utterance.lang = "es-ES"; // Spanish (Spain)
    //     utterance.rate = 1; // titrate speed
    //     window.speechSynthesis.speak(utterance);
    //   } else {
    //     console.warn("Speech synthesis not supported");
    //   }
    // };

    // // delay for tts
    // setTimeout(() => {
    //   speakSpanish(cloze.sentence.split("(")[0].trim());
    // }, 500); // 0.5 seconds delay

    // blocks multi clicks
    setIsAnswering(true);

    // pause after answering
    setTimeout(() => {
      generateCloze();
      setResultFeeback({ message: "", isCorrect: null });
      setIsAnswering(false);
    }, 2000); //2 sec delay on answer
  };

  return (
    <div className="clozeQuestion">
      <h2>Fill in the blank:</h2>
      <p className={resultFeedback.isCorrect ? "correct" : ""}>
        {resultFeedback.isCorrect
          ? cloze.sentence.replace("___", cloze.answer)
          : cloze.sentence}
      </p>

      <div className="options">
        {cloze.options.map((option) => (
          <button
            key={option}
            className="answerButtons"
            onClick={() => {
              const selectedOption = option;
              handleAnswer(selectedOption);
            }}
          >
            {option}
          </button>
        ))}
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
    </div>
  );
};

export default ClozeQuestion;
