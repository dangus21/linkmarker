import { Database } from "@/lib/types";
import { SupabaseClient } from "@supabase/auth-helpers-react";
import { TLinkUpdate } from "@/state";

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
					console.warn(error);

					throw error;
				}
			});

		if (error) {
			console.warn(error);

			throw error;
		}
	} catch (error) {
		console.warn(error);
	}
}

export { updateLinkInfo };
