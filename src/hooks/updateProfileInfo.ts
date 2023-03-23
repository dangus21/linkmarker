import { GlobalState } from "@/state";
import { SupabaseClient } from "@supabase/auth-helpers-react";

async function updateProfileInfo(
	{
		userState,
		supabaseClient
	}:
		{
			userState: GlobalState["user"];
			supabaseClient: SupabaseClient;
		}
) {
	try {
		const updates = {
			username: userState.userName,
			updated_at: new Date()
		};

		const { error } = await supabaseClient
			.from("profiles")
			.update(updates)
			.eq("id", userState.id);

		const { error: avatarError } = await supabaseClient
			.storage
			.from("avatars")
			.upload(
				`${userState.id}/avatar.jpg`,
				userState.avatar.file!,
				{
					cacheControl: "3600",
					upsert: true
				}
			);
		if (avatarError) {
			console.warn({ avatarError });
		}

		if (error) {
			console.warn({ error });
		}
	} catch (error) {
		console.warn(error);
	}
}

export { updateProfileInfo };