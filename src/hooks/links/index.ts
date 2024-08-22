import { type CSSProperties, useEffect } from "react";

import {
	type LinkState,
	type User as StateUser,
	type TLinkUpdate,
	type UserState,
	useLinkGlobalState,
} from "@/state";
import { extractTopLevelDomain } from "@/utils";
import { createClient } from "@/utils/supabase/static-props";
import type { User } from "@supabase/auth-helpers-react";
import type { NextRouter } from "next/router";
import { toast } from "react-hot-toast";

export const supabase = createClient();

const toast_config = {
	style: {
		borderRadius: "10px",
		background: "#0d1421",
		color: "#fff",
		boxShadow: "0 3px 15px black",
	} as CSSProperties,
	position: "bottom-center",
	duration: 3000,
} as const;

const link_source =
	process.env.NODE_ENV === "development" ? "links_dev" : "links";

async function deleteLink({
	id,
	setLinks,
	currentUser,
}: {
	id: string;
	setLinks: LinkState["set"];
	currentUser: User["id"];
}) {
	try {
		const { error: deleteError } = await supabase
			.from(link_source)
			.delete()
			.eq("id", id);

		const { data, error } = await supabase
			.from(link_source)
			.select()
			.or(
				`share_with.cs.{${currentUser}},or(is_public.eq.true),or(by.eq.${currentUser})`,
			)
			.order("posted_date", { ascending: false });

		if (data) {
			setLinks(data);
			toast.success("Deleted link", toast_config);
		}

		if (deleteError) {
			toast.success("Failed to delete link", toast_config);
			console.warn({ error: deleteError });
		}
		if (error) {
			console.warn({ error });
		}
	} catch (error) {
		console.warn(error);
	}
}

async function createLink({
	userState,
	link,
	push,
}: {
	userState: UserState;
	link: LinkState["new"];
	push: NextRouter["push"];
}) {
	const url = link.origin?.startsWith("http")
		? link.origin
		: `http://${link.origin}`;
	const newLink = {
		reaction: null,
		title: link.title?.trim(),
		who: userState.userName,
		url,
		by: userState.id,
		is_public: link.is_public || false,
		share_with: (link.share_with || []).map(
			(user) => (user as unknown as StateUser)?.id,
		),
		origin: "",
		is_deletable: link.is_deletable,
	} satisfies LinkState["new"];

	const newLinkObj = new URL(url);

	newLink.origin = extractTopLevelDomain(newLinkObj) ?? "unknown origin";

	try {
		const { error } = await supabase.from(link_source).insert(newLink);

		if (error) {
			console.warn({ error });
			toast.error("Failed creating link", toast_config);
		} else {
			toast.success("Created new link", toast_config);
			push("/");
		}
	} catch (error) {
		console.warn({ error });
	}
}

async function updateLinkInfo({
	link,
	id,
	updateLink,
}: {
	link: TLinkUpdate;
	id: string;
	updateLink: (link: TLinkUpdate) => void;
}) {
	try {
		const { error } = await supabase
			.from(link_source)
			.update(link)
			.eq("id", id);

		const { data: updateData, error: updateError } = await supabase
			.from(link_source)
			.select()
			.eq("id", id)
			.single();

		if (updateData) {
			updateLink(updateData);
		}
		if (updateError) {
			console.error({ updateError });

			throw error;
		}

		if (error) {
			console.warn({ error });
			toast.error("Failed deleting link", toast_config);
			throw error;
		}
		toast.success("Updated link", toast_config);
	} catch (error) {
		console.warn({ error });
	}
}

async function useGetLinks(currentUser: User | null) {
	const { set: setLinks, setLoading } = useLinkGlobalState();
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (currentUser) {
			async function getLinks() {
				setLoading(true);
				const { data, error } = await supabase
					.from(link_source)
					.select()
					.or(
						`share_with.cs.{${
							currentUser?.id
						}},or(is_public.eq.true),or(by.eq.${currentUser?.id})`,
					)
					.order("posted_date", { ascending: false });

				if (error) {
					console.warn({ error });
					setLoading(false);
					throw error;
				}

				if (data) {
					setLoading(false);
					setLinks(data);
				}
			}
			getLinks();
		}
	}, []);
}

export { createLink, deleteLink, updateLinkInfo, useGetLinks };
