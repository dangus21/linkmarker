"use client";

import { Navbar, Profile } from "@/components";
// NextProgress might need to be handled differently or within a layout if it's a global progress bar.
import NextProgress from "nextjs-progressbar";

function ProfilePage() {
	// useGetProfileInfo(); // This hook is already in RootLayout via ProfileInfoInitializer
	// No need to call useGetProfileInfo here if it's globally handled in RootLayout
	return (
		<>
			<NextProgress />
			<Navbar hideFilter />
			<Profile />
		</>
	);
}

export default ProfilePage;
