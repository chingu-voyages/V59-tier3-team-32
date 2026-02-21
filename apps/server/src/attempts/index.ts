import { Router } from "express";
import { getAttempts } from "./attempt-handlers.js";

const router = Router();

router.get("/", getAttempts);

export default router;
