import { Database } from "@/lib/types";
import { SupabaseClient } from "@supabase/auth-helpers-react";
import { TLink } from "@/state";

async function updateLinkInfo(
	{
		link,
		id,
		updateLink,
		supabaseClient
	}:
		{
			link: Database["public"]["Tables"]["links"]["Update"];
			id: string;
			updateLink: (link: TLink) => void;
			supabaseClient: SupabaseClient;
		}
) {
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
					throw error;
				}
			});

		if (error) {
			throw error;
		}
	} catch (error) {
		console.warn(error);
	}
}

export { updateLinkInfo };