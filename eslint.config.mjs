import globals from "globals";
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import prettierPluginRecommended from "eslint-plugin-prettier/recommended";
import prettierPluginPrettier from "eslint-config-prettier/prettier.js";

export default [
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    ignores: ["dist/*"],
    languageOptions: {
      globals: {
        ...globals.jest,
        ...globals.node,
      },
    },
  },
  prettierPluginPrettier,
  prettierPluginRecommended,
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...tseslint.configs.stylistic,
];
