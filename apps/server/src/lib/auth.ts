import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { makeDb } from "../database/index.js";
import { AUTH_ENV, SERVER_ENV } from "../config/env.js";

const {
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
} = AUTH_ENV;

const { FRONTEND_ORIGIN } = SERVER_ENV;

export const auth = betterAuth({
  database: drizzleAdapter(makeDb(), {
    provider: "pg",
  }),
  trustedOrigins: [FRONTEND_ORIGIN],
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // 5 MINS
    },
  },
  socialProviders: {
    github: {
      clientId: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
    },
    google: {
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
    },
  },
});
