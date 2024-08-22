import { supabase } from "@/hooks/links";
import type { Session, User } from "@supabase/auth-js";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import { IconFacebook } from "./IconFacebook";
import { IconGoogle } from "./IconGoogle";

function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const router = useRouter();

	const [localUser, setLocalUser] = useLocalStorage<User | null>(
		"user",
		null,
	);
	const [localSession, setLocalSession] = useLocalStorage<Session | null>(
		"session",
		null,
	);

	async function logIn() {
		const { data, error } = await supabase.auth.signInWithPassword({
			email,
			password,
		});
		if (error) {
			console.error(error);
		}
		setLocalUser(data.user);
		setLocalSession(data.session);
		router.push("/links");
	}

	async function signUp() {
		const { error } = await supabase.auth.signUp({ email, password });
		if (error) {
			console.error(error);
		}
		router.push("/links");
	}

	return (
		<div className="w-full md:w-1/2 bg-gray-800 p-6 rounded-lg shadow-lg">
			<h3 className="text-2xl md:text-3xl font-semibold mb-6 text-purple-400">
				Get Started
			</h3>
			<button
				onClick={() =>
					supabase.auth.signInWithOAuth({ provider: "google" })
				}
				type="button"
				className="w-full bg-white text-gray-700 py-2 px-4 rounded mb-3 flex items-center justify-center"
			>
				<IconGoogle />
				<span className="ml-2">Sign in with Google</span>
			</button>

			<button
				onClick={() =>
					supabase.auth.signInWithOAuth({ provider: "facebook" })
				}
				type="button"
				className="w-full bg-blue-600 text-white py-2 px-4 rounded mb-6 flex items-center justify-center"
			>
				<IconFacebook />
				<span className="ml-2">Sign in with Facebook</span>
			</button>

			<div className="mb-4">
				<label
					htmlFor="email"
					className="block text-sm font-medium text-gray-400 mb-1"
				>
					Email address
				</label>
				<input
					type="email"
					id="email"
					placeholder="Your email address"
					className="w-full bg-gray-700 text-white rounded px-3 py-2 placeholder-gray-500"
					onChange={(e) => setEmail(e.target.value)}
					value={email}
					required
				/>
			</div>

			<div className="mb-6">
				<label
					htmlFor="password"
					className="block text-sm font-medium text-gray-400 mb-1"
				>
					Your Password
				</label>
				<input
					type="password"
					id="password"
					placeholder="Your password"
					className="w-full bg-gray-700 text-white rounded px-3 py-2 placeholder-gray-500"
					onChange={(e) => setPassword(e.target.value)}
					value={password}
					required
				/>
			</div>

			<button
				type="button"
				className="w-full bg-purple-600 text-white py-2 px-4 rounded mb-4"
				onClick={logIn}
			>
				Sign in
			</button>

			{/* <div className="text-center text-sm">
				<a href="#" className="text-gray-400 hover:text-gray-300">
					Forgot your password?
				</a>
				<p className="mt-2 text-gray-400">
					Don't have an account?{" "}
					<a
						href="#"
						className="text-purple-400 hover:text-purple-300"
					>
						Sign up
					</a>
				</p>
			</div> */}
		</div>
	);
}

export { Login };
