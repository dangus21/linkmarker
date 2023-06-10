const withPWA = require("next-pwa")({
	dest: "public",
	register: true,
	skipWaiting: true,
	disable: process.env.NODE_ENV === "development"
});

/** @type {import('next').NextConfig} */
module.exports = withPWA({
	reactStrictMode: true,
	eslint: {
		ignoreDuringBuilds: true
	}
});
