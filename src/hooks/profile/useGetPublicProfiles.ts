import { Database } from "@/lib/types";
import { useEffect } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useUserGlobalState } from "@/state";

async function useGetPublicProfiles(dep: unknown) {
	const supabaseClient = useSupabaseClient<Database>();

	const globalUserState = useUserGlobalState();

	useEffect(() => {
		async function getUserAndProfile() {
			try {
				const { data, error, status } = await supabaseClient
					.from("profiles")
					.select()
					.eq("isAccountPublic", true)
					.not("id", "eq", globalUserState.id);

				console.log("LOG ~ ", { data, error, status });

				if (data) {
					globalUserState.setPublicUsers(data);
				}

				// const { data: avatarsData, error: avatarsError } =
				// 	await supabaseClient.storage
				// 		.from("avatars")
				// 		.download(`${currentUser?.id}/avatar.jpg`);

				// if (avatarsData) {
				// 	globalUserState.setAvatar({
				// 		img: URL.createObjectURL(avatarsData)
				// 	});
				// }

				// if ((error && status !== 406) || avatarsError) {
				// 	console.warn(error);

				// 	throw error;
				// }
			} catch (error) {
				console.warn("Failed loading user data");
			}
		}
		if (dep) {
			getUserAndProfile();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dep]);
}

export { useGetPublicProfiles };
