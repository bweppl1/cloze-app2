import { useState, useEffect } from "react";

const ClozeQuestion = ({ showTranslations }) => {
  const [cloze, setCloze] = useState(null);

  const top10 = ["de", "el", "la", "que", "en", "y", "a", "del", "se", "los"];

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

  const generateCloze = () => {
    const randomWord = top10[Math.floor(Math.random() * top10.length)];
    const clozes = clozeSentences[randomWord];
    let randomCloze = clozes[Math.floor(Math.random() * clozes.length)];

    const withTranslation = showTranslations
      ? randomCloze
      : randomCloze.split("(")[0].trim();

    setCloze(randomCloze);

    const wrongOptions = top10
      .filter((option) => option !== randomWord)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);

    setCloze({
      sentence: withTranslation,
      fullSentence: randomCloze,
      options: [...wrongOptions, randomWord].sort(() => 0.5 - Math.random()),
      answer: randomWord,
    });
  };

  // Toggle translations
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

  if (!cloze) return <div>Loading quiz...</div>;

  return (
    <div className="clozeQuestion">
      <h2>Fill in the blank:</h2>
      <p>{cloze.sentence}</p>

      <div className="options">
        {cloze.options.map((option) => (
          <button
            key={option}
            className="answerButtons"
            onClick={() => {
              alert(option === cloze.answer ? "Correct!" : "Wrong!");
              generateCloze(); // Load next question
            }}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ClozeQuestion;
