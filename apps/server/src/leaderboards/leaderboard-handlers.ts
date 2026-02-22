import type { Request, Response } from "express";

export async function getLeaderboard(req: Request, res: Response) {
  const { slug } = req.params;

  res.json({ message: `STATUS: in construction. slug '${slug}' received` });
}
