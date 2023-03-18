const { eslint: { configure } } = require("@angusmiguel/es-configs");

module.exports = configure(["react", "ts"], {
	extends: "next/core-web-vitals"
});
