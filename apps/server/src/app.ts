// import { toNodeHandler } from "better-auth/node";
import cors from "cors";
import express from "express";
// import attemptsRouter from "./attempts/index.js";
import { corsConfig } from "./config/cors.js";
import flashcardsRouter from "./flashcards/index.js";
import healthRouter from "./health/index.js";
// import { auth } from "./lib/auth.js";
// import sessionRouter from "./session/index.js";

const app = express();

app.use(function logRequests(req, _, next) {
  console.info(new Date().toISOString().slice(11, 19), req.method, req.path);
  next();
});

app.use(cors(corsConfig));

// app.all("/api/auth/*splat", toNodeHandler(auth));

app.use(express.json());

app.use("/api/v1/health", healthRouter);
// app.use("/api/v1/session", sessionRouter);
app.use("/api/v1/flashcards", flashcardsRouter);
// app.use("/api/v1/attempts", attemptsRouter);

app.use(function onUnhandledRequests(_, res) {
  res.status(404).send({ message: "route not found" });
});

export default app;
