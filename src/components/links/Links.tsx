import {
	CalendarIcon,
	CheckCircleIcon,
	FaceSmileIcon,
	MapPinIcon,
	UsersIcon,
	XCircleIcon,
	XMarkIcon
} from "@heroicons/react/20/solid";
import { Database } from "@/lib/types";
import { updateLinkInfo } from "@/hooks/updateLinkInfo";
import { useGetLinks } from "@/hooks/useGetLinks";
import { useLinkGlobalState } from "@/state";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

import { Fragment } from "react";

import { Popover, Transition } from "@headlessui/react";
import { REACTIONS } from "@/utils";
import { deleteLink } from "@/hooks/deleteLink";

function Links() {
	const supabaseClient = useSupabaseClient<Database>();

	useGetLinks();

	const { values: availableLinks, update: updateLink, set: setLinks } = useLinkGlobalState();
	const dateFormatter = new Intl.DateTimeFormat("pt-PT");

	return (
		<div className="w-full flex justify-center">
			<div className="mt-6 sm:mx-10 sm:max-w-7xl bg-white shadow sm:rounded-md w-full">
				{availableLinks.length > 0 ? (
					<ul role="list" className="divide-y divide-gray-200">
						{availableLinks.map((link) => {
							const localReaction =
								REACTIONS[
								link.reaction as keyof typeof REACTIONS
								];
							return (
								<li key={link.id}>
									<div className="flex justify-between divide-x divide-gray-150">
										<a
											target="_blank"
											href={link.url!}
											onClick={() =>
												updateLinkInfo({
													link: { opened: true },
													id: link.id,
													updateLink,
													supabaseClient
												})
											}
											className="px-4 py-4 sm:px-6 w-full hover:bg-gray-100 cursor-pointer"
										>
											<div className="flex flex-col sm:flex-row sm:items-center justify-between">
												<div className="max-w-auto sm:max-w-full">
													<p className="text-sm font-medium text-indigo-600">
														{link.title}
													</p>
												</div>
												<p className="flex items-center">
													{link.opened ? (
														<>
															<span className="whitespace-nowrap">
																Opened
															</span>
															<span className="ml-3">
																<CheckCircleIcon className="h-5 w-5 flex-shrink-0 text-green-500" />
															</span>
														</>
													) : (
														<>
															<span className="whitespace-nowrap">
																Not Open
															</span>
															<span className="ml-3">
																<XCircleIcon className="h-5 w-5 flex-shrink-0 self-center text-red-500" />
															</span>
														</>
													)}
												</p>
											</div>
											<div className="mt-2 flex flex-col sm:flex-row justify-between">
												<div className="flex flex-col sm:flex-row">
													<div className="flex mb-1.5 sm:mt-0">
														<UsersIcon
															className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
															aria-hidden="true"
														/>
														<p className="flex items-center text-sm text-gray-500 mr-8 md:mr-8 min-w-[3rem]">
															{link.who}
														</p>
													</div>
													<div className="flex mb-1.5 sm:mt-0">
														<MapPinIcon
															className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
															aria-hidden="true"
														/>
														<p className="flex items-center text-sm text-gray-500 mr-8 md:mr-8 min-w-[3rem]">
															{link.origin}
														</p>
													</div>
												</div>
												<div className="flex items-center text-sm text-gray-500">
													<CalendarIcon
														className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
														aria-hidden="true"
													/>
													<p>
														<time
															dateTime={(
																link.postedDate ??
																""
															).toString()}
														>
															{dateFormatter.format(
																new Date(
																	link.postedDate ??
																	""
																)
															)}
														</time>
													</p>
												</div>
											</div>
										</a>
										<div className="flex flex-col sm:flex-row justify-evenly sm:justify-between divide-y sm:divide-x divide-gray-150 sm:divide-y-0">
											<div
												onClick={() => deleteLink({ id: link.id, supabaseClient, setLinks })}
												className="relative flex-auto cursor-pointer sm:h-full w-16 sm:w-20 grid place-content-center hover:bg-red-200"
											>
												<span>
													<XMarkIcon
														className="h-8 w-8 sm:h-10 s:w-10 text-red-500"
														aria-hidden="true"
													/>
												</span>
											</div>
											<Popover className="relative h-1/2 sm:h-auto">
												<Popover.Button className="h-full w-16 sm:w-20 hover:bg-gray-100">
													{link.reaction &&
														localReaction ? (
															<span className="text-xl sm:text-4xl">
																{localReaction}
															</span>
														) : (
															<span className="grid place-items-center">
																<FaceSmileIcon
																	className="h-6 w-6 sm:h-10 s:w-10 text-gray-300"
																	aria-hidden="true"
																/>
															</span>
														)}
												</Popover.Button>
												<Transition
													as={Fragment}
													enter="transition ease-out duration-200"
													enterFrom="opacity-0 translate-y-1"
													enterTo="opacity-100 translate-y-0"
													leave="transition ease-in duration-150"
													leaveFrom="opacity-100 translate-y-0"
													leaveTo="opacity-0 translate-y-1"
												>
													<Popover.Panel className="absolute -right-1/2 sm:right-1/2 z-10 flex max-w-[18rem] -translate-x-1/2 sm:-translate-x-1/4 px-4">
														{({ close }) => (
															<div className="w-auto flex-auto rounded bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5 flex flex-row">
																{Object.entries(
																	REACTIONS
																).map(
																	([
																		key,
																		icon
																	]) => (
																		<div
																			onClick={() => {
																				updateLinkInfo(
																					{
																						link: {
																							reaction:
																								key
																						},
																						id: link.id,
																						supabaseClient,
																						updateLink
																					}
																				);
																				close();
																			}}
																			key={
																				key
																			}
																			className={`cursor-pointer text-center relative hover:bg-gray-200/90 ${link.reaction ===
																				key &&
																				"bg-neutral-100"
																			}`}
																		>
																			<p className="font-semibold text-gray-900 text-lg sm:text-2xl p-3">
																				{
																					icon
																				}
																				<span className="absolute inset-0" />
																			</p>
																		</div>
																	)
																)}
															</div>
														)}
													</Popover.Panel>
												</Transition>
											</Popover>
										</div>
									</div>
								</li>
							);
						})}
					</ul>
				) : (
					<h2 className="p-10 text-center">
						Nothing to see here, yet.
					</h2>
				)}
			</div>
		</div>
	);
}

export { Links };
