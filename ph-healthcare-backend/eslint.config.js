import eslint from "@eslint/js";
import { defineConfig } from "eslint/config";
import tslint from "typescript-eslint";

export default defineConfig(
    eslint.configs.recommended,
    tslint.configs.recommended,
    {
        rules: {
            "@typescript-eslint/no-unused-vars": "off",
            "@typescript-eslint/no-explicit-any": "off",
        },
    },
);
