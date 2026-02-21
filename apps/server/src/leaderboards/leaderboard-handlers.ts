import { getLeaderboardRows, getRoleBySlug } from "./leaderboard-queries.js";
import type { Request, Response } from "express";

const SLUG_REGEX = /^[a-z0-9-]+$/i;

export async function getLeaderboard(req: Request, res: Response) {
  const { slug } = req.params;

  if (typeof slug != "string" || !SLUG_REGEX.test(slug.trim())) {
    res.status(422).json({ message: "invalid slug" });
    return;
  }

  const normalizedSlug = slug.trim().toLowerCase();

  try {
    const role = await getRoleBySlug(normalizedSlug);
    if (!role) {
      res.status(404).json({ message: "role not found" });
      return;
    }

    const leaderboard = await getLeaderboardRows(role.id);
    res.json({ leaderboard });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "internal server error" });
  }
}
