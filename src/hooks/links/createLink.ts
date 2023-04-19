import { Database } from "@/lib/types";
import { LinkState, User, UserState } from "@/state";
import { SupabaseClient } from "@supabase/auth-helpers-react";

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
		share_with: (link.share_with || []).map((user) => (user as unknown as User)?.id),
		origin: ""
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
		console.warn({error});
	}
}

export { createLink };
