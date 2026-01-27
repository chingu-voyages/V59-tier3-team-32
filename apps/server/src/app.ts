import cors from "cors";
import express from "express";
import { corsConfig } from "./config/cors.js";
import healthRouter from "./health/index.js";

const app = express();

app.use(function logRequests(req, _, next) {
    console.info(new Date().toISOString().slice(11, 19), req.method, req.path);
    next();
});

app.use(cors(corsConfig))
app.use(express.json());

app.use("/api/v1/health", healthRouter);

app.use(function onUnhandledRequests(_, res) {
    res.status(404).send({ message: "route not found" });
});

export default app;
