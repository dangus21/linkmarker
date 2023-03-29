import { Database } from "@/lib/types";
import { useEffect } from "react";
import { useLinkGlobalState } from "@/state";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";

async function useGetLinks() {
	const supabaseClient = useSupabaseClient<Database>();

	const currentUser = useUser();
	const { set: setLinks } = useLinkGlobalState();

	useEffect(() => {
		supabaseClient
			.from("links")
			.select()
			.or(`shareWith.cs.{${currentUser!.id}},or(isPublic.eq.true),or(by.eq.${currentUser!.id})`)
			.then(({ data, error }) => {
				if (data) {
					setLinks(data);
				}
				if (error) {
					console.warn({ error });
					throw error;
				}
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
}

export { useGetLinks };
