import { MapPinIcon, UsersIcon } from "@heroicons/react/20/solid";

import { updateLinkInfo, useGetLinks } from "@/hooks";
import type { Database } from "@/lib/types";
import { TABS, useLinkGlobalState } from "@/state";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";

import { REACTIONS, useViewport } from "@/utils";
import { useRef } from "react";
import { twMerge } from "tailwind-merge";
import {
	LinkArchive,
	LinkDate,
	LinkDelete,
	LinkEdit,
	LinkOpenedStatus,
	LinkReactions,
	LinkSeenToggle,
	LinkTitle,
} from "./parts";

import { LoadingSpinner, NewLinkButton } from "@/components";
import { useToggle } from "@/utils/useToggle";

function Links() {
	const { width } = useViewport();
	const toggle = useToggle();
	const supabaseClient = useSupabaseClient<Database>();
	const user = useUser();
	useGetLinks();

	const {
		values: currentLinks,
		update: updateLink,
		ownershipFilter,
		textFilter,
		loading,
	} = useLinkGlobalState();

	const ownershipLinksList =
		ownershipFilter === TABS.ALL
			? currentLinks.filter((link) => !link.archived)
			: currentLinks.filter((link) => {
					if (ownershipFilter === TABS.MINE) {
						return (
							link.by === user?.id &&
							link.share_with.length === 0 &&
							!link.archived
						);
					}
					if (ownershipFilter === TABS.SHARED) {
						return link.share_with.length > 0 && !link.archived;
					}
					if (ownershipFilter === TABS.PRIVATE) {
						return !link.is_public && !link.archived;
					}
					if (ownershipFilter === TABS.ARCHIVED) {
						return link.archived;
					}
					return true;
				});

	const textFilterLinksList =
		textFilter.length === 0
			? ownershipLinksList
			: ownershipLinksList.filter((link) => {
					return link.title
						.toLowerCase()
						.normalize("NFD")
						.replace(/\p{Diacritic}/gu, "")
						.includes(
							textFilter
								.normalize("NFD")
								.replace(/\p{Diacritic}/gu, ""),
						);
				});

	const parentRef = useRef<HTMLDivElement>(null);

	if (loading) {
		return <LoadingSpinner />;
	}

	return (
		<div
			ref={parentRef}
			className="mx-auto flex w-full max-w-[81rem] justify-center"
		>
			<div className="mb-2 w-full sm:mx-10 sm:max-w-7xl sm:shadow">
				{width <= 630 && <NewLinkButton isMobile />}
				<ul
					role="list"
					className={twMerge(
						"divide-y-2 divide-black border-2 border-black sm:rounded-md",
						"max-h-[calc(100vh-8rem)] overflow-auto",
						"scrollbar scrollbar-track-gray-1000 scrollbar-thumb-[#1a2230]",
						"scrollbar-thin scrollbar-thumb-rounded-md hover:scrollbar-thumb-[#171e2b]",
					)}
				>
					{textFilterLinksList.length > 0 ? (
						textFilterLinksList.map((virtualRow) => {
							const localReaction =
								REACTIONS[
									virtualRow.reaction as keyof typeof REACTIONS
								];
							function openOrArchiveLinkFn(
								status: boolean,
								op: "opened" | "archived",
							) {
								return updateLinkInfo({
									link: {
										[op]: status,
									},
									id: virtualRow.id,
									updateLink,
									supabaseClient,
								});
							}

							const canDeleteLink =
								user?.id === virtualRow.by ||
								(user?.id !== virtualRow.id &&
									virtualRow.is_deletable);

							const userIsOwner = user?.id === virtualRow.by;

							return (
								<li
									key={virtualRow.id}
									className="flex justify-between divide-x-2 divide-black"
								>
									<a
										target="_blank"
										href={virtualRow.url!}
										onMouseDown={() =>
											openOrArchiveLinkFn(true, "opened")
										}
										className="w-full cursor-pointer px-6 py-2 hover:bg-gray-800"
										rel="noreferrer"
									>
										<LinkTitle
											isPublic={virtualRow.is_public}
											shareWith={virtualRow.share_with}
											title={virtualRow.title}
										/>
										<div className="flex flex-col justify-between sm:flex-row sm:items-center [&>div]:max-w-[25%] [&>div]:w-[25%] [&>div]:w-min-[25%] [&>div]:mt-1 mb-2">
											<LinkOpenedStatus
												opened={virtualRow.opened}
											/>
											<div className="-mb-1 flex items-center">
												<UsersIcon
													className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
													aria-hidden="true"
												/>
												<p className="mr-8 text-sm text-gray-500 md:mr-8">
													{virtualRow.who}
												</p>
											</div>
											<div className="-mb-1 flex items-center">
												<MapPinIcon
													className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
													aria-hidden="true"
												/>
												<p className="mr-8 text-sm text-gray-500 truncate text-ellipsis overflow-hidden">
													{virtualRow.origin}
												</p>
											</div>
											<LinkDate
												postedDate={
													virtualRow.posted_date
												}
											/>
										</div>
									</a>
									<div
										data-id="link_actions"
										className="flex flex-col divide-y-2 divide-black sm:flex-row sm:divide-x-2 sm:divide-y-0"
									>
										{toggle(
											"ARCHIVE",
											<LinkArchive
												isArchivable={userIsOwner}
												toggleArchivedStatus={() =>
													openOrArchiveLinkFn(
														true,
														"archived",
													)
												}
											/>,
											[ownershipFilter !== TABS.ARCHIVED],
										)}
										{toggle(
											"SEEN",
											<LinkSeenToggle
												opened={virtualRow.opened}
												toggleSeenStatus={() =>
													openOrArchiveLinkFn(
														!virtualRow.opened,
														"opened",
													)
												}
											/>,
										)}
										{toggle(
											"REACTIONS",
											<LinkReactions
												link={virtualRow}
												reaction={localReaction}
												supabaseClient={supabaseClient}
											/>,
										)}
										{toggle(
											"DELETE",
											<LinkDelete
												canDeleteLink={canDeleteLink}
												link={virtualRow.id}
												user={user!.id}
												supabaseClient={supabaseClient}
											/>,
										)}
										{toggle(
											"EDIT",
											<LinkEdit
												toggleEditMode={console.log}
											/>,
										)}
									</div>
								</li>
							);
						})
					) : (
						<h2 className="p-10 text-center text-gray-100">
							Nothing to see here, yet.
						</h2>
					)}
				</ul>
			</div>
		</div>
	);
}

export { Links };
