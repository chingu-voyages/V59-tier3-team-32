export const DATABASE_ENV = {
  URL: requireEnv("DATABASE_URL"),
};

export const SERVER_ENV = {
  FRONTEND_ORIGIN: requireEnv("FRONTEND_ORIGIN"),
  PORT: requireEnv("SERVER_PORT"),
};

export const AUTH_ENV = {
  BETTER_AUTH_URL: requireEnv("BETTER_AUTH_URL"),
  BETTER_AUTH_SECRET: requireEnv("BETTER_AUTH_SECRET"),
  GITHUB_CLIENT_ID: requireEnv("GITHUB_CLIENT_ID"),
  GITHUB_CLIENT_SECRET: requireEnv("GITHUB_CLIENT_SECRET"),
  GOOGLE_CLIENT_ID: requireEnv("GOOGLE_CLIENT_ID"),
  GOOGLE_CLIENT_SECRET: requireEnv("GOOGLE_CLIENT_SECRET"),
};

// TODO: can replace with zod validation
function requireEnv(key: string, required = true) {
  if (required && (typeof process.env[key] !== "string" || !process.env[key])) {
    throw new Error(`> ${key} not set, check your env vars`, {
      cause: { [key]: process.env[key] },
    });
  }

  return process.env[key] ?? "";
}
