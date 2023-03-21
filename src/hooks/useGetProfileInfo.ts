import { blobToBase64 } from "@/utils";
import { useEffect } from "react";
import { useGlobalState } from "@/state";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";

async function useGetProfileInfo() {
	const currentUser = useUser();
	const globalUserState = useGlobalState(state => state.user);
	const supabase = useSupabaseClient();

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
					const { data, error, status } = await supabase
						.from("profiles")
						.select("username")
						.eq("id", currentUser?.id)
						.single();

					if (data) {
						globalUserState.setUserName(data.username);
					}

					const { data: avatarsData, error: avatarsError } =
						await supabase.storage
							.from("avatars")
							.download(`${currentUser?.id}/avatar.jpg`);

					if (avatarsData) {
						globalUserState.setAvatar({
							img: await blobToBase64(avatarsData)
						});
					}

					if ((error && status !== 406) || avatarsError) {
						throw error;
					}
				} catch (error) {
					console.warn("Failed loading user data");
				}
			}
		}
		getUserAndProfile();
		return () => {
			globalUserState.setAvatar({ img: "" });
			globalUserState.setUserName("");
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentUser?.id]);
}

export { useGetProfileInfo };