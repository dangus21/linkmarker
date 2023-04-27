
import { Database } from "@/lib/types";
import { GetServerSidePropsContext } from "next";
import { Navbar, NewLink } from "@/components";
import { User } from "@/state";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import SupaAuth from "@/components/supa_auth";

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
	return (
		<SupaAuth>
			<Navbar />
			<NewLink users={users} />
		</SupaAuth>
	);
}

export default NewPage;
