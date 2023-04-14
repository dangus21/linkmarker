import { Database } from "@/lib/types";
import { Session, User, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect } from "react";
import { useUserGlobalState } from "@/state";

async function useGetProfileInfo({user, session}: {user: User | null; session: Session | null}) {
	const supabaseClient = useSupabaseClient<Database>();

	const globalUserState = useUserGlobalState();

	useEffect(() => {
		if (user) {
			globalUserState.setEmail(user.email || "");
			globalUserState.setId(user.id);
		}
		return () => {
			globalUserState.setEmail("");
			globalUserState.setId("");
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user]);

	useEffect(() => {
		async function getUserAndProfile() {
			if (user?.id) {
				try {
					const { data, error, status } = await supabaseClient
						.from("profiles")
						.select("username")
						.eq("id", user?.id)
						.single();

					const { data: avatarsData, error: avatarsError } =
						await supabaseClient.storage
							.from("avatars")
							.download(`${user?.id}/avatar.jpg`);

					if (data && data.username) {
						globalUserState.setUserName(data.username);
					}
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
		if (!!user && !!session && !globalUserState.userName) {
			getUserAndProfile();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user]);
}

export { useGetProfileInfo };
