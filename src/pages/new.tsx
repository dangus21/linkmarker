import { Navbar, NewLink } from "@/components";
import { SupaAuth } from "@/components/supa_auth";
import type { Database } from "@/lib/types";
import type { User } from "@/state";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";

function NewPage() {
	const [users, setUsers] = useState<User[]>([]);
	const supabaseClient = useSupabaseClient<Database>();

	useEffect(() => {
		async function getUsers() {
			const { data, error } = await supabaseClient
				.from("profiles")
				.select("username, id");
			if (error) {
				console.error({ usersError: error });
			} else {
				setUsers(data);
			}
		}
		getUsers();

		return () => {
			setUsers([]);
		};
	}, [supabaseClient]);

	return (
		<SupaAuth>
			<Navbar />
			<NewLink users={users} />
		</SupaAuth>
	);
}

export default NewPage;
