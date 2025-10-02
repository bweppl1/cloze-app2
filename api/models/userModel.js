import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true, // Ensure no duplicate usernames
      trim: true, // Remove whitespace
    },
    email: {
      type: String,
      required: true,
      unique: true, // Prevent duplicate emails
      match: [/.+\@.+\..+/, "Please enter a valid email"], // Basic email validation
    },
    password: {
      type: String, // Will store bcrypt hash
      required: true,
      minlength: 8, // Enforce minimum password length
    },
    wordProgress: {
      // Track progress per word
      type: Map, // Use Map for dynamic word IDs
      of: new Schema({
        memoryScore: {
          type: Number,
          default: 0, // Starts at 0, increases with correct answers
          min: 0, // Prevent negative scores
        },
        lastReviewed: {
          type: Date,
          default: Date.now, // Set to current time on creation
        },
        nextReviewDate: {
          type: Date,
          default: () => new Date(Date.now() + 24 * 60 * 60 * 1000), // Default: +1 day
        },
        timesReviewed: {
          type: Number,
          default: 0, // Track total reviews for analytics
        },
      }),
      default: {}, // Initialize as empty Map
    },
    achievements: {
      type: [String],
      default: [], // Initialize as empty array
    },
  },
  { timestamps: true }
); // Adds createdAt/updatedAt fields automatically

const User = mongoose.model("User", userSchema);
export default User;
