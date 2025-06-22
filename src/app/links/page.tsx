"use client";

"use client";

"use client";

import { Links, LoadingSpinner, Navbar } from "@/components";
import { Tabs } from "@/components/tabs";
import { useGetLinks, useGetProfileInfo } from "@/hooks";
import { useGetUsersList } from "@/hooks/profile";
import { useLinkGlobalState, useUserGlobalState } from "@/state"; // Import useLinkGlobalState
import type { User } from "@supabase/auth-js";
import { useReadLocalStorage } from "usehooks-ts";
import NextProgress from "nextjs-progressbar";
import React, { Suspense, useEffect } from "react"; // Import Suspense

// This utility creates a promise that resolves when the store condition is met.
// This is a simplified version for demonstration.
const waitForStore = <T,>(
	selector: (state: T) => boolean,
	useStore: () => T
): Promise<void> => {
	return new Promise((resolve) => {
		const unsubscribe = useStore.subscribe((state) => {
			if (selector(state)) {
				resolve();
				unsubscribe();
			}
		});
		// Initial check
		if (selector(useStore.getState())) {
			resolve();
			unsubscribe();
		}
	});
};


// This component will contain the data-dependent parts
function LinksContent() {
	const user = useReadLocalStorage<User | null>("user");

	// Call hooks to initiate data fetching
	useGetProfileInfo();
	useGetUsersList();
	useGetLinks(user);

	const { loading: linksLoading, values: linksValues } = useLinkGlobalState();
	const { usersList, hasAvatar } = useUserGlobalState(); // Assuming these indicate loading/readiness for profile/users

	// Determine if data is still loading.
	// This logic needs to be robust. For instance, check if initial fetch is done.
	// hasAvatar might be null initially, then true/false.
	// usersList might be null initially.
	// linksValues might be empty initially.

	// A more robust check would be needed here, e.g. if initial fetch has completed at least once
	// or if specific data required by <Links /> is actually present.
	// For this example, we'll primarily rely on linksLoading for the main content.
	// And assume profile/userList are either ready or <Links /> can handle their partial states.

	if (linksLoading) { // If primary data (links) is loading
		// Throw a promise that resolves when linksLoading is false
		throw waitForStore((state) => !state.loading, useLinkGlobalState);
	}

	// Potentially also check for usersList and profile info readiness if <Links/> strictly depends on them
	// For example:
	// if (usersList === null || hasAvatar === null) {
	//    throw waitForStore((state) => state.usersList !== null && state.hasAvatar !== null, useUserGlobalState);
	// }


	return <Links />;
}

function LinksPage() {
	return (
		<>
			<NextProgress />
			<Navbar />
			<Tabs />
			<Suspense fallback={<LoadingSpinner />}>
				<LinksContent />
			</Suspense>
		</>
	);
}

export default LinksPage;
