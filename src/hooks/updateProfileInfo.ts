import { Database } from "@/lib/types";
import { SupabaseClient } from "@supabase/auth-helpers-react";
import { UserState } from "@/state";

async function updateProfileInfo({
	userState,
	supabaseClient
}: {
	userState: UserState;
	supabaseClient: SupabaseClient<Database>;
}) {
	try {
		const updates = {
			username: userState.userName,
			updated_at: new Date() as unknown as string
		};

		const { error } = await supabaseClient
			.from("profiles")
			.update(updates)
			.eq("id", userState.id);

		if (userState.avatar.file) {
			const { error: avatarError } = await supabaseClient.storage
				.from("avatars")
				.upload(`${userState.id}/avatar.jpg`, userState.avatar.file, {
					cacheControl: "3600",
					upsert: true
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

export { updateProfileInfo };
