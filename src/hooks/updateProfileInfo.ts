import { GlobalState } from "@/state";
import { SupabaseClient } from "@supabase/supabase-js";

async function updateProfileInfo(
	{
		userState,
		supabase
	}:
		{
			userState: GlobalState["user"];
			supabase: SupabaseClient;
		}
) {
	try {
		const updates = {
			id: userState.id,
			username: userState.userName,
			updated_at: new Date()
		};

		const { error } = await supabase.from("profiles").upsert(updates);

		const { error: avatarError } =
			await supabase.storage
				.from("avatars")
				.upload(
					`${userState.id}/avatar.${(userState?.avatar?.fileName ?? "").split(".").pop()}`,
					userState.avatar.file as File,
					{
						cacheControl: "3600",
						upsert: false
					}
				);

		if (error || avatarError) {
			console.warn({ error, avatarError });
		}

		if (error) {
			throw error;
		}
	} catch (error) {
		console.warn(error);
	}
}

export { updateProfileInfo };