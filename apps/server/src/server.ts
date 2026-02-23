import app from "./app.js";
import { SERVER_ENV } from "./config/env.js";
import { closeDb, pingDb } from "./database/index.js";

import type { Socket } from "node:net";

const { PORT } = SERVER_ENV

console.info("> server starting");

if (!await pingDb()) {
    console.error("> startup aborted: database unavailable");
    await closeDb().catch(console.error)
    process.exit(1);
}

const server = app.listen(PORT, async () => {
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

    server.close(async () => {
        console.info("> http server closed");

        try {
            await closeDb();
            process.exit(0);
        } catch (err) {
            console.error(err);
            process.exit(1);
        }
    })

    setTimeout(() => {
        console.error("> graceful shutdown timed out, forcing exit");
        process.exit(1);
    }, 10000)

    connections.forEach(connection => connection.end());
    setTimeout(() => connections.forEach(connection => connection.destroy()), 5000)
}
