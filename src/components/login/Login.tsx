import { IconFacebook } from "./IconFacebook";
import { IconGoogle } from "./IconGoogle";
import { supabase } from "@/hooks/links";
import { useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import { useRouter } from "next/navigation";
import type { Session, User } from "@supabase/auth-js";

function Login() {
	const { push } = useRouter();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const [localUser, setLocalUser] = useLocalStorage<User | null>(
		"user",
		null
	);
	const [, setLocalSession] = useLocalStorage<Session | null>(
		"session",
		null
	);

	async function logIn() {
		const { data, error } = await supabase.auth.signInWithPassword({
			email,
			password
		});

		if (error) {
			console.error(error);
		}
		setLocalUser(data.user);
		setLocalSession(data.session);
	}

	useEffect(() => {
		if (localUser) {
			push("/links");
		}
	}, [localUser, push]);

	return (
		<div className="w-full rounded-lg bg-gray-800 p-6 shadow-lg md:w-1/2">
			<h3 className="mb-6 text-2xl font-semibold text-purple-400 md:text-3xl">
				Get Started
			</h3>
			<button
				onClick={() =>
					supabase.auth.signInWithOAuth({
						provider: "google",
						options: {
							redirectTo: "http://linkmarker.app/links"
						}
					})
				}
				type="button"
				className="mb-3 flex w-full items-center justify-center rounded bg-white px-4 py-2 text-gray-700"
			>
				<IconGoogle />
				<span className="ml-2">Sign in with Google</span>
			</button>

			<button
				onClick={() =>
					supabase.auth.signInWithOAuth({
						provider: "facebook",
						options: {
							redirectTo: "http://linkmarker.app/links"
						}
					})
				}
				type="button"
				className="mb-6 flex w-full items-center justify-center rounded bg-blue-600 px-4 py-2 text-white"
			>
				<IconFacebook />
				<span className="ml-2">Sign in with Facebook</span>
			</button>
			{process.env.NODE_ENV === "development" && (
				<>
					<div className="my-6 h-0.5 border-t-0 bg-neutral-100 dark:bg-white/10" />
					<form>
						<div className="mb-4">
							<label
								htmlFor="email"
								className="mb-1 block text-sm font-medium text-gray-400"
							>
								Email address
							</label>
							<input
								type="email"
								id="email"
								name="email"
								placeholder="Your email address"
								className="w-full rounded bg-gray-700 px-3 py-2 text-white placeholder:text-gray-500"
								onChange={(e) => setEmail(e.target.value)}
								value={email}
								required
							/>
						</div>

						<div className="mb-6">
							<label
								htmlFor="password"
								className="mb-1 block text-sm font-medium text-gray-400"
							>
								Your Password
							</label>
							<input
								type="password"
								id="password"
								name="password"
								placeholder="Your password"
								className="w-full rounded bg-gray-700 px-3 py-2 text-white placeholder:text-gray-500"
								onChange={(e) => setPassword(e.target.value)}
								value={password}
								required
							/>
						</div>

						<button
							type="button"
							className="mb-4 w-full rounded bg-purple-600 px-4 py-2 text-white"
							onClick={logIn}
						>
							Sign in
						</button>
					</form>
				</>
			)}
		</div>
	);
}

export { Login };
