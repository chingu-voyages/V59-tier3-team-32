import type { Request, Response } from "express";

export function checkComponentsHealth(_: Request, res: Response) {
    res.json({ status: "UP" });
}
