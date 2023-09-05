/** @type {import("prettier").Config} */
const config = {
	singleQuote: false,
	trailingComma: "none",
	endOfLine: "lf",
	printWidth: 80,
	useTabs: true,
	tabWidth: 4,
	bracketSpacing: true,
	arrowParens: "always",
	plugins: ["prettier-plugin-tailwindcss"],
};

export default config;
