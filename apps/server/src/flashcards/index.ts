import { Router } from "express";
import { getFlashcards } from "./flashcards-handlers.js";

const router = Router();

router.get("/", getFlashcards);

export default router;
