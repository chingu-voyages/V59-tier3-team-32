import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { DATABASE_ENV } from "../config/env.js";
import { createId, isCuid } from "@paralleldrive/cuid2";

let db: ReturnType<typeof drizzle> | undefined;
let pool: Pool | undefined;

export function makeDb() {
    if (!db) {
        try {
            console.info("> initializing database pool");
            pool = new Pool({ connectionString: DATABASE_ENV.URL, max: 10 });
            db = drizzle({ client: pool })
            console.info("> database pool initialized");
        } catch (err) {
            console.error("> database pool failed");
            throw err;
        }
    }

    return db;
}

export async function pingDb() {
    try {
        console.info("> testing connection to database");
        await makeDb().execute("SELECT 1");
        console.info("> database connected");
        return true;
    } catch (err) {
        console.error("> database connection failed")
        console.error(err);
        return false;
    }
}

export async function closeDb() {
    if (!pool) {
        return;
    }
    
    try {
        console.info("> closing database pool");
        const p = pool
        pool = undefined
        db = undefined

        await p.end()
        console.info("> database pool closed");
    } catch (err) {
        console.error("> error while closing database");
        throw err;
    }
}

export function makeId() {
    return createId()
}

export function isValidId(id: string) {
    return isCuid(id)
}
