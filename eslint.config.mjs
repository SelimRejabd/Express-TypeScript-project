import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.{js,mjs,cjs,ts}"] },
  { languageOptions: { globals: globals.browser } },
  {
    rules: {
    eqeqeq: "off",
    "no-unused-vars": "error",
    "no-unused-expressions": "error",
    "prefer-const": ["error", { ignoreReadBeforeAssign: true }],
    "no-console" : "warn",
    "no-undef": "error"
    }
  },
  {
    ignores: [".node_modules/*"],
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];