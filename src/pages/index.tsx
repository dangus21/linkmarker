import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useSession, useSupabaseClient, useUser } from "@supabase/auth-helpers-react";

import { useGetProfileInfo } from "@/hooks/useGetProfileInfo";

import { Database } from "@/lib/types";
import { Links, Navbar } from "@/components";

function Main() {
	const supabaseClient = useSupabaseClient<Database>();
	const session = useSession();
	const user = useUser();

	useGetProfileInfo();

	return (
		<div>
			{!session || !user ? (
				<div className="text-white h-screen w-screen flex justify-center items-center bg-neutral-900" style={{ padding: "50px 0 100px 0" }}>
					<Auth
						supabaseClient={supabaseClient}
						appearance={{ theme: ThemeSupa }}
						theme="dark"
						providers={[]}
					/>
				</div>
			) : (
				<>
					<Navbar />
					<Links />
				</>
			)}
		</div>
	);
}

export default Main;
