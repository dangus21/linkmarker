import { Navbar, NewLink } from "@/components";
import { useGetProfileInfo } from "@/hooks";
import { supabase } from "@/hooks/links";
import type { User } from "@/state";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function NewPage() {
	const { push } = useRouter();
	const { session, user } = useGetProfileInfo();

	useEffect(() => {
		if (!user || !session) push("/");
	}, [user, session, push]);

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
		<>
			<Navbar />
			<NewLink users={users} />
		</>
	);
}

export default NewPage;
