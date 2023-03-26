import { Database } from "@/lib/types";
import { createLink } from "@/hooks/createLink";
import { useLinkGlobalState, useUserGlobalState } from "@/state";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

function NewLink() {
	const supabaseClient = useSupabaseClient<Database>();
	const globalUserState = useUserGlobalState();
	const globalLinkState = useLinkGlobalState();

	return (
		<div className="flex min-h-full flex-col justify-center sm:px-6 lg:px-8">
			<div className="sm:mx-auto sm:w-full sm:max-w-md">
				<h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
					Link Information
				</h2>
			</div>
			<div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md">
				<div className="bg-white py-4 px-4 shadow sm:rounded-lg sm:px-10">
					<div className="space-y-6">
						<div className="relative">
							<label
								htmlFor="name"
								className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900"
							>
								Title
							</label>
							<input
								onChange={(e) => {
									globalLinkState.create({
										title: e.currentTarget.value
									});
								}}
								type="text"
								name="name"
								id="name"
								className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								placeholder="How the link will display"
							/>
						</div>
						<div className="relative">
							<label
								htmlFor="name"
								className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900"
							>
								Url
							</label>
							<input
								onChange={(e) => {
									globalLinkState.create({
										origin: e.currentTarget.value
									});
								}}
								type="text"
								name="name"
								id="name"
								className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								placeholder="https://www.tiktok.com/@tiktok"
							/>
						</div>

						<div>
							<button
								onClick={() =>
									createLink({
										supabaseClient,
										userState: globalUserState,
										link: globalLinkState.new
									})
								}
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
	);
}

export { NewLink };
