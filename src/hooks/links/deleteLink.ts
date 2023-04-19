import { Database } from "@/lib/types";
import { LinkState } from "@/state";
import { SupabaseClient, User } from "@supabase/auth-helpers-react";

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
			.or(`share_with.cs.{${currentUser}},or(isPublic.eq.true),or(by.eq.${currentUser})`)
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

export { deleteLink };
