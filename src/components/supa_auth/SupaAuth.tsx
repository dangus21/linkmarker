import type { ReactNode } from "react";

import { useSession, useUser } from "@supabase/auth-helpers-react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

import { LoadingSpinner } from "@/components";
import { useGetProfileInfo } from "@/hooks";
import { supabase } from "@/hooks/links";
import { useUserGlobalState } from "@/state";
import Head from "next/head";
import { twMerge } from "tailwind-merge";

function SupaAuth({ children }: { children: ReactNode }) {
	const session = useSession();
	const user = useUser();
	console.log("LOG ~ user:", user);

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
							supabaseClient={supabase}
							appearance={{ theme: ThemeSupa }}
							providers={["google", "facebook"]}
							dark
							magicLink
							socialLayout="vertical"
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
