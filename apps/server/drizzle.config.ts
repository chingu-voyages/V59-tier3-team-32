import { defineConfig } from 'drizzle-kit';
import { DATABASE_ENV } from "./src/config/env.ts";

export default defineConfig({
  out: './src/database/migrations',
  schema: './src/database/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: DATABASE_ENV.URL,
  },
});
