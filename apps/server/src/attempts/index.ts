import { Router } from "express";
import { getAttempts } from "./attempts-handlers.js";

const router = Router();

router.get("/", getAttempts);

export default router;
