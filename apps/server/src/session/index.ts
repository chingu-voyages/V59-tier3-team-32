import { Router } from "express";
import { getSession } from "./session-handlers.js";

const router = Router();

router.get("/", getSession);

export default router;
