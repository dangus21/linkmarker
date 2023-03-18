import pwaBuilder from "next-pwa";

const withPWA = pwaBuilder({
	dest: "public",
	register: true,
	skipWaiting: true,
	disable: process.env.NODE_ENV === "development",
	buildExcludes: [/middleware-manifest.json$/]
});

/** @type {import('next').NextConfig} */
const nextConfig = withPWA({
	reactStrictMode: true,
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "**",
				port: "",
				pathname: "**"
			}
		]
	}
});
export default nextConfig;
