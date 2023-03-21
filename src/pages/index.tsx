// import { Auth } from "@supabase/auth-ui-react";
// import { ThemeSupa } from "@supabase/auth-ui-shared";

import { supabase } from "@/lib/supabaseClient";
import { useGetProfileInfo } from "@/hooks/useGetProfileInfo";
import { useGlobalState } from "@/state";
// import { useSupabaseClient } from "@supabase/auth-helpers-react";

import { Links, Navbar, Profile } from "@/components";
import { useCallback } from "react";

function Main() {
	// const supabase = useSupabaseClient();
	const { current: currentNavigation } = useGlobalState(state => state.navigation);
	console.log("component called");

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
			{/* {!session ? (
				<div className="text-white h-screen w-screen flex justify-center items-center bg-neutral-900" style={{ padding: "50px 0 100px 0" }}>
					<Auth
						supabaseClient={supabase}
						appearance={{ theme: ThemeSupa }}
						theme="dark"
						providers={[]}
					/>
				</div>
			) : ( */}
			<>
				<Navbar />
				<PageToRender />

			</>
			{/* )} */}
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
