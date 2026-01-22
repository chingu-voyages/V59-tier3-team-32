import app from "./app.js";
import { SERVER_ENV } from "./config/env.js";

import type { Socket } from "node:net";

const { PORT } = SERVER_ENV

console.info("> server starting");
const server = app.listen(PORT, () => {
    console.info(`> server listening on port ${PORT}`);
})

const connections = new Set<Socket>();
server.on("connection", (connection: Socket) => {
    connections.add(connection);
    connection.on("close", () => connections.delete(connection));
});

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

process.on("unhandledRejection", (err) => {
    console.error("> unhandled rejection");

    if (err instanceof Error) {
        console.error(err.name, err.message);
    } else {
        console.error(err);
    }

    shutdown();
    process.exit(1);
});

process.on("uncaughtException", (err) => {
    console.error("> uncaught exception");
    console.error(err.name, err.message);

    shutdown();
    process.exit(1);
});

function shutdown() {
    console.info("> attempting graceful shutdown");

    server.close(() => {
        console.info("> http server closed");
        process.exit(0);
    })

    setTimeout(() => {
        console.error("> graceful shutdown timed out, forcing exit");
        process.exit(1);
    }, 10000)

    connections.forEach(connection => connection.end());
    setTimeout(() => connections.forEach(connection => connection.destroy()), 5000)
}
