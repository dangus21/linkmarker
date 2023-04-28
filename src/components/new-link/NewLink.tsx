import { Database } from "@/lib/types";
import { User, useLinkGlobalState, useUserGlobalState } from "@/state";
import { createLink } from "@/hooks";
import { useEffect, useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

import { Combobox, Switch } from "@headlessui/react";
import { classNames, isLink } from "@/utils";
import { useRouter } from "next/router";

import { Button } from "../button";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Input } from "../input";

function NewLink({ users }: { users: User[] }) {
	const supabaseClient = useSupabaseClient<Database>();
	const globalUserState = useUserGlobalState();
	const globalLinkState = useLinkGlobalState();

	const isLinkPublic = globalLinkState.new.is_public;
	const isLinkShareable = globalLinkState.new.is_shareable;
	const isLinkDeletable = globalLinkState.new.is_deletable;

	const [, setQuery] = useState("");

	const router = useRouter();
	const isFromShareUI = Object.keys(router.query).some(queryEl => ["text", "url", "title"].includes(queryEl));

	const publicUsers = users.filter(user => user.id !== globalUserState.id);

	useEffect(() => {
		if (isFromShareUI && !("origin" in globalLinkState.new) && (router.query.text || router.query.url)) {
			const isTextQueryLink = isLink(router.query.text as string);
			globalLinkState.create({
				origin: (isTextQueryLink ? router.query.text : router.query.url) as string || ""
			});
		}
		if (isFromShareUI && !("title" in globalLinkState.new) && router.query.title) {
			const isTextQueryLink = isLink(router.query.title as string);
			globalLinkState.create({
				title: !isTextQueryLink ? router.query.title as string : ""
			});
		}
	}, [isFromShareUI, router.query, globalLinkState]);

	const isSubmitButtonDisabled = (
		!globalLinkState.new.title ||
		!globalLinkState.new.origin || (
			globalLinkState.new.is_shareable &&
			globalLinkState.new.share_with?.length === 0
		)
	);

	return (
		<div className="flex min-h-full flex-col justify-center sm:px-6 lg:px-8">
			<div className="sm:mx-auto sm:w-full sm:max-w-md">
				<h2 className="text-gray-100 mt-6 text-center text-3xl font-bold tracking-tight">
					Link Information
				</h2>
			</div>
			<div className="px-4 mt-6 mx-auto w-full max-w-md">
				<div className="bg-gray-800 px-10 py-4 sm:shadow rounded-md sm:rounded-lg">
					<div className="py-6">
						<div className="grid gap-10">
							<div className="relative">
								<label
									htmlFor="name"
									className="absolute -top-6 left-2 inline-block px-1 text-xs font-medium text-gray-300"
								>
									Title
								</label>
								<Input
									id="title"
									placeHolder="How the link will display"
									value={globalLinkState.new.title || ""}
									onChange={(event) => globalLinkState.create({
										title: event.currentTarget.value
									})}
								/>
							</div>
							<div className="relative">
								<label
									htmlFor="name"
									className="absolute -top-6 left-2 inline-block px-1 text-xs font-medium text-gray-300"
								>
									Url
								</label>
								<Input
									id="url"
									placeHolder="https://www.tiktok.com/@tiktok"
									value={globalLinkState.new.origin || ""}
									onChange={(event) => globalLinkState.create({
										origin: event.currentTarget.value
									})}
								/>
							</div>
							<div className="relative">
								<Switch.Group as="div" className="flex items-center justify-between">
									<span className="flex flex-grow flex-col">
										<Switch.Label as="span" className="text-sm font-medium leading-6 text-gray-300" passive>
											Is this link deletable by others?
										</Switch.Label>
									</span>
									<Switch
										checked={isLinkDeletable || false}
										onChange={(checked) => {
											globalLinkState.create({
												is_deletable: checked
											});
										}} className={classNames(
											isLinkDeletable ? "bg-indigo-800" : "bg-gray-700",
											"relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
										)}
									>
										<span
											aria-hidden="true"
											className={classNames(
												isLinkDeletable ? "translate-x-5" : "translate-x-0",
												"pointer-events-none inline-block h-5 w-5 transform rounded-full bg-indigo-100 shadow ring-0 transition duration-200 ease-in-out"
											)}
										/>
									</Switch>
								</Switch.Group>
							</div>
							<div className="relative">
								<Switch.Group as="div" className="flex items-center justify-between">
									<span className="flex flex-grow flex-col">
										<Switch.Label as="span" className="text-sm font-medium leading-6 text-gray-300" passive>
											Is this link public?
										</Switch.Label>
									</span>
									<Switch
										checked={isLinkPublic || false}
										onChange={(checked) => {
											globalLinkState.create({
												is_public: checked,
												...(checked && { share_with: [] }),
												...(checked && { is_shareable: false })
											});
										}} className={classNames(
											isLinkPublic ? "bg-indigo-800" : "bg-gray-700",
											"relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
										)}
									>
										<span
											aria-hidden="true"
											className={classNames(
												isLinkPublic ? "translate-x-5" : "translate-x-0",
												"pointer-events-none inline-block h-5 w-5 transform rounded-full bg-indigo-100 shadow ring-0 transition duration-200 ease-in-out"
											)}
										/>
									</Switch>
								</Switch.Group>
							</div>
							{
								!globalLinkState.new.is_public &&
								<div className="relative">
									<Switch.Group as="div" className="flex items-center justify-between">
										<span className="flex flex-grow flex-col">
											<Switch.Label as="span" className="text-sm font-medium leading-6 text-gray-300" passive>
												Is this link shareable?
											</Switch.Label>
										</span>
										<Switch
											checked={isLinkShareable || false}
											onChange={(checked) => {
												globalLinkState.create({
													is_shareable: checked,
													...(!checked && { share_with: [] })
												});
											}}
											className={classNames(
												isLinkShareable ? "bg-indigo-800" : "bg-gray-700",
												"relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
											)}
										>
											<span
												aria-hidden="true"
												className={classNames(
													isLinkShareable ? "translate-x-5" : "translate-x-0",
													"pointer-events-none inline-block h-5 w-5 transform rounded-full bg-indigo-100 shadow ring-0 transition duration-200 ease-in-out"
												)}
											/>
										</Switch>
									</Switch.Group>
								</div>
							}
							{
								isLinkShareable && (
									<div className="relative">
										<Combobox
											as="div"
											value={globalLinkState.new.share_with || []}
											onChange={(checked) => {
												globalLinkState.create({
													share_with: checked
												});
											}}
											multiple
										>
											<Combobox.Label className="block text-sm font-medium leading-6 text-gray-300">To whom?</Combobox.Label>
											<div className="relative mt-2">
												<Combobox.Input
													className="bg-gray-900 block w-full rounded-md border-0 py-1.5 pl-4 text-gray-100 ring-1 ring-inset ring-black placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6 focus-visible:outline focus-visible:outline-1 focus-visible:outline-black"
													placeholder="Single or multiple user"
													onChange={(event) => setQuery(event.target.value)}
													displayValue={(person: Record<string, string>[]) => {
														return person.map(user => user?.username).join(", ");
													}}
												/>
												<Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
													<ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
												</Combobox.Button>

												{publicUsers.length > 0 && (
													<Combobox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-gray-900 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
														{publicUsers.map((user) => (
															<Combobox.Option
																key={user.id}
																value={user}
																className={({ active }) =>
																	classNames(
																		"relative cursor-default select-none py-2 pl-3 pr-9 text-white",
																		active ? "bg-gray-800" : "text-gray-900"
																	)
																}
															>
																{({ active, selected }) => (
																	<>
																		<div className="flex items-center">
																			<span className={classNames("ml-3 truncate", selected ? "font-semibold" : "")}>{user.username}</span>
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
							<Button
								onClick={
									() =>
										createLink({
											supabaseClient,
											userState: globalUserState,
											link: globalLinkState.new
										})
								}
								type="submit"
								className={isSubmitButtonDisabled ? "bg-gray-900/30 hover:bg-gray-900/30 text-gray-700 cursor-not-allowed" : ""}
							>
								Mark Link
							</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export { NewLink };
