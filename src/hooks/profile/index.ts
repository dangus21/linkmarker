import { type UserState, useUserGlobalState } from "@/state";
import type { Session, User } from "@supabase/auth-helpers-react";
import { useEffect } from "react";
import { supabase } from "../links";

async function updateProfileInfo({
	userState,
}: {
	userState: UserState;
}) {
	try {
		const updates = {
			is_account_public: userState.is_public,
			username: userState.userName,
			updated_at: new Date() as unknown as string,
		};

		const { error } = await supabase
			.from("profiles")
			.update(updates)
			.eq("id", userState.id);

		if (userState.avatar.file) {
			const { error: avatarError } = await supabase.storage
				.from("avatars")
				.upload(`${userState.id}/avatar.jpg`, userState.avatar.file, {
					cacheControl: "3600",
					upsert: true,
				});
			if (avatarError) {
				console.warn({ avatarError });
			}
		}

		if (error) {
			console.warn({ error });
		}
	} catch (error) {
		console.warn(error);
	}
}

async function useGetProfileInfo({
	user,
	session,
}: {
	user: User | null;
	session: Session | null;
}) {
	const globalUserState = useUserGlobalState();

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (user) {
			globalUserState.setEmail(user.email || "");
			globalUserState.setId(user.id);
		}
		return () => {
			globalUserState.setEmail("");
			globalUserState.setId("");
		};
	}, [user]);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		async function getUserAndProfile() {
			if (user?.id) {
				try {
					globalUserState.setHasAvatar(true);

					const { data, error, status } = await supabase
						.from("profiles")
						.select()
						.eq("id", user?.id)
						.single();

					const { data: avatarsData, error: avatarsError } =
						await supabase.storage
							.from("avatars")
							.download(`${user?.id}/avatar.jpg`);

					if (data?.username) {
						globalUserState.setUserName(data.username);
						globalUserState.setis_public(data.is_account_public);
					}
					if (avatarsData) {
						globalUserState.setAvatar({
							img: URL.createObjectURL(avatarsData),
						});
					}

					if (error && status !== 406) {
						console.warn({ user_error: error });

						throw error;
					}
					if (avatarsError) {
						globalUserState.setHasAvatar(false);
						console.warn({ avatarsError });

						throw error;
					}
				} catch (_error) {
					console.warn("Failed loading user data");
				}
			}
		}
		if (!!user && !!session && !globalUserState.userName) {
			getUserAndProfile();
		}
	}, [user]);
}

export { updateProfileInfo, useGetProfileInfo };
