import { Database } from "@/lib/types";
import { LinkState, UserState } from "@/state";
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
	const newLink = {
		reaction: null,
		title: link.title,
		who: userState.userName,
		url: link.origin,
		by: userState.id,
		isPublic: link.isPublic || false,
		shareWith: [],
		origin: ""
	} satisfies LinkState["new"];

	const newLinkObj = new URL(link.origin?.startsWith("http") ? link.origin : `http://${link.origin}`);
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
