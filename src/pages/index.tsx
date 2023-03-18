import { Auth } from "@supabase/auth-ui-react";
import { Navbar } from "@/components/navbar";
import { Profile } from "@/components/profile";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/lib/supabaseClient";
import { useEffect } from "react";
import { useGlobalState } from "@/utils";
import { useSession, useSupabaseClient, useUser } from "@supabase/auth-helpers-react";

function Main() {
	const session = useSession();
	const supabase = useSupabaseClient();
	const currentUser = useUser();
	const globalState = useGlobalState();

	useEffect(() => {
		async function getProfile() {
			if (currentUser) {
				globalState.user.setEmail(currentUser.email);
				globalState.user.setId(currentUser.id);
			}
			if (currentUser?.id) {
				try {
					const { data, error, status } = await supabase
						.from("profiles")
						.select("username")
						.eq("id", currentUser?.id)
						.single();

					if (error && status !== 406) {
						throw error;
					}

					if (data) {
						globalState.user.setUserName(data.username);

					}
				} catch (error) {
					console.warn("Failed loading user data");
				}
			}
		}
		getProfile();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [session]);

	return (
		<div>
			{!session ? (
				<div className="text-white h-screen w-screen flex justify-center items-center bg-neutral-900" style={{ padding: "50px 0 100px 0" }}>
					<Auth
						supabaseClient={supabase}
						appearance={{ theme: ThemeSupa }}
						theme="dark"
						providers={[]}
					/>
				</div>
			) : (
				<>
					<Navbar />
					<Profile supabase={supabase} />
				</>
			)}
		</div>
	);
}

export async function getServerSideProps() {
	const { data } = await supabase.from("countries").select();

	return {
		props: {
			countries: data
		}
	};
}

export default Main;