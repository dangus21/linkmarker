
module.exports = {
	env: {
		browser: true,
		node: true,
		es2021: true,
	},
	extends: [
		"plugin:react/recommended", // Uses the recommended rules from @eslint-plugin-react
		"plugin:@typescript-eslint/recommended", // Uses the recommended rules from @typescript-eslint/eslint-plugin
		"plugin:react-hooks/recommended",
		"plugin:@next/next/recommended",
		"plugin:tailwindcss/recommended",
		"prettier"
	],
	parser: "@typescript-eslint/parser",
	plugins: [
		"import",
		"unused-imports",
		"@typescript-eslint",
		"sort-imports-es6-autofix"
	],
	rules: {
		"sort-imports-es6-autofix/sort-imports-es6": [2, {
      "ignoreCase": false,
      "ignoreMemberSort": false,
      "memberSyntaxSortOrder": ["none", "all", "multiple", "single"]
    }],
		"react/react-in-jsx-scope": 0,
		"@typescript-eslint/no-unused-expressions": 0,
		"@typescript-eslint/no-unused-vars": [2, { ignoreRestSiblings: true }],
		"@typescript-eslint/naming-convention": [
			"warn",
			{
				selector: "interface",
				format: ["PascalCase"],
				custom: {
					regex: "^I[A-Z]",
					match: false,
				},
			},
		],
	},
	settings: {
		react: {
			version: "detect",
		},
		"import/resolver": {
			typescript: {}, // this loads <rootdir>/tsconfig.json to eslint
		},
	},
};
