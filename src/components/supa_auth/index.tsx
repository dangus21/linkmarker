import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import {
	useSession,
	useSupabaseClient,
	useUser
} from "@supabase/auth-helpers-react";

import { Database } from "@/lib/types";
import { twMerge } from "tailwind-merge";
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
						className={
							twMerge(
								"text-white h-screen w-screen flex",
								"justify-center items-center bg-neutral-800",
								"[&>div]:w-[30rem] [&>div]:bg-neutral-900 [&>div]:px-6 [&>div]:py-4 [&>div]:rounded-lg"
							)}
					>
						<Auth
							theme="dark"
							supabaseClient={supabaseClient}
							appearance={{ theme: ThemeSupa }}
							providers={["google", "facebook"]}
						/>
					</div>
				) : children
				}
			</>
		</div>
	);
}

export default SupaAuth;
