import { Toaster } from "react-hot-toast";

import { Analytics } from "@vercel/analytics/react";
import Head from "next/head";

import NextNProgress from "nextjs-progressbar";

import "../components/background/Background.css";
import "../styles/globals.css";
import {
	type Session,
	SessionContextProvider
} from "@supabase/auth-helpers-react";
import { supabase } from "@/hooks/links";
import { useGetProfileInfo } from "@/hooks";
import type { AppProps } from "next/app";

export default function App({
	Component,
	pageProps
}: AppProps<{
	initialSession: Session;
}>) {
	useGetProfileInfo();

	return (
		<>
			<Head>
				<title>Linkmarker - Save and Share Your Links</title>
				<meta charSet="utf-8" />
				<meta httpEquiv="X-UA-Compatible" content="IE=edge" />
				<meta
					name="viewport"
					content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
				/>
				<meta
					name="description"
					content="description of your project"
				/>
				<meta name="theme-color" content="#000" />
				<link rel="manifest" href="/manifest.json" />
				<link rel="shortcut icon" href="/favicon.ico" />
			</Head>
			<SessionContextProvider
				supabaseClient={supabase}
				initialSession={pageProps.initialSession}
			>
				<NextNProgress />
				<Component {...pageProps} />
				<Toaster />
				<Analytics />
			</SessionContextProvider>
		</>
	);
}
