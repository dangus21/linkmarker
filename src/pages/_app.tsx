import { useState } from "react";

import "../styles/globals.css";
import type { AppProps } from "next/app";

import { Database } from "@/lib/types";
import { Session, SessionContextProvider } from "@supabase/auth-helpers-react";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";

import { Analytics } from "@vercel/analytics/react";

export default function App({
	Component,
	pageProps
}: AppProps<{
	initialSession: Session;
}>) {
	const [supabase] = useState(() => createBrowserSupabaseClient<Database>());

	return (
		<SessionContextProvider
			supabaseClient={supabase}
			initialSession={pageProps.initialSession}
		>
			<Component {...pageProps} />
			<Analytics />
		</SessionContextProvider>
	);
}
