import { Navbar, NewLink } from "@/components";
import { SupaAuth } from "@/components/supa_auth";
import { supabase } from "@/hooks/links";
import type { User } from "@/state";
import { useEffect, useState } from "react";

function NewPage() {
	const [users, setUsers] = useState<User[]>([]);

	useEffect(() => {
		async function getUsers() {
			const { data, error } = await supabase
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
	}, []);

	return (
		<SupaAuth>
			<Navbar />
			<NewLink users={users} />
		</SupaAuth>
	);
}

export default NewPage;
