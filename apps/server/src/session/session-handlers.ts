import { fromNodeHeaders } from "better-auth/node";
import type { Request, Response } from "express";
import { auth } from "../lib/auth.js";

// THIS ENDPOINT IS ONLY MEANT TO ILLUSTRATE HOW TO ACCESS USER SESSION
export async function getSession(req: Request, res: Response) {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });

  if (!session) return res.status(401).json({ error: "Invalid session" });
  return res.status(200).json({ message: "Valid session" });
}
