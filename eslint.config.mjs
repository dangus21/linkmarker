import { FlatCompat } from "@eslint/eslintrc";
import { fileURLToPath } from "node:url";
import globals from "globals";
import js from "@eslint/js";
import path from "node:path";
import sortImportsES6 from "eslint-plugin-sort-imports-es6-autofix";
import tsParser from "@typescript-eslint/parser";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import unusedImports from "eslint-plugin-unused-imports";
import react from "eslint-plugin-react";
import reactCompiler from "eslint-plugin-react-compiler";
import reactHooks from "eslint-plugin-react-hooks";
import importPlugin from "eslint-plugin-import";
import nextPlugin from "@next/eslint-plugin-next";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
	baseDirectory: __dirname,
	recommendedConfig: js.configs.recommended,
	allConfig: js.configs.all
});

/** @type {import('eslint').Linter.Config[]} */
const configs = [
	...compat.config({
		extends: ["next", "plugin:@typescript-eslint/recommended"]
	}),
	{
		files: ["**/*.{js,jsx,ts,tsx}"],
		languageOptions: {
			parser: tsParser,
			parserOptions: {
				ecmaVersion: "latest",
				sourceType: "module",
				ecmaFeatures: { jsx: true }
			}
		},
		plugins: {
			react,
			"@typescript-eslint": typescriptEslint,
			"unused-imports": unusedImports,
			"sort-imports-es6-autofix": sortImportsES6,
			import: importPlugin,
			"react-hooks": reactHooks
		},
		settings: {
			react: { version: "detect" },
			"import/resolver": { typescript: {} }
		},
		rules: {
			...nextPlugin.configs.recommended.rules,
			"react-hooks/rules-of-hooks": "error",
			"react-hooks/exhaustive-deps": "warn",
			"unused-imports/no-unused-imports": "warn",
			"react-compiler/react-compiler": "error",
			"sort-imports-es6-autofix/sort-imports-es6": [
				2,
				{
					ignoreCase: false,
					ignoreMemberSort: false,
					memberSyntaxSortOrder: ["none", "all", "multiple", "single"]
				}
			],
			"react/react-in-jsx-scope": 0,
			"@typescript-eslint/no-unused-expressions": 0,
			"@typescript-eslint/no-unused-vars": [
				2,
				{ ignoreRestSiblings: true }
			],
			"@typescript-eslint/naming-convention": [
				"warn",
				{
					selector: "interface",
					format: ["PascalCase"],
					custom: {
						regex: "^I[A-Z]",
						match: false
					}
				}
			]
		},
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node
			},
			parser: tsParser
		}
	},
	reactCompiler.configs.recommended
];
