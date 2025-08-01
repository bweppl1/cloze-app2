import Word from "../models/wordModel";
import mongoose from "mongoose";

// @desc    Get random cloze by category
// @route   GET /api/cloze/:category

export const getRandomCloze = async (req, res) => {
  try {
    // 1. Find all words in the specified category
    const words = await Word.find({ tags: req.params.category });

    if (!words.length) {
      return res
        .status(404)
        .json({ message: "No words found in this category" });
    }

    // 2. Select a random word
    const randomWord = words[Math.floor(Math.random() * words.length)];

    // 3. Select a random sentence from that word
    const randomSentence =
      randomWord.sentences[
        Math.floor(Math.random() * randomWord.sentences.length)
      ];

    // 4. Generate 3 wrong options (other words from same category)
    const wrongOptions = words
      .filter((word) => word.word !== randomWord.word)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3)
      .map((word) => word.word);

    // 5. Combine options and shuffle
    const allOptions = [randomWord.word, ...wrongOptions].sort(
      () => 0.5 - Math.random()
    );

    res.json({
      sentence: randomSentence,
      options: allOptions,
      correctAnswer: randomWord.word,
      translation: randomSentence.match(/\(([^)]+)\)/)?.[1] || "", // Extract translation
    });
  } catch (error) {
    res.status(500).json({ "clozeController error": error.message });
  }
};
