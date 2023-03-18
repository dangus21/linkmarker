import { type UserState, useUserGlobalState } from "@/state";
import { supabase } from "../links";
import { useCallback, useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";
import { usePathname, useRouter } from "next/navigation";
import type { Session, User } from "@supabase/auth-helpers-react";

async function updateProfileInfo({ userState }: { userState: UserState }) {
	try {
		const updates = {
			is_account_public: userState.is_public,
			username: userState.userName,
			updated_at: new Date().toISOString()
		};

		const { error } = await supabase
			.from("profiles")
			.update(updates)
			.eq("id", userState.id);

		if (error) throw error;

		if (userState.avatar.file) {
			const { error: avatarError } = await supabase.storage
				.from("avatars")
				.upload(`${userState.id}/avatar.jpg`, userState.avatar.file, {
					cacheControl: "3600",
					upsert: true
				});

			if (avatarError) throw avatarError;
		}
	} catch (error) {
		console.error("Failed to update profile:", error);
		// Here you might want to set an error state or show a notification to the user
	}
}

function useGetProfileInfo() {
	const { push } = useRouter();
	const pathName = usePathname();
	const [user, setLocalUser] = useLocalStorage<User | null>("user", null);
	const [session, setLocalSession] = useLocalStorage<Session | null>(
		"session",
		null
	);
	const { setEmail, setId, setUserName, setis_public, setAvatar } =
		useUserGlobalState();

	const getUserAndProfile = useCallback(async () => {
		if (!user?.id) {
			const {
				data: { user }
			} = await supabase.auth.getUser();
			const {
				data: { session }
			} = await supabase.auth.getSession();

			setLocalSession(session);
			setLocalUser(user);
		}

		if (user) {
			try {
				const [profileResponse, avatarResponse] = await Promise.all([
					supabase
						.from("profiles")
						.select()
						.eq("id", user.id)
						.single(),
					supabase.storage
						.from("avatars")
						.getPublicUrl(`${user.id}/avatar.jpg`)
				]);

				const { data: profileData, error: profileError } =
					profileResponse;
				const { data: avatarData } = avatarResponse;

				if (profileError && profileError.code !== "406") {
					throw profileError;
				}

				if (profileData?.username) {
					setUserName(profileData.username);
					setis_public(profileData.is_account_public);
				}

				if (avatarData) {
					setAvatar({ img: avatarData.publicUrl });
				}

				setEmail(user.email || "");
				setId(user.id);
			} catch (error) {
				console.error("Failed loading user data:", error);
			}
		}
	}, [
		user,
		setEmail,
		setId,
		setUserName,
		setis_public,
		setAvatar,
		setLocalSession,
		setLocalUser
	]);

	useEffect(() => {
		if (user && session) {
			getUserAndProfile();
		}
		if (pathName !== "/privacy_policy" && !user) {
			push("/");
		}
	}, [user, session, pathName, getUserAndProfile, push]);
}

export { updateProfileInfo, useGetProfileInfo };
