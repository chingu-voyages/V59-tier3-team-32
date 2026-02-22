import { Router } from "express";
import { getLeaderboard } from "./leaderboard-handlers.js";

const router = Router();

router.get("/:slug", getLeaderboard);

export default router;
