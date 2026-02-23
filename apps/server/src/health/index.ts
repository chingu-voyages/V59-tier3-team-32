import { Router } from "express";
import { checkComponentsHealth } from "./health-handlers.js";

const router = Router();

router.get("/", checkComponentsHealth);

export default router;
