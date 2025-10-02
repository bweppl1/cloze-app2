import "dotenv/config";
import mongoose from "mongoose";
import { Word } from "../models/wordModel.js";

// Connect to MongoDB
const connectDB = async () => {
  if (mongoose.connections[0].readyState) return;
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "cloze-encounters",
    });
  } catch (error) {
    console.error("Database connection error:", error);
  }
};

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    await connectDB();

    const { category } = req.query;

    if (!category) {
      return res.status(400).json({ message: "Category is required" });
    }

    // Get random word from category
    const words = await Word.find({ category });

    if (words.length === 0) {
      return res
        .status(404)
        .json({ message: "No words found for this category" });
    }

    const randomWord = words[Math.floor(Math.random() * words.length)];

    // Create cloze sentence
    const sentence = randomWord.sentence.replace(randomWord.word, "_____");
    const options = randomWord.options || [randomWord.word];

    res.status(200).json({
      sentence,
      options,
      correctAnswer: randomWord.word,
      translation: randomWord.translation,
    });
  } catch (error) {
    console.error("API Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
