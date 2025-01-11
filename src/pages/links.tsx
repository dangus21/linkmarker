"use client";

import { Links, LoadingSpinner, Navbar } from "@/components";
import { Tabs } from "@/components/tabs";
import { useGetLinks, useGetProfileInfo } from "@/hooks";
import { useGetUsersList } from "@/hooks/profile";
import { useLinkGlobalState } from "@/state";
import type { User } from "@supabase/auth-js";

import { useReadLocalStorage } from "usehooks-ts";
import NextProgress from "nextjs-progressbar";

function LinksPage() {
	const user = useReadLocalStorage<User | null>("user");

	useGetProfileInfo();
	useGetUsersList();
	useGetLinks(user);

	const { loading } = useLinkGlobalState();

	if (loading) {
		return <LoadingSpinner />;
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
