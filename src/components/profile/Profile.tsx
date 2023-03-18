import { SupabaseClient } from "@supabase/supabase-js";
import { useGlobalState } from "@/utils";

function Profile({
	supabase
}: {
	supabase: SupabaseClient;
}) {
	const globalState = useGlobalState();
	console.log("LOG ~ file: Profile.tsx:10 ~ globalState:", globalState);

	async function updateProfile() {
		try {
			const updates = {
				id: globalState.user.id,
				username: globalState.user.userName,
				updated_at: new Date()
			};

			const { error } = await supabase.from("profiles").upsert(updates);
			if (error) {
				throw error;
			}
		} catch (error) {
			console.warn(error);
		}
	}
	return (
		<>
			<div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
				<div className="sm:mx-auto sm:w-full sm:max-w-md">
					<img
						className="mx-auto h-12 w-auto"
						src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
						alt="Your Company"
					/>
					<h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
						Account details
					</h2>
				</div>

				<div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
					<div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
						<div className="space-y-6">
							<div>
								<label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
									Username
								</label>
								<div className="mt-2">
									<input
										onChange={(e) => { globalState.user.setUserName(e.currentTarget.value); }}
										value={globalState.user.userName}
										type="text"
										required
										className="block pl-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									/>
								</div>
							</div>

							<div>
								<label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
									E-mail
								</label>
								<div className="mt-2">
									<input
										onChange={(e) => { globalState.user.setEmail(e.currentTarget.value); }}
										value={globalState.user.email}
										id="email"
										name="email"
										type="email"
										autoComplete="email"
										required
										className="block pl-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									/>
								</div>
							</div>

							<div>
								<label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
									Password
								</label>
								<div className="mt-2">
									<input
										id="password"
										name="password"
										type="password"
										autoComplete="current-password"
										required
										className="block pl-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									/>
								</div>
							</div>

							<div>
								<button
									onClick={updateProfile}
									type="submit"
									className="flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
								>
									Submit
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export { Profile };