module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: [
		"next/core-web-vitals",
		"plugin:import/errors",
		"plugin:import/warnings",
		"esconfigs/eslint",
	],
	parserOptions: {
		project: "tsconfig.json",
	},
	plugins: ["react", "react-hooks", "babel"],
	settings: {
		react: {
			version: "detect",
		},
		"import/resolver": {
			typescript: {}, // this loads <rootdir>/tsconfig.json to eslint
		},
	},
};
