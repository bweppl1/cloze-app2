import mongoose from "mongoose";

const Schema = mongoose.Schema;

const wordSchema = new Schema({
  word: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  sentences: {
    type: [String],
    required: true,
    unique: true,
  },
  tags: {
    type: [String],
    reqiured: true,
    default: [],
  },
});

const Word = mongoose.model("Word", wordSchema);
export default Word;
