import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useSession, useSupabaseClient, useUser } from "@supabase/auth-helpers-react";

import { useGetProfileInfo } from "@/hooks";

import { Database } from "@/lib/types";
import { Navbar, Profile } from "@/components";
import Head from "next/head";

function ProfilePage() {
	const supabaseClient = useSupabaseClient<Database>();
	const session = useSession();
	const user = useUser();

	useGetProfileInfo({user, session});

	return (
		<div className="bg-gray-900 h-screen">
			<Head>
				<title>Linkmarker - Profile</title>
			</Head>
			<div>
				{!session || !user ? (
					<div
						className="text-white h-screen w-screen flex justify-center items-center bg-neutral-900 [&>div]:w-96"
						style={{ padding: "50px 0 100px 0" }}
					>
						<Auth
							supabaseClient={supabaseClient}
							appearance={{ theme: ThemeSupa }}
							theme="dark"
							providers={["google"]}
						/>
					</div>
				) : (
					<>
						<Navbar />
						<Profile />
					</>
				)}
			</div>
		</div>
	);
}

export default ProfilePage;
