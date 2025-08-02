import Word from "../models/wordModel.js";

export const getRandomCloze = async (req, res) => {
  try {
    const requestedCategory = req.params.category; // "top10"
    console.log(`[DEBUG] Searching for category: ${requestedCategory}`);

    // 1. Debug the actual query being sent to MongoDB
    const words = await Word.find({ tags: requestedCategory });
    console.log(`[DEBUG] Found ${words.length} words`);

    if (!words.length) {
      // 2. Check what tags actually exist in DB
      const allTags = await Word.distinct("tags");
      console.log("[DEBUG] Available tags in DB:", allTags);

      return res.status(404).json({
        message: `No words found for '${requestedCategory}'. Available tags: ${allTags.join(
          ", "
        )}`,
      });
    }

    // ... rest of your existing logic ...
  } catch (error) {
    console.error("[ERROR] Controller failed:", error);
    res.status(500).json({
      error: error.message,
      stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
};
