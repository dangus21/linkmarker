import { v4 as uuidv4 } from "uuid";

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
		id: uuidv4(),
		opened: false,
		postedDate: new Date() as unknown as string,
		reaction: null,
		title: link.title,
		who: userState.userName,
		url: link.origin
	} as Required<LinkState["new"]>;

	const newLinkObj = new URL(link.origin!);
	const match = newLinkObj.host.match(
		/^.*?\b(?:https?:\/\/)?(?:www\.)?([a-z0-9][a-z0-9-]*?[a-z0-9])\.[a-z]{2,}(?:$|\/)/i
	);

	newLink.origin = match![1];

	try {
		const { error } = await supabaseClient.from("links").insert(newLink);

		if (error) {
			console.warn({ error });
		} else {
			window.location.replace("/");
		}
	} catch (error) {
		console.warn(error);
	}
}

export { createLink };
