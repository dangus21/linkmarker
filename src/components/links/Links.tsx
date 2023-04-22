import { Fragment } from "react";

import {
	CalendarIcon,
	CheckCircleIcon,
	EyeIcon,
	EyeSlashIcon,
	FaceSmileIcon,
	MapPinIcon,
	UsersIcon,
	XCircleIcon,
	XMarkIcon
} from "@heroicons/react/20/solid";
import { Database } from "@/lib/types";
import { TABS, useLinkGlobalState } from "@/state";
import { deleteLink, updateLinkInfo, useGetLinks } from "@/hooks";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";

import { Popover, Transition } from "@headlessui/react";
import { REACTIONS, classNames } from "@/utils";

// eslint-disable-next-line @typescript-eslint/no-empty-function
const no_op = () => { };

function Links() {
	const supabaseClient = useSupabaseClient<Database>();
	const user = useUser();
	useGetLinks();

	const {
		values: currentLinks,
		update: updateLink,
		set: setLinks,
		ownershipFilter,
		textFilter,
		loading
	} = useLinkGlobalState();

	const dateFormatter = new Intl.DateTimeFormat("pt-PT");

	const ownershipLinksList = ownershipFilter === TABS.ALL ? currentLinks : currentLinks.filter(link => {
		if (ownershipFilter === TABS.MINE) {
			return link.by === user?.id;
		} else if (ownershipFilter === TABS.SHARED) {
			return link.share_with.length > 0;
		} else if (ownershipFilter === TABS.PRIVATE) {
			return !link.is_public;
		}
		return;
	});

	const textFilterLinksList = textFilter.length === 0 ?
		ownershipLinksList :
		ownershipLinksList.filter(link => link.title.toLowerCase().includes(textFilter));

	if (loading) {
		return (
			<div className="w-full flex justify-center">
				<div
					className="mt-2 inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-primary motion-reduce:animate-[spin_1.5s_linear_infinite]"
					role="status">
					<span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
				</div>
			</div>
		);
	}

	return (
		<div className="w-full flex justify-center">
			{textFilterLinksList.length > 0 ? (
				<div className="my-6 sm:mx-10 sm:max-w-7xl border border-b-gray-300 bg-white sm:shadow sm:rounded-md w-full">
					<ul role="list" className="divide-y divide-gray-200">
						{textFilterLinksList.map((link) => {
							const localReaction = REACTIONS[link.reaction as keyof typeof REACTIONS];
							function openLinkFn() {
								return updateLinkInfo({
									link: { opened: true },
									id: link.id,
									updateLink,
									supabaseClient
								});
							};

							const canDeleteLink = user?.id === link.by || (
								user?.id !== link.id && link.is_deletable
							);
							return (
								<li key={link.id}>
									<div className="flex justify-between divide-x divide-gray-150">
										<a
											target="_blank"
											href={link.url!}
											onClick={openLinkFn}
											onAuxClick={openLinkFn}
											className="px-4 py-4 sm:px-6 w-full hover:bg-gray-100 cursor-pointer"
										>
											<div className="flex flex-col sm:flex-row sm:items-center justify-between">
												<div className="max-w-auto sm:max-w-full">
													<p className="text-sm font-medium text-indigo-600">
														{link.title}
													</p>
													<span className="inline-flex items-center text-xs">
														{
															link.is_public ?
																<><EyeIcon className="h-3.5 flex-shrink-0 text-gray-400 mr-1" /> Public</> :
																<><EyeSlashIcon className="h-3.5 flex-shrink-0 text-gray-400 mr-1" /> Private</>
														}
													</span>
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
																link.posted_date ??
																""
															).toString()}
														>
															{dateFormatter.format(
																new Date(
																	link.posted_date ??
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
												onClick={() => canDeleteLink ?
													deleteLink({
														id: link.id,
														supabaseClient,
														setLinks,
														currentUser: user!.id
													}) :
													no_op
												}
												className={
													classNames(
														"relative flex-auto sm:h-full w-16 sm:w-20 grid place-content-center",
														canDeleteLink ? "cursor-pointer hover:bg-red-200" : ""
													)
												}
											>
												<span>
													<XMarkIcon
														className={
															classNames(
																"h-8 w-8 sm:h-10 s:w-10",
																canDeleteLink ?
																	"text-red-500" :
																	"text-gray-400"
															)
														}
														aria-hidden="true"
													/>
												</span>
											</div>
											<Popover className="relative h-1/2 sm:h-auto">
												<Popover.Button className="h-full w-16 sm:w-20 hover:bg-gray-100">
													{link.reaction &&
														localReaction ? (
															<span className="text-xl sm:text-2xl">
																{localReaction}
															</span>
														) : (
															<span className="grid place-items-center">
																<FaceSmileIcon
																	className="h-8 w-8 sm:h-10 s:w-10 text-gray-300"
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
													<Popover.Panel className="absolute -right-[100%] sm:right-1/2 z-10 flex max-w-[18rem] -translate-x-1/2 sm:-translate-x-1/4 px-4">
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
				</div>

			) : (
				<h2 className="p-10 text-center">
					Nothing to see here, yet.
				</h2>
			)}
		</div>
	);
}

export { Links };
