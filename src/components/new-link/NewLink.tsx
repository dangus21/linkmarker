import { Database } from "@/lib/types";
import { Switch } from "@headlessui/react";
import { createLink } from "@/hooks";
import { useLinkGlobalState, useUserGlobalState } from "@/state";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(" ");
}

function NewLink() {
	const supabaseClient = useSupabaseClient<Database>();
	const globalUserState = useUserGlobalState();
	const globalLinkState = useLinkGlobalState();

	const isLinkPublic = globalLinkState.new.isPublic;

	return (
		<div className="flex min-h-full flex-col justify-center sm:px-6 lg:px-8">
			<div className="sm:mx-auto sm:w-full sm:max-w-md">
				<h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
					Link Information
				</h2>
			</div>
			<div className="mt-6 mx-auto w-full max-w-md">
				<div className="bg-white px-10 py-4 sm:shadow sm:rounded-lg">
					<div className="py-6">
						<div className="grid gap-10">
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
							<div className="relative">
								<label
									htmlFor="name"
									className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900"
								>

								</label>
								<Switch.Group as="div" className="flex items-center justify-between">
									<span className="flex flex-grow flex-col">
										<Switch.Label as="span" className="text-sm font-medium leading-6 text-gray-900" passive>
											Is this link public?
										</Switch.Label>
									</span>
									<Switch
										checked={isLinkPublic}
										onChange={(checked) => {
											globalLinkState.create({
												isPublic: checked
											});
										}} className={classNames(
											isLinkPublic ? "bg-indigo-600" : "bg-gray-200",
											"relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
										)}
									>
										<span
											aria-hidden="true"
											className={classNames(
												isLinkPublic ? "translate-x-5" : "translate-x-0",
												"pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
											)}
										/>
									</Switch>
								</Switch.Group>
							</div>
						</div>
						<div className="mt-12">
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
