import { Database } from "@/lib/types";
import { useEffect } from "react";
import { useLinkGlobalState } from "@/state";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";

async function useGetLinks() {
	const supabaseClient = useSupabaseClient<Database>();

	const currentUser = useUser();
	const { set: setLinks, setLoading } = useLinkGlobalState();

	useEffect(() => {
		async function getLinks() {
			setLoading(true);
			const { data, error } = await supabaseClient
				.from("links")
				.select()
				.or(`shareWith.cs.{${currentUser!.id}},or(isPublic.eq.true),or(by.eq.${currentUser!.id})`)
				.order("postedDate", { ascending: false });

			if (error) {
				console.warn({ error });
				setLoading(false);
				throw error;
			}

			if (data) {
				setLoading(false);
				setLinks(data);
			}

		}
		getLinks();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
}

export { useGetLinks };
