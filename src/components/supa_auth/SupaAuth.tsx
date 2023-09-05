import { ReactNode } from "react";

import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import {
	useSession,
	useSupabaseClient,
	useUser,
} from "@supabase/auth-helpers-react";

import { Database } from "@/lib/types";
import { LoadingSpinner } from "../loading-spinner";
import { twMerge } from "tailwind-merge";
import { useGetProfileInfo } from "@/hooks";
import { useUserGlobalState } from "@/state";
import Head from "next/head";

function SupaAuth({ children }: { children: ReactNode }) {
	const supabaseClient = useSupabaseClient<Database>();
	const session = useSession();
	const user = useUser();

	useGetProfileInfo({ user, session });
	const globalUserState = useUserGlobalState();

	return (
		<div className="min-h-screen bg-gray-900">
			<Head>
				<title>Linkmarker</title>
			</Head>
			<>
				{!session || !user ? (
					<div
						className={twMerge(
							"flex h-screen w-screen text-white",
							"items-center justify-center bg-neutral-800",
							"[&>div]:w-[30rem] [&>div]:bg-neutral-900",
							"[&>div]:rounded-lg [&>div]:px-6 [&>div]:py-4",
						)}
					>
						<Auth
							theme="dark"
							supabaseClient={supabaseClient}
							appearance={{ theme: ThemeSupa }}
							providers={["google", "facebook"]}
						/>
					</div>
				) : globalUserState.hasAvatar && !globalUserState.avatar.img ? (
					<div className="pt-[7rem]">
						<LoadingSpinner />
					</div>
				) : (
					children
				)}
			</>
		</div>
	);
}

export { SupaAuth };
