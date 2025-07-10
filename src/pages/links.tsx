"use client";

"use client";

import { Links, LoadingSpinner, Navbar } from "@/components";
import { Tabs } from "@/components/tabs";
import { createClient } from "@/utils/supabase/component";
import { useEffect, useState } from "react";
import { useGetLinks, useGetProfileInfo } from "@/hooks";
import { useGetUsersList } from "@/hooks/profile";
import { useLinkGlobalState } from "@/state";
import { useRouter } from "next/navigation";
import type { User } from "@supabase/auth-js"; // Keep this if `useGetLinks` or other hooks still expect a user object directly

// import { useReadLocalStorage } from "usehooks-ts"; // No longer primarily relying on this for auth decision
import NextProgress from "nextjs-progressbar";

const supabase = createClient();

function LinksPage() {
	const router = useRouter();
	// const localUser = useReadLocalStorage<User | null>("user"); // Keep for now if hooks need it, but auth decision is separate
	const [isAuthenticated, setIsAuthenticated] = useState(false); // Track auth status
	const [checkingAuth, setCheckingAuth] = useState(true);
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		async function checkCurrentUser() {
			const {
				data: { user }
			} = await supabase.auth.getUser();
			setUser(user);
			if (user) {
				setIsAuthenticated(true);
			} else {
				router.push("/"); // Redirect to login if not authenticated
			}
			setCheckingAuth(false);
		}
		checkCurrentUser();
	}, []);

	useGetProfileInfo(); // These hooks might also depend on auth state
	useGetUsersList(); // Review these hooks if they make authenticated calls
	useGetLinks(user); // Pass the authenticated user to the hook

	const { loading: linksLoading } = useLinkGlobalState();

	useEffect(() => {
		const { data: authListener } = supabase.auth.onAuthStateChange(
			async (event) => {
				if (event === "SIGNED_OUT") {
					router.push("/");
				}
			}
		);
		return () => {
			authListener.subscription.unsubscribe();
		};
	}, [router]);

	if (checkingAuth || (isAuthenticated && linksLoading)) {
		return <LoadingSpinner />;
	}

	if (!isAuthenticated) {
		// This case should ideally be handled by the redirect,
		// but as a fallback, don't render the page content.
		// Or show a message, or rely on the redirect to `/`.
		// A loading spinner is already shown while checkingAuth.
		return <LoadingSpinner />; // Or null, or a message "Redirecting to login..."
	}

	return (
		<>
			<NextProgress />
			<Navbar />
			<Tabs />
			<Links />
		</>
	);
}

export default LinksPage;
