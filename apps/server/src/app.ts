import express from "express";

const app = express();

app.use(function logRequests(req, _, next) {
    console.info(new Date().toISOString().slice(11, 19), req.method, req.path);
    next();
});

app.use(express.json());

app.get("/api/v1", (_, res) => res.send("hi"));

app.use(function onUnhandledRequests(_, res) {
    res.status(404).send({ message: "route not found" });
});

export default app;
