import { Links } from "@/components";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/links")({
	component: Links,
	head: () => ({
		meta: [{ title: "Links" }]
	})
});
