import { supabase } from "@/hooks/links";
import { useRouter } from "next/router";
import { useState } from "react";
import {
	adjectives,
	animals,
	colors,
	uniqueNamesGenerator,
} from "unique-names-generator";

const randomName = uniqueNamesGenerator({
	dictionaries: [adjectives, colors, animals],
});

export default function LoginPage() {
	const router = useRouter();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	async function logIn() {
		const { error } = await supabase.auth.signInWithPassword({
			email,
			password,
		});
		if (error) {
			console.error(error);
		}
		router.push("/");
	}

	async function signUp() {
		console.log("LOG ~ randomName:", randomName);

		const { error } = await supabase.auth.signUp({
			email,
			password,
			options: { data: { username: randomName } },
		});
		if (error) {
			console.error(error);
		}
		router.push("/");
	}

	return (
		<main>
			<form>
				<button
					type="button"
					id="oauth"
					value={email}
					onClick={() =>
						supabase.auth.signInWithOAuth({ provider: "google" })
					}
				>
					oauth
				</button>
				<br />
				<br />
				<br />
				<label htmlFor="email">Email:</label>
				<input
					id="email"
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<label htmlFor="password">Password:</label>
				<input
					id="password"
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<br />

				<button type="button" onClick={logIn}>
					Log in
				</button>
				<br />
				<button type="button" onClick={signUp}>
					Sign up
				</button>
			</form>
		</main>
	);
}
