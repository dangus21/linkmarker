"use client";

import { Navbar, NewLink } from "@/components";
import { supabase } from "@/hooks/links";
import { useEffect, useState } from "react";
import { useGetProfileInfo } from "@/hooks";
import NextProgress from "nextjs-progressbar";
import type { User } from "@/state";

function NewPage() {
	const [users, setUsers] = useState<User[]>([]);
	useGetProfileInfo();

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
			<NextProgress />
			<Navbar />
			<NewLink users={users} />
		</>
	);
}

export default NewPage;
