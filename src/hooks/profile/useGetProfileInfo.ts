import { Database } from "@/lib/types";
import { useEffect } from "react";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useUserGlobalState } from "@/state";

async function useGetProfileInfo() {
	const supabaseClient = useSupabaseClient<Database>();

	const currentUser = useUser();
	const globalUserState = useUserGlobalState();

	useEffect(() => {
		if (currentUser) {
			globalUserState.setEmail(currentUser.email || "");
			globalUserState.setId(currentUser.id);
		}
		return () => {
			globalUserState.setEmail("");
			globalUserState.setId("");
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentUser]);

	useEffect(() => {
		async function getUserAndProfile() {
			if (currentUser?.id) {
				try {
					const { data, error, status } = await supabaseClient
						.from("profiles")
						.select("username")
						.eq("id", currentUser?.id)
						.single();

					if (data && data.username) {
						globalUserState.setUserName(data.username);
					}

					const { data: avatarsData, error: avatarsError } =
						await supabaseClient.storage
							.from("avatars")
							.download(`${currentUser?.id}/avatar.jpg`);

					if (avatarsData) {
						globalUserState.setAvatar({
							img: URL.createObjectURL(avatarsData)
						});
					}

					if ((error && status !== 406) || avatarsError) {
						console.warn({error});

						throw error;
					}
				} catch (error) {
					console.warn("Failed loading user data");
				}
			}
		}
		if (!globalUserState.userName) {
			getUserAndProfile();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentUser?.id]);
}

export { useGetProfileInfo };
