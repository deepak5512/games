import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.config({
    extends: ["next/core-web-vitals", "next/typescript", "prettier"],
    rules: {
      semi: ["error"], // Use semi-colons after every line
      quotes: ["error", "double"], // Use Double Quotes instead of Single Quotes
      "prefer-arrow-callback": ["error"], // Use Arrow function
      "prefer-template": ["error"], // Use Template Literals
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }], // Disallow unused variables but allow those starting with _
      "no-console": ["warn", { allow: ["warn", "error"] }], // Warn about console.log but allow console.error and console.warn
      "react-hooks/rules-of-hooks": ["error"], // Consistent React Hooks usage
      "react-hooks/exhaustive-deps": ["warn"], // Consistent React Hooks usage
      "jsx-a11y/alt-text": ["warn"], // Warns when an <img> tag or similar element is missing an alt attribute
      // Use next/Image tag instead of <img>
      "react/forbid-elements": [
        "error",
        {
          forbid: [
            {
              element: "img",
              message: "Use <Image> from next/image instead of <img>.",
            },
          ],
        },
      ],
      // add new line above comment
      "lines-around-comment": [
        "error",
        {
          beforeLineComment: true,
          beforeBlockComment: true,
          allowBlockStart: true,
          allowClassStart: true,
          allowObjectStart: true,
          allowArrayStart: true,
        },
      ],
      // add new line above return
      "newline-before-return": "error",
      // add new line below import
      "import/newline-after-import": [
        "error",
        {
          count: 1,
        },
      ],
    },
  }),
];

export default eslintConfig;
