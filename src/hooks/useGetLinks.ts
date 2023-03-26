import { Database } from "@/lib/types";
import { useEffect } from "react";
import { useLinkGlobalState } from "@/state";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";

async function useGetLinks() {
	const supabaseClient = useSupabaseClient<Database>();

	const currentUser = useUser();
	const { set: setlinks } = useLinkGlobalState();

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
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentUser?.id]);
}

export { useGetLinks };
