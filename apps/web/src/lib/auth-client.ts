import { createAuthClient } from "better-auth/react";

export const { signIn, signOut } = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_ORIGIN,
});
