// const {
// 	eslint: { configure }
// } = require("@angusmiguel/es-configs");

module.exports = {
	env: {
		browser: true,
		es2021: true
	},
	extends: [
		"eslint:recommended",
		"next/core-web-vitals",
		"plugin:import/errors",
		"plugin:import/warnings",
		"prettier"
	],
	parser: "@typescript-eslint/parser",
	parserOptions: {
		project: "tsconfig.json"
	},
	plugins: [
		"react",
		"react-hooks",
		"unused-imports",
		"babel",
		"sort-imports-es6-autofix",
		"import",
		"@typescript-eslint"
	],
	rules: {
		// "no-mixed-spaces-and-tabs": ["error", "smart-tabs"]
		"react/react-in-jsx-scope": "off",
		"react/jsx-uses-react": "error",
		"react/jsx-uses-vars": "error",
		"react/prop-types": 0,
		"react-hooks/rules-of-hooks": "error",
		"react-hooks/exhaustive-deps": "warn",
		"react/jsx-curly-brace-presence": [
			"error",
			{
				props: "never",
				children: "never"
			}
		],
		"no-use-before-define": "error",
		"prefer-const": "error",
		"no-duplicate-imports": 2,
		"sort-imports-es6-autofix/sort-imports-es6": [
			2,
			{
				ignoreCase: false,
				ignoreMemberSort: false,
				memberSyntaxSortOrder: ["none", "all", "multiple", "single"]
			}
		],
		"no-unused-vars": [
			2,
			{
				ignoreRestSiblings: true
			}
		],
		"no-dupe-class-members": ["error"],
		"import/no-extraneous-dependencies": [
			"error",
			{
				devDependencies: true
			}
		],
		"prefer-template": ["error"],

		"@typescript-eslint/no-unused-vars": [2, { ignoreRestSiblings: true }],
		"@typescript-eslint/no-dupe-class-members": ["error"],
		"@typescript-eslint/adjacent-overload-signatures": "off",
		"@typescript-eslint/array-type": [
			"error",
			{
				default: "array"
			}
		],
		"@typescript-eslint/consistent-type-assertions": "error",
		"@typescript-eslint/dot-notation": "error",
		"@typescript-eslint/indent": "off",
		"@typescript-eslint/no-empty-function": "error",
		"@typescript-eslint/no-empty-interface": "error",
		"@typescript-eslint/no-explicit-any": "warn",
		"@typescript-eslint/no-misused-new": "error",
		"@typescript-eslint/no-namespace": "error",
		"@typescript-eslint/no-parameter-properties": "off",
		"@typescript-eslint/no-unused-expressions": "error",
		"@typescript-eslint/no-use-before-define": "warn",
		"@typescript-eslint/no-var-requires": "off",
		"@typescript-eslint/prefer-for-of": "error",
		"@typescript-eslint/prefer-function-type": "error",
		"@typescript-eslint/prefer-namespace-keyword": "error",
		"@typescript-eslint/quotes": "off",
		"@typescript-eslint/triple-slash-reference": [
			"error",
			{
				path: "always",
				types: "prefer-import",
				lib: "always"
			}
		],
		"@typescript-eslint/unified-signatures": "error",
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
	settings: {
		react: {
			version: "detect"
		},
		"import/resolver": {
			typescript: {} // this loads <rootdir>/tsconfig.json to eslint
		}
	}
};
