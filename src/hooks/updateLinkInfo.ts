import { Database } from "@/lib/types";

import { SupabaseClient } from "@supabase/supabase-js";

async function updateLinkInfo(
	{
		supabase,
		link,
		id
	}:
		{
			supabase: SupabaseClient<Database>;
			link: Database["public"]["Tables"]["links"]["Update"];
			id: string;
		}
) {
	try {
		const { error } = await supabase.from("links").update(link).eq("id", id);

		if (error) {
			throw error;
		}
	} catch (error) {
		console.warn(error);
	}
}

export { updateLinkInfo };