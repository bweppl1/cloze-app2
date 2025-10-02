import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import clozeRoutes from "./routes/clozeRoutes.js";

// port, listening for requests
const port = process.env.PORT || 4000;

// abstract sensitive information
// dotenv.config();

// express
const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use("/api/cloze", clozeRoutes);

// connect to db
mongoose
  .connect(process.env.MONGO_URI, {
    dbName: "cloze-encounters",
  })
  .then(() => {
    console.log("Connected to DB!");
    // Only listen on port in development
    if (process.env.NODE_ENV !== "production") {
      app.listen(port, () => {
        console.log(`Listening on port ${port}!`);
      });
    }
  })
  .catch((error) => {
    console.error("database error: ", error.message);
    process.exit(1);
  });

// Export the app for Vercel
export default app;
