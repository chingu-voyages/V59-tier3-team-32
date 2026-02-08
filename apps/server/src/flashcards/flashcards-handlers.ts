import type { Request, Response } from "express";
import { loadJsonFile } from "../fs/loadJsonFile.js";
import { RoleParam } from "../enums/roleParam.js";
import type { Role } from "../types/role.js";

// import from absolute file path
const FLASHCARDS_URL = new URL("../../data/flashcards.json", import.meta.url);

// role in query parameter: role in flashcards
const FLASHCARDS_ROLE: Record<RoleParam, string> = {
  [RoleParam.SCRUM_PRODUCT_OWNER]: "Scrum Product Owner",
  [RoleParam.SCRUM_MASTER]: "Scrum Master",
  [RoleParam.UI_UX_DESIGNER]: "UI/UX Designer",
  [RoleParam.WEB_DEVELOPER]: "Web Developer",
  [RoleParam.PYTHON_DEVELOPER]: "Python Developer",
};

function isRoleParam(value: string) {
  return Object.values(RoleParam).includes(value as RoleParam);
}

export async function getFlashcards(req: Request, res: Response) {
  try {
    const flashcards = await loadJsonFile<Role[]>(FLASHCARDS_URL);
    const queryRole = req.query.role;

    if (typeof queryRole !== "string") {
      // queryRole is not a string
      res.status(400).json({
        error: "No role parameter was provided",
        allowedValues: Object.values(RoleParam),
      });
      return;
    }

    // queryRole is a string
    if (!isRoleParam(queryRole)) {
      // queryRole is not a valid roleParam
      res.status(400).json({
        error: "Invalid role parameter",
        allowedValues: Object.values(RoleParam),
      });
      return;
    }

    // queryRole can be cast as roleParam
    const flashcardsByRole = flashcards.filter((entry) => {
      return entry.role === FLASHCARDS_ROLE[queryRole as RoleParam];
    });

    res.status(200).json(flashcardsByRole);
  } catch {
    res.status(500).json({
      error: "Failed to load flashcards",
    });
  }
}
