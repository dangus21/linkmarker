import { Background } from "../background";
import { Login } from "../login";
import { supabase } from "@/hooks/links";
import { useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";
import { useRouter } from "next/navigation";
import type { Session, User } from "@supabase/auth-js";

function Auth() {
	const { push } = useRouter();
	const [localUser, setLocalUser] = useLocalStorage<User | null>(
		"user",
		null
	);
	const [localSession, setLocalSession] = useLocalStorage<Session | null>(
		"session",
		null
	);

	useEffect(() => {
		async function getUserAndSession() {
			const {
				data: { session }
			} = await supabase.auth.getSession();
			const {
				data: { user }
			} = await supabase.auth.getUser();
			!localUser && setLocalUser(user);
			!localSession && setLocalSession(session);
		}
		getUserAndSession();
		if (localUser) {
			push("/links");
		}
	}, [localUser, localSession, push, setLocalUser, setLocalSession]);

	return (
		<div className="min-h-screen bg-gray-900 text-white">
			<div className="relative z-10 flex min-h-screen flex-col items-center justify-center p-4 md:p-8">
				<header className="mb-8 text-center md:mb-12">
					<h1 className="mb-4 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-4xl font-bold text-transparent md:text-6xl">
						Linkmarker
					</h1>
					<p className="text-lg text-gray-300 md:text-xl">
						Your personal link library and sharing platform
					</p>
				</header>
				<main className="flex w-full max-w-6xl flex-col items-center justify-between gap-8 md:gap-16">
					<div className="w-full rounded-lg bg-gray-800 p-6 shadow-lg md:w-1/2">
						<h2 className="mb-6 text-2xl font-semibold text-blue-400 md:text-3xl">
							Save, Organize, and Share
						</h2>
						<ul className="space-y-4 text-gray-300">
							<li className="flex items-center">
								<svg
									className="mr-2 size-6 text-green-500"
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
									className="mr-2 size-6 text-green-500"
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
									className="mr-2 size-6 text-green-500"
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
									className="mr-2 size-6 text-green-500"
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
					<Login />
				</main>
				<footer className="mt-12 text-center text-sm text-gray-400">
					<p>&copy; 2024 Linkmarker. All rights reserved.</p>
				</footer>
			</div>
			<Background />
		</div>
	);
}

export { Auth };
