import { Toaster } from "react-hot-toast";
import { useState } from "react";

import { Analytics } from "@vercel/analytics/react";
import Head from "next/head";

import "../styles/globals.css";
import type { AppProps } from "next/app";

import { Database } from "@/lib/types";
import { Session, SessionContextProvider } from "@supabase/auth-helpers-react";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";

export default function App({
	Component,
	pageProps
}: AppProps<{
	initialSession: Session;
}>) {
	const [supabase] = useState(() => createBrowserSupabaseClient<Database>());

	return (
		<>
			<Head>
				<meta charSet="utf-8" />
				<meta httpEquiv="X-UA-Compatible" content="IE=edge" />
				<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />
				<meta name="description" content="description of your project" />
				<meta name="theme-color" content="#000" />
				<link rel="manifest" href="/manifest.json" />
				<link rel="shortcut icon" href="/favicon.ico" />
			</Head>
			<SessionContextProvider
				supabaseClient={supabase}
				initialSession={pageProps.initialSession}
			>
				<Component {...pageProps} />
				<Toaster />
				<Analytics />
			</SessionContextProvider>
		</>
	);
}
