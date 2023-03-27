import { Database } from "@/lib/types";
import { createLink, useGetPublicProfiles } from "@/hooks";
import { useLinkGlobalState, useUserGlobalState } from "@/state";
import { useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Combobox, Switch } from "@headlessui/react";
;

function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(" ");
}

const people = [
	{
		id: 1,
		name: "Leslie Alexander",
		imageUrl:
			"https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
	}
];

function NewLink() {
	const supabaseClient = useSupabaseClient<Database>();
	const globalUserState = useUserGlobalState();
	const globalLinkState = useLinkGlobalState();

	const isLinkPublic = globalLinkState.new.isPublic;
	const isLinkShareable = globalLinkState.new.isShareable;

	const [query, setQuery] = useState("");
	const [selectedPerson, setSelectedPerson] = useState<any[]>([]);

	const selectedUsersForShare = globalUserState.publicUsers;

	useGetPublicProfiles(isLinkShareable);

	const filteredPeople =
		query === ""
			? people
			: people.filter((person) => {
				return person.name.toLowerCase().includes(query.toLowerCase());
			});

	return (
		<div className="flex min-h-full flex-col justify-center sm:px-6 lg:px-8">
			<div className="sm:mx-auto sm:w-full sm:max-w-md">
				<h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
					Link Information
				</h2>
				<h2>{globalUserState.id}</h2>
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
							<div className="relative">
								<Switch.Group as="div" className="flex items-center justify-between">
									<span className="flex flex-grow flex-col">
										<Switch.Label as="span" className="text-sm font-medium leading-6 text-gray-900" passive>
											Is this link shareable?
										</Switch.Label>
									</span>
									<Switch
										checked={isLinkShareable}
										onChange={(checked) => {
											globalLinkState.create({
												isShareable: checked
											});
										}} className={classNames(
											isLinkShareable ? "bg-indigo-600" : "bg-gray-200",
											"relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
										)}
									>
										<span
											aria-hidden="true"
											className={classNames(
												isLinkShareable ? "translate-x-5" : "translate-x-0",
												"pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
											)}
										/>
									</Switch>
								</Switch.Group>
							</div>
							{
								isLinkShareable && (
									<div className="relative">
										<Combobox
											as="div"
											value={selectedPerson}
											onChange={setSelectedPerson}
											multiple
										>
											<Combobox.Label className="block text-sm font-medium leading-6 text-gray-900">To whom?</Combobox.Label>
											<div className="relative mt-2">
												<Combobox.Input
													className="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-12 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
													onChange={(event) => setQuery(event.target.value)}
													displayValue={(person: Record<string, string>[]) => {
														return person.map(user => user?.username).join(", ");
													}}
												/>
												<Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
													<ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
												</Combobox.Button>

												{filteredPeople.length > 0 && (
													<Combobox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
														{selectedUsersForShare.map((person) => (
															<Combobox.Option
																key={person.id}
																value={person}
																className={({ active }) =>
																	classNames(
																		"relative cursor-default select-none py-2 pl-3 pr-9",
																		active ? "bg-indigo-600 text-white" : "text-gray-900"
																	)
																}
															>
																{({ active, selected }) => (
																	<>
																		<div className="flex items-center">
																			{/* <img src={person.} alt="" className="h-6 w-6 flex-shrink-0 rounded-full" /> */}
																			<span className={classNames("ml-3 truncate", selected ? "font-semibold" : "")}>{person.username}</span>
																		</div>

																		{selected && (
																			<span
																				className={classNames(
																					"absolute inset-y-0 right-0 flex items-center pr-4",
																					active ? "text-white" : "text-indigo-600"
																				)}
																			>
																				<CheckIcon className="h-5 w-5" aria-hidden="true" />
																			</span>
																		)}
																	</>
																)}
															</Combobox.Option>
														))}
													</Combobox.Options>
												)}
											</div>
										</Combobox>
									</div>
								)
							}
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
