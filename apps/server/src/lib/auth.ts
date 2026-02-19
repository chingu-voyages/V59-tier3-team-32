import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { makeDb } from "../database/index.js";

export const auth = betterAuth({
  database: drizzleAdapter(makeDb(), {
    provider: "pg",
  }),
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // 5 MINS
    },
  },
});
