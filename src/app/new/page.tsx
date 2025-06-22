"use client";

"use client";

import { Navbar, NewLink, LoadingSpinner } from "@/components"; // Added LoadingSpinner
import { useGetProfileInfo } from "@/hooks";
import { useGetUsersList } from "@/hooks/profile";
import { useUserGlobalState } from "@/state"; // Import useUserGlobalState
import NextProgress from "nextjs-progressbar";
import React, { Suspense } from "react"; // Import Suspense

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
function NewLinkContent() {
	// Call hooks to initiate data fetching
	useGetProfileInfo();
	useGetUsersList();

	const { usersList, hasAvatar, id: userId } = useUserGlobalState();

	// Determine if data is still loading for usersList or essential profile info (e.g. userId)
	// hasAvatar might be null initially, then true/false.
	// usersList might be null initially.
	// userId might be empty initially.
	if (usersList === null || hasAvatar === null || !userId) {
		// Throw a promise that resolves when usersList and hasAvatar are populated and userId is present
		throw waitForStore(
			(state) => state.usersList !== null && state.hasAvatar !== null && !!state.id,
			useUserGlobalState
		);
	}

	return <NewLink />;
}

function NewPage() {
	return (
		<>
			<NextProgress />
			<Navbar hideFilter />
			<Suspense fallback={<LoadingSpinner />}>
				<NewLinkContent />
			</Suspense>
		</>
	);
}

export default NewPage;
