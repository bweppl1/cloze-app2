import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import clozeRoutes from "./routes/clozeRoutes.js";

// port, listening for requests
const port = process.env.PORT;

// abstract sensitive information
dotenv.config();

// express
const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use("/api/cloze", clozeRoutes);

// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(port, () => {
      console.log(`Connected to DB & Listening on port ${port}!`);
    });
  })
  .catch((error) => {
    console.error("database error: ", error.message);
    process.exit(1);
  });
