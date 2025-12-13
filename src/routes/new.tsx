"use client";

import { NewLink } from "@/components";
import { useGetProfileInfo } from "@/hooks";
import { useGetUsersList } from "@/hooks/profile";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/new")({
	component: NewLink,
	beforeLoad: () => {
		useGetProfileInfo();
		useGetUsersList();
	},
	head: () => ({
		meta: [{ title: "New Link" }]
	})
});
