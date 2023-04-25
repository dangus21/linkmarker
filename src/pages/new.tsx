import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useSession, useSupabaseClient, useUser } from "@supabase/auth-helpers-react";

import { useGetProfileInfo } from "@/hooks";

import { Database } from "@/lib/types";
import { GetServerSidePropsContext } from "next";
import { Navbar, NewLink } from "@/components";
import { User } from "@/state";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import Head from "next/head";

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
	const supa = createServerSupabaseClient<Database>(ctx);
	const users = supa.from("profiles").select("username, id");
	return {
		props: {
			users: process.env.NODE_ENV === "production" ?
				((await users).data ?? []).filter(user => user.id !== "6550a93e-69c4-45ae-870e-c45f47586ceb") :
				(await users).data
		}
	};
}

function NewPage({ users }: { users: User[] }) {
	const supabaseClient = useSupabaseClient<Database>();
	const session = useSession();
	const user = useUser();

	useGetProfileInfo({ user, session });

	return (
		<>
			<Head>
				<title>Linkmarker - New link</title>
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
						<NewLink users={users} />
					</>
				)}
			</div>
		</>
	);
}

export default NewPage;
