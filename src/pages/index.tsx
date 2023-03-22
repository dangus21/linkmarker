import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useSession } from "@supabase/auth-helpers-react";

import { useGetProfileInfo } from "@/hooks/useGetProfileInfo";
import { useGlobalState } from "@/state";

import { Links, Navbar, Profile } from "@/components";
import { supabaseClient } from "@/lib/supabaseClient";
import { useCallback } from "react";

function Main() {
	const session = useSession();
	const { current: currentNavigation } = useGlobalState(state => state.navigation);

	useGetProfileInfo();

	const PageToRender = useCallback(() => {
		if (currentNavigation === "LINKS") {
			return <Links />;
		}
		if (currentNavigation === "NEW_LINK") {
			return <>new link</>;
		}
		if (currentNavigation === "PROFILE") {
			return <Profile />;
		}

		return <div />;
	}, [currentNavigation]);

	return (
		<div>
			{!session ? (
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
					<PageToRender />

				</>
			)}
		</div>
	);
}

export default Main;
