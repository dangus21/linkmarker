"use client";

import { Navbar, Profile } from "@/components";
import NextProgress from "nextjs-progressbar";

function ProfilePage() {
	return (
		<>
			<NextProgress />
			<Navbar hideFilter />
			<Profile />
		</>
	);
}

export default ProfilePage;
