import { pingDb } from "../database/index.js";
import { usersTable } from "./health-schema.js";
import type { Request, Response } from "express";

export async function checkComponentsHealth(_: Request, res: Response) {
  console.log(usersTable);
  const diagnostics: Diagnostics = { status: "UP", database: "UP" };
  let status = 200;

  const dbOk = await pingDb();
  if (!dbOk) {
    status = 503;
    diagnostics.status = "DOWN";
    diagnostics.database = "DOWN";
  }

  res.status(status).json(diagnostics);
}

interface Diagnostics {
  [key: string]: "UP" | "DOWN";
}
