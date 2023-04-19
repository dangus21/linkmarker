import { useEffect } from "react";

import { Database } from "@/lib/types";
import {
	LinkState,
	User as StateUser,
	TLinkUpdate,
	UserState,
	useLinkGlobalState
} from "@/state";
import { SupabaseClient, User, useSupabaseClient, useUser } from "@supabase/auth-helpers-react";

async function deleteLink({
	supabaseClient,
	id,
	setLinks,
	currentUser
}: {
	supabaseClient: SupabaseClient<Database>;
	id: string;
	setLinks: LinkState["set"];
	currentUser: User["id"];
}) {
	try {
		const { error: deleteError } = await supabaseClient
			.from("links")
			.delete()
			.eq("id", id);

		const { data, error } = await supabaseClient
			.from("links")
			.select()
			.or(`share_with.cs.{${currentUser}},or(is_public.eq.true),or(by.eq.${currentUser})`)
			.order("posted_date", { ascending: false });

		if (data) {
			setLinks(data);
		}

		if (deleteError) {
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
	supabaseClient,
	userState,
	link
}: {
	supabaseClient: SupabaseClient<Database>;
	userState: UserState;
	link: LinkState["new"];
}) {
	const url = link.origin?.startsWith("http") ? link.origin : `http://${link.origin}`;
	const newLink = {
		reaction: null,
		title: link.title,
		who: userState.userName,
		url,
		by: userState.id,
		is_public: link.is_public || false,
		share_with: (link.share_with || []).map((user) => (user as unknown as StateUser)?.id),
		origin: "",
		is_deletable: link.is_deletable
	} satisfies LinkState["new"];

	const newLinkObj = new URL(url);
	const match = newLinkObj.host.match(
		/^.*?\b(?:https?:\/\/)?(?:www\.)?([a-z0-9][a-z0-9-]*?[a-z0-9])\.[a-z]{2,}(?:$|\/)/i
	);

	newLink.origin = match?.[1] ?? "unknown origin";

	try {
		const { error } = await supabaseClient.from("links").insert(newLink);

		if (error) {
			console.warn({ error });
		} else {
			window.location.replace("/");
		}
	} catch (error) {
		console.warn({ error });
	}
}

async function updateLinkInfo({
	link,
	id,
	updateLink,
	supabaseClient
}: {
	link: TLinkUpdate;
	id: string;
	updateLink: (link: TLinkUpdate) => void;
	supabaseClient: SupabaseClient<Database>;
}) {
	try {
		const { error } = await supabaseClient
			.from("links")
			.update(link)
			.eq("id", id);

		supabaseClient
			.from("links")
			.select()
			.eq("id", id)
			.single()
			.then(({ data, error }) => {
				if (data) {
					updateLink(data);
				}
				if (error) {
					console.warn({ error });

					throw error;
				}
			});

		if (error) {
			console.warn({ error });

			throw error;
		}
	} catch (error) {
		console.warn({ error });
	}
}

async function useGetLinks() {
	const supabaseClient = useSupabaseClient<Database>();

	const currentUser = useUser();
	const { set: setLinks, setLoading } = useLinkGlobalState();

	useEffect(() => {
		async function getLinks() {
			setLoading(true);
			const { data, error } = await supabaseClient
				.from("links")
				.select()
				.or(`share_with.cs.{${currentUser!.id}},or(is_public.eq.true),or(by.eq.${currentUser!.id})`)
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
	}, [currentUser, setLinks, setLoading, supabaseClient]);
}

export {
	createLink,
	deleteLink,
	updateLinkInfo,
	useGetLinks
};
