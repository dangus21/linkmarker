/** @type {import('next').NextConfig} */
module.exports = {
	reactStrictMode: true
};

const withPWA = require("next-pwa");

/** @type {import('next-pwa').PWAConfig} */
const nextConfig = withPWA({
	dest: "public",
	register: true,
	skipWaiting: true,
	disable: process.env.NODE_ENV === "development"
});

module.exports = nextConfig;
