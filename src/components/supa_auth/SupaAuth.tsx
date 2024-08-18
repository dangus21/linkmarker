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

	// biome-ignore lint/correctness/useExhaustiveDependencies: not all deps needed
	useEffect(() => {
		setLocalUser(user);
		setLocalSession(session);

		if (user || session) {
			push("/links");
		} else {
			setLoading(false);
		}
	}, [session, user, push]);

	if (loading) {
		return (
			<div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
				<div className="text-2xl">Loading...</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gray-900 text-white">
			<>
				<div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4">
					<header className="text-center mb-8">
						<h1 className="text-5xl font-bold mb-4">Linkmarker</h1>
						<p className="text-xl">
							Your personal link library and sharing platform
						</p>
					</header>

					<main className="flex flex-col md:flex-row items-center justify-between w-full max-w-6xl">
						<div className="md:w-1/2 mb-8 md:mb-0">
							<h2 className="text-3xl font-semibold mb-4">
								Save, Organize, and Share
							</h2>
							<ul className="list-disc list-inside space-y-2">
								<li>Save links from anywhere on the web</li>
								<li>
									Organize your links with tags and
									collections
								</li>
								<li>
									Share your curated lists with friends and
									colleagues
								</li>
								<li>Access your links from any device</li>
							</ul>
						</div>

						<div className="w-3/4 bg-neutral-800 p-6 rounded-lg">
							<h3 className="text-2xl font-semibold mb-4">
								Get Started
							</h3>
							<Auth
								supabaseClient={supabase}
								appearance={{ theme: ThemeSupa }}
								theme="dark"
								providers={["google", "facebook"]}
								socialLayout="vertical"
								// redirectTo="http://localhost:3000/links"
							/>
						</div>
					</main>

					<footer className="mt-16 text-center">
						<p>&copy; 2024 Linkmarker. All rights reserved.</p>
					</footer>
				</div>
				<Background />
			</>
		</div>
	);
}

export { SupaAuth };
