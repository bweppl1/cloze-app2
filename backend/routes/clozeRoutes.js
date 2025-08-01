import express from "express";
import { getRandomCloze } from "../controllers/clozeController.js";

const router = express.Router();
router.route("/:category").get(getRandomCloze);
export default router;
