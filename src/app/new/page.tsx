"use client";

import { Navbar, NewLink } from "@/components";
import { useGetProfileInfo } from "@/hooks";
import { useGetUsersList } from "@/hooks/profile";
// NextProgress might need to be handled differently or within a layout if it's a global progress bar.
import NextProgress from "nextjs-progressbar";

function NewPage() {
	useGetProfileInfo(); // This hook is already in RootLayout, consider if needed here.
	useGetUsersList();

	return (
		<>
			<NextProgress />
			<Navbar hideFilter />
			<NewLink />
		</>
	);
}

export default NewPage;
