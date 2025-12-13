import { type UserState, useUserGlobalState } from "@/state";
import { supabase } from "../links";
import { useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";
import type { Session, User } from "@supabase/auth-helpers-react";
import { useLocation, useNavigate } from "@tanstack/react-router";

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
	}
}

async function useGetUsersList() {
	const { setUsersList, usersList } = useUserGlobalState();
	if (usersList && usersList.size > 0) {
		return;
	}

	const { data, error } = await supabase
		.from("profiles")
		.select("username, id");
	if (error) {
		console.error("Failed to get users list.", error);
		return;
	}

	setUsersList(data);
}

function useGetProfileInfo(): { user: boolean; session: boolean } {
	const push = useNavigate();
	const location = useLocation();
	const [user, setLocalUser] = useLocalStorage<User | null>("user", null);
	const [session, setLocalSession] = useLocalStorage<Session | null>(
		"session",
		null
	);
	const {
		setEmail,
		setId,
		setUserName,
		setIsPublic,
		setHasAvatar,
		setAvatar
	} = useUserGlobalState();

	async function getUserAndProfile() {
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
						.download(`${user.id}/avatar.jpg`)
				]);

				const { data: profileData, error: profileError } =
					profileResponse;
				const { data: avatarData, error: avatarError } = avatarResponse;

				if (profileError && profileError.code !== "406")
					throw profileError;

				setEmail(user.email || "");
				setId(user.id);
				setHasAvatar(!avatarError);

				if (profileData?.username) {
					setUserName(profileData.username);
					setIsPublic(profileData.is_account_public);
				}

				if (avatarData) {
					setAvatar({ img: URL.createObjectURL(avatarData) });
				}
			} catch (error) {
				console.error("Failed loading user data:", error);
			}
		}
	}

	useEffect(() => {
		if (user && session) {
			getUserAndProfile();
		}
		if (location.pathname !== "/privacy_policy" && !user) {
			push({ to: "/" });
		}
	}, [user, session, push]);

	return {
		user: !!user,
		session: !!session
	};
}

export { updateProfileInfo, useGetProfileInfo, useGetUsersList };
