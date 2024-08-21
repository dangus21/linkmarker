import { supabase } from "@/hooks/links";
import {
	type Session,
	type User,
	useSession,
	useUser,
} from "@supabase/auth-helpers-react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import { Background } from "../background";

function SupaAuth() {
	const { push } = useRouter();
	const [loading, setLoading] = useState(true);
	const [, setLocalUser] = useLocalStorage<User | null>("user", null);
	const [, setLocalSession] = useLocalStorage<Session | null>(
		"session",
		null,
	);
	const session = useSession();
	const user = useUser();

	useEffect(() => {
		setLocalUser(user);
		setLocalSession(session);

		if (user || session) {
			push("/links");
		} else {
			setLoading(false);
		}
	}, [session, user, push, setLocalUser, setLocalSession]);

	if (loading) {
		return (
			<div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
				<div className="text-2xl">Loading...</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gray-900 text-white">
			<div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4 md:p-8">
				<header className="text-center mb-8 md:mb-12">
					<h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text">
						Linkmarker
					</h1>
					<p className="text-lg md:text-xl text-gray-300">
						Your personal link library and sharing platform
					</p>
				</header>

				<main className="flex flex-col md:flex-row items-center justify-between w-full max-w-6xl gap-8 md:gap-16">
					<div className="w-full md:w-1/2 bg-gray-800 p-6 rounded-lg shadow-lg">
						<h2 className="text-2xl md:text-3xl font-semibold mb-6 text-blue-400">
							Save, Organize, and Share
						</h2>
						<ul className="space-y-4 text-gray-300">
							<li className="flex items-center">
								<svg
									className="w-6 h-6 mr-2 text-green-500"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<title>svg</title>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M5 13l4 4L19 7"
									/>
								</svg>
								Save links from anywhere on the web
							</li>
							<li className="flex items-center">
								<svg
									className="w-6 h-6 mr-2 text-green-500"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<title>svg</title>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M5 13l4 4L19 7"
									/>
								</svg>
								Organize your links with tags and collections
							</li>
							<li className="flex items-center">
								<svg
									className="w-6 h-6 mr-2 text-green-500"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<title>svg</title>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M5 13l4 4L19 7"
									/>
								</svg>
								Share your curated lists with friends and
								colleagues
							</li>
							<li className="flex items-center">
								<svg
									className="w-6 h-6 mr-2 text-green-500"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<title>svg</title>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M5 13l4 4L19 7"
									/>
								</svg>
								Access your links from any device
							</li>
						</ul>
					</div>

					<div className="w-full md:w-1/2 bg-gray-800 p-6 rounded-lg shadow-lg">
						<h3 className="text-2xl md:text-3xl font-semibold mb-6 text-purple-400">
							Get Started
						</h3>
						<Auth
							supabaseClient={supabase}
							appearance={{
								theme: ThemeSupa,
								variables: {
									default: {
										colors: {
											brand: "rgb(124 58 237)",
											brandAccent: "rgb(139 92 246)",
										},
									},
								},
							}}
							theme="dark"
							providers={["google", "facebook"]}
							socialLayout="vertical"
						/>
					</div>
				</main>

				<footer className="mt-12 text-center text-sm text-gray-400">
					<p>&copy; 2024 Linkmarker. All rights reserved.</p>
				</footer>
			</div>
			<Background />
		</div>
	);
}

export { SupaAuth };
