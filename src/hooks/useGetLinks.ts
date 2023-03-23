import { useEffect } from "react";
import { useGlobalState } from "@/state";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";

async function useGetLinks() {
	const supabaseClient = useSupabaseClient();

	const currentUser = useUser();
	const { set: setlinks } = useGlobalState(state => state.links);

	useEffect(() => {
		try {
			supabaseClient
				.from("links")
				.select()
				.then(({ data, error }) => {
					if (data && data?.length > 0) {
						setlinks(data);
					}
					if (error) {
						console.warn({ error });
						throw error;
					}
				});
		} catch (error) {
			console.warn(error);
		}
		return () => {
			setlinks([]);
		};
	}, [currentUser?.id]);

}

export { useGetLinks };