import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import {
	useSession,
	useSupabaseClient,
	useUser
} from "@supabase/auth-helpers-react";

import { Database } from "@/lib/types";
import { useGetProfileInfo } from "@/hooks";
import Head from "next/head";

function SupaAuth({ children }: { children: React.ReactNode }) {
	const supabaseClient = useSupabaseClient<Database>();
	const session = useSession();
	const user = useUser();
	useGetProfileInfo({ user, session });

	return (
		<div className="bg-gray-900 min-h-screen">
			<Head>
				<title>Linkmarker</title>
			</Head>
			<>
				{!session || !user ? (
					<div
						className="text-white h-screen w-screen flex justify-center items-center bg-neutral-900 [&>div]:w-96"
					>
						<Auth
							supabaseClient={supabaseClient}
							appearance={{ theme: ThemeSupa }}
							theme="dark"
							providers={["google"]}
						/>
					</div>
				) : children
				}
			</>
		</div>
	);
}

export default SupaAuth;
