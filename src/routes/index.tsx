"use client";

import { Auth } from "@/components/auth";
import { useGetProfileInfo } from "@/hooks";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	component: Auth,
	head: () => ({
		meta: [{ title: "Linkmarker - Login" }]
	}),
	beforeLoad: () => {
		useGetProfileInfo();
	}
});
