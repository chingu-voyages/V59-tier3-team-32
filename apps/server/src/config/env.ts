export const DATABASE_ENV = {
    URL: requireEnv("DATABASE_URL")
}

export const SERVER_ENV = {
    FRONTEND_ORIGIN: requireEnv("FRONTEND_ORIGIN"),
    PORT: requireEnv("SERVER_PORT")
}

// TODO: can replace with zod validation
function requireEnv(key: string, required = true) {
    if (required && (typeof process.env[key] !== "string" || !process.env[key])) {
        throw new Error(`> ${key} not set, check your env vars`, {
            cause: { [key]: process.env[key] },
        })
    }

    return process.env[key] ?? "";
}
