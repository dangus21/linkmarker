import { Button } from "../button";
import { Database } from "@/lib/types";
import { ProfileImage, ProfilePublicSwitch, ProfileUsername } from "./parts";
import { updateProfileInfo } from "@/hooks";
import { useRouter } from "next/router";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useUserGlobalState } from "@/state";

function Profile() {
	const supabaseClient = useSupabaseClient<Database>();
	const globalUserState = useUserGlobalState();
	const { push } = useRouter();

	async function deleteAccount() {
		try {
			await supabaseClient.functions.invoke('user-self-deletion')
			alert('Account deleted successfully!')
		} catch (error) {
			alert('Error deleting the account!')
			console.log(error)
		} finally {
			await supabaseClient.auth.signOut()
			push('/')
		}
	}

	return (
		<div className="flex min-h-full flex-col justify-center sm:px-6 lg:px-8">
			<div className="sm:mx-auto sm:w-full sm:max-w-md">
				<h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-300">
					Account details
				</h2>
			</div>

			<div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md">
				<div className="bg-gray-800 py-4 px-4 shadow sm:rounded-lg sm:px-10">
					<ProfileImage />
					<div className="space-y-6 pb-6">
						<ProfileUsername />
						<ProfilePublicSwitch />
						<Button
							onClick={() => {
								updateProfileInfo({
									userState: globalUserState,
									supabaseClient
								});
								push("/");
							}}
							type="submit"
						>
							Submit
						</Button>
						<Button
							className="bg-red-900 border-red-800 hover:bg-red-700"
							onClick={deleteAccount}
						>
							Delete Account
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}

export { Profile };
