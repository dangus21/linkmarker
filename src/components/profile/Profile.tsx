import { updateProfileInfo } from "@/hooks";
import { Database } from "@/lib/types";
import { useUserGlobalState } from "@/state";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { Button } from "../button";
import { ProfileImage, ProfilePublicSwitch, ProfileUsername } from "./parts";

import { CSSProperties } from "react";
import { toast } from "react-hot-toast";

const toast_config = {
	style: {
		borderRadius: "10px",
		background: "#0d1421",
		color: "#fff",
		boxShadow: "0 3px 15px black",
	} as CSSProperties,
	position: "bottom-center",
	duration: 3000,
} as const;

function Profile() {
	const supabaseClient = useSupabaseClient<Database>();
	const globalUserState = useUserGlobalState();
	const { push } = useRouter();

	async function deleteAccount() {
		try {
			await supabaseClient.functions.invoke("user-self-deletion");
			toast.success("Account deleted successfully!", toast_config);
		} catch (error) {
			toast.error("Error deleting the account!", toast_config);
		} finally {
			await supabaseClient.auth.signOut();
			push("/");
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
				<div className="bg-gray-800 px-4 py-4 shadow sm:rounded-lg sm:px-10">
					<ProfileImage />
					<div className="space-y-6 pb-6">
						<ProfileUsername />
						<ProfilePublicSwitch />
						<Button
							onMouseDown={() => {
								updateProfileInfo({
									userState: globalUserState,
									supabaseClient,
								});
								push("/");
							}}
							type="submit"
						>
							Submit
						</Button>
						<Button
							className="border-red-800 bg-red-900 hover:bg-red-700"
							onMouseDown={deleteAccount}
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
