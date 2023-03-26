const {
	eslint: { configure }
} = require("@angusmiguel/es-configs");

module.exports = configure(["react", "ts"], {
	env: {
		browser: true,
		es2021: true
	},
	extends: [
		"eslint:recommended",
		"next/core-web-vitals",
		"plugin:@next/next/recommended",
		"prettier"
	]
});
