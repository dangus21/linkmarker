/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/**/*.{js,ts,jsx,tsx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}", // Note the addition of the `app` directory.
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				gray: {
					950: "#0d121c",
					1000: "#090c12",
				},
			},
		},
	},
	plugins: [require("tailwind-scrollbar")({ nocompatible: true })],
	mode: "jit",
};
