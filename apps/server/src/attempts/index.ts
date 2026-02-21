import { Router } from "express";
import { postAttempt, getAttempts } from "./attempt-handlers.js";

const router = Router();

router.post("/", postAttempt);
router.get("/", getAttempts);

export default router;
