import { GlobalState } from "@/state";
import { SupabaseClient } from "@supabase/auth-helpers-react";

async function createLink(
	{
		supabaseClient,
		userState,
		linksState
	}:
		{
			supabaseClient: SupabaseClient;
			userState: GlobalState["user"];
			linksState: GlobalState["links"]["new"];
		}
) {
	console.log("LOG ~ file: createLink.ts:16 ~ userState:", { userState, linksState });
	// try {
	// const { error } = await supabaseClient
	// 	.from("profiles")
	// 	.insert(linksState);

	// 	if (error) {
	// 		console.warn({ error });
	// 	}
	// } catch (error) {
	// 	console.warn(error);
	// }
}

export { createLink };