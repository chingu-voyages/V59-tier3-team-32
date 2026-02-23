import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { AUTH_ENV, SERVER_ENV } from "../config/env.js";
import { makeDb } from "../database/index.js";
import { account, session, user, verification } from "../database/schema.js";
import { oAuthProxy } from "better-auth/plugins";

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
    schema: { user, session, account, verification },
  }),
  trustedOrigins: [FRONTEND_ORIGIN],
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // 5 MINS
    },
  },
  // ...
  // 1. set cross domain cookies config in our backend's better auth config:
  advanced: {
    cookies: {
      /// only changes cookie rules for 'state' cookies (social signin uses those)
      state: {
        attributes: {
          sameSite: "none",
          secure: true,
          // partitioned: true, // this potentially causes the same issue, try with & without
        },
      },
    },
  },
  // ...
  // 2. setup oauth proxy
  plugins: [
    oAuthProxy({
      productionURL: "https://v59-tier3-team-32-server.vercel.app",
      // apparently setting this is not needed and will be inferred
      currentURL: "https://v59-tier3-team-32-web.vercel.app",
    }),
  ],
  // ...
  // 3. explicitly set the redirectURI
  socialProviders: {
    github: {
      clientId: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
    },
    google: {
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      redirectURI:
        "https://v59-tier3-team-32-server.vercel.app/api/auth/callback/google",
    },
  },
});
