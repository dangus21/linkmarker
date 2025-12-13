import { Toaster } from "react-hot-toast";

import {
	Outlet,
	createRootRoute,
	HeadContent,
	Scripts
} from "@tanstack/react-router";

import "../components/background/Background.css";
import globals from "../globals.css?url";
import styles from "../styles.css?url";

function App() {
	return (
		<html>
			<head>
				<HeadContent />
			</head>
			{/* <SessionContextProvider
			// supabaseClient={supabase}
			// initialSession={pageProps.initialSession}
		> */}
			<body className="min-h-screen bg-gray-900 text-white">
				<Outlet />
				<Scripts />
				<Toaster />
			</body>
			{/* </SessionContextProvider> */}
		</html>
	);
}

export const Route = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content:
					"width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
			},
			{ name: "theme-color", content: "#1f2937" },
			{ title: "Linkmarker - Save and Share Your Links" },
			{ httpEquiv: "X-UA-Compatible", content: "IE=edge" }
		],
		links: [
			{ rel: "stylesheet", href: globals },
			{ rel: "stylesheet", href: styles },
			{ rel: "manifest", href: "/manifest.json" },
			{
				rel: "apple-touch-icon",
				href: "/apple-touch-icon.png",
				sizes: "180x180"
			},
			{
				rel: "icon",
				href: "/favicon-32x32.png",
				type: "image/png",
				sizes: "32x32"
			},
			{
				rel: "icon",
				href: "/favicon-16x16.png",
				type: "image/png",
				sizes: "16x16"
			},
			{ rel: "shortcut icon", href: "/favicon.ico" }
		]
	}),
	component: App
});
