import js from "@eslint/js";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import nextVitals from "eslint-config-next/core-web-vitals";
import prettier from "eslint-config-prettier";

const eslintConfig = [
    // Web (Next.js)
    ...nextVitals,
    {
        files: ["apps/web/**/*.{ts,tsx}"],
        languageOptions: {
            parser: tsParser,
            parserOptions: { ecmaVersion: 2023, sourceType: "module" },
        },
        plugins: { "@typescript-eslint": tsPlugin },
    },

    // Server (Node.js)
    js.configs.recommended,
    {
        files: ["apps/server/**/*.{ts,js}"],
        languageOptions: {
            parser: tsParser,
            parserOptions: { ecmaVersion: 2023, sourceType: "module" },
        },
    },

    prettier,
];

export default eslintConfig;