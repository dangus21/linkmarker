// import { next } from "million/compiler";
import pwaBuilder from "next-pwa";

const withPWA = pwaBuilder({
	dest: "public",
	register: true,
	skipWaiting: true,
	disable: process.env.NODE_ENV === "development",
});

/** @type {import('next').NextConfig} */
const nextConfig = withPWA({
	reactStrictMode: true,
	eslint: {
		ignoreDuringBuilds: true,
	},
});

// const millionConfig = {
// 	auto: true
// 	// if you're using RSC:
// 	// auto: { rsc: true },
// };

// export default next(nextConfig, millionConfig);
export default nextConfig;
