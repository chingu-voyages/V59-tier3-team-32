import tsParser from "@typescript-eslint/parser";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettier from "eslint-config-prettier/flat";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    settings: {
      next: {
        rootDir: "apps/web"
      }
    }
  },

  {
    files: ["apps/*/src/**/*.{ts,tsx,js,jsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: [
          "./apps/web/tsconfig.json",
          "./apps/server/tsconfig.json",
        ],
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    rules: {
      "no-unused-vars": "warn",
      "@typescript-eslint/no-unused-vars": "warn",
    },
  },

  {
    files: ["apps/web/**/*.{ts,tsx,js,jsx}"],
    rules: {
      "@next/next/no-html-link-for-pages": "off",
    }
  },

  {
    files: ["apps/*/src/**/*.{ts,tsx,js,jsx}"],
    ...prettier,
  },

  globalIgnores([
    "**/node_modules/",
    "**/dist/",
    "**/build/",
    "**/.next/",
    "**/out/",
    "**/.next/cache/",
    "**/*.config.js",
    "**/*.config.mjs",
    "**/*.d.ts",
    "**/*.spec.ts",
    "**/*.test.ts",
    "**/*.test.tsx",
  ]),
]);
