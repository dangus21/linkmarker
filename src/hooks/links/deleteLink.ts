import { Database } from "@/lib/types";
import { LinkState } from "@/state";
import { SupabaseClient } from "@supabase/auth-helpers-react";

async function deleteLink({
	supabaseClient,
	id,
	setLinks
}: {
	supabaseClient: SupabaseClient<Database>;
	id: string;
	setLinks: LinkState["set"];
}) {
	try {
		const { error } = await supabaseClient
			.from("links")
			.delete()
			.eq("id", id);

		supabaseClient
			.from("links")
			.select()
			.order("postedDate", { ascending: false })
			.then(({ data, error }) => {
				if (data) {
					setLinks(data);
				}
				if (error) {
					console.warn({ error });
					throw error;
				}
			});

		if (error) {
			console.warn({ error });
		}
	} catch (error) {
		console.warn(error);
	}
}

export { deleteLink };
