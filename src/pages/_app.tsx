import { useState } from "react";
import { Toaster } from "react-hot-toast";

import { Analytics } from "@vercel/analytics/react";
import Head from "next/head";

import NextNProgress from "nextjs-progressbar";

import type { AppProps } from "next/app";
import "../styles/globals.css";

import type { Database } from "@/lib/types";
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import { type Session, SessionContextProvider } from "@supabase/auth-helpers-react";

//million-ignore
export default function App({
	Component,
	pageProps,
}: AppProps<{
	initialSession: Session;
}>) {
	const [supabase] = useState(() => createPagesBrowserClient<Database>());

	return (
		<>
			<Head>
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
