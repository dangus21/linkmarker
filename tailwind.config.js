/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,ts,jsx,tsx}"],
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
};
