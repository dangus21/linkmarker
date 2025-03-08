"use client";

import { Navbar, NewLink } from "@/components";
import { useGetProfileInfo } from "@/hooks";
import { useGetUsersList } from "@/hooks/profile";
import NextProgress from "nextjs-progressbar";

function NewPage() {
	useGetProfileInfo();
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
