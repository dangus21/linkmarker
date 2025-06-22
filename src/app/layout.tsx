"use client"; // Add this directive for client-side hooks and context
import { Toaster } from "react-hot-toast";
import { Analytics } from "@vercel/analytics/react";
import NextNProgress from "nextjs-progressbar";
import "../components/background/Background.css";
import "../globals.css";
import {
	SessionContextProvider,
	type Session,
} from "@supabase/auth-helpers-react";
import { supabase } from "@/hooks/links"; // Assuming this path is correct from app dir
import { useGetProfileInfo } from "@/hooks"; // Assuming this path is correct

// Component to handle client-side hooks like useGetProfileInfo
function ProfileInfoInitializer() {
	useGetProfileInfo();
	return null; // This component doesn't render anything
}

export const metadata = {
  title: "Linkmarker - Save and Share Your Links",
  description: "description of your project",
  manifest: "/manifest.json",
  themeColor: "#000",
  icons: {
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({
	children,
	// pageProps is not a direct prop in App Router RootLayout.
	// initialSession needs to be handled differently, perhaps fetched server-side or via a client component.
	// For now, we'll remove initialSession from props here and assume SessionContextProvider can handle it or we'll adjust later.
}: {
	children: React.ReactNode;
	// initialSession?: Session; // This was part of pageProps in _app.tsx
}) {
	return (
		<html lang="en">
			{/* <head> elements are now typically handled by exporting a metadata object */}
			<body className="min-h-screen bg-gray-900 text-white"> {/* Added classes from _document.tsx */}
				<SessionContextProvider
					supabaseClient={supabase}
					// initialSession={initialSession} // Revisit how to pass initialSession
				>
					<ProfileInfoInitializer /> {/* Component to run client hooks */}
					<NextNProgress />
					{children}
					<Toaster />
					<Analytics />
				</SessionContextProvider>
			</body>
		</html>
	);
}
