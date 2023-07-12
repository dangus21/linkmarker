import { MapPinIcon, UsersIcon } from "@heroicons/react/20/solid";

import { Database } from "@/lib/types";
import { TABS, useLinkGlobalState } from "@/state";
import { updateLinkInfo, useGetLinks } from "@/hooks";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";

import {
	LinkDate,
	LinkDelete,
	LinkOpenedStatus,
	LinkReactions,
	LinkSeenToggle,
	LinkTitle
} from "./parts";
import { LoadingSpinner } from "../loading-spinner";
import { NewLinkButton } from "../newLinkButton/NewLinkButton";
import { REACTIONS, useViewport } from "@/utils";
import { twMerge } from "tailwind-merge";
import { useRef } from "react";

function Links() {
	const { width } = useViewport();

	const supabaseClient = useSupabaseClient<Database>();
	const user = useUser();
	useGetLinks();

	const {
		values: currentLinks,
		update: updateLink,
		ownershipFilter,
		textFilter,
		loading
	} = useLinkGlobalState();

	const ownershipLinksList =
		ownershipFilter === TABS.ALL
			? currentLinks
			: currentLinks.filter((link) => {
					if (ownershipFilter === TABS.MINE) {
						return (
							link.by === user?.id && link.share_with.length === 0
						);
					} else if (ownershipFilter === TABS.SHARED) {
						return link.share_with.length > 0;
					} else if (ownershipFilter === TABS.PRIVATE) {
						return !link.is_public;
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
								.replace(/\p{Diacritic}/gu, "")
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
						"scrollbar-thin scrollbar-thumb-rounded-md hover:scrollbar-thumb-[#171e2b]"
					)}
				>
					{textFilterLinksList.length > 0 ? (
						textFilterLinksList.map((virtualRow) => {
							const localReaction =
								REACTIONS[
									virtualRow.reaction as keyof typeof REACTIONS
								];
							function openLinkFn(status?: boolean) {
								return updateLinkInfo({
									link: {
										opened: status
									},
									id: virtualRow.id,
									updateLink,
									supabaseClient
								});
							}

							const canDeleteLink =
								user?.id === virtualRow.by ||
								(user?.id !== virtualRow.id &&
									virtualRow.is_deletable);

							return (
								<li key={virtualRow.id}>
									<div className="flex justify-between divide-x-2 divide-black">
										<a
											target="_blank"
											href={virtualRow.url!}
											onClick={() => openLinkFn(true)}
											onAuxClick={() => openLinkFn(true)}
											className="w-full cursor-pointer py-2 px-6 hover:bg-gray-800"
											rel="noreferrer"
										>
											<div className="flex flex-col justify-between sm:flex-row sm:items-center">
												<LinkTitle
													isPublic={
														virtualRow.is_public
													}
													shareWith={
														virtualRow.share_with
													}
													title={virtualRow.title}
												/>
												<LinkOpenedStatus
													opened={virtualRow.opened}
												/>
											</div>
											<div className="mt-2 flex flex-col justify-between sm:flex-row">
												<div className="flex flex-col sm:flex-row">
													<div className="mb-1.5 flex sm:mt-0">
														<UsersIcon
															className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
															aria-hidden="true"
														/>
														<p className="mr-8 flex min-w-[3rem] items-center text-sm text-gray-500 md:mr-8">
															{virtualRow.who}
														</p>
													</div>
													<div className="mb-1.5 flex sm:mt-0">
														<MapPinIcon
															className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
															aria-hidden="true"
														/>
														<p className="mr-8 flex min-w-[3rem] items-center text-sm text-gray-500 md:mr-8">
															{virtualRow.origin}
														</p>
													</div>
												</div>
												<LinkDate
													postedDate={
														virtualRow.posted_date
													}
												/>
											</div>
										</a>
										<div className="flex flex-col divide-y-2 divide-black sm:flex-row sm:divide-x-2 sm:divide-y-0">
											<LinkDelete
												canDeleteLink={canDeleteLink}
												linkId={virtualRow.id}
												userId={user!.id}
												supabaseClient={supabaseClient}
											/>
											<LinkSeenToggle
												opened={virtualRow.opened}
												toggleSeenStatus={() =>
													openLinkFn(
														!virtualRow.opened
													)
												}
											/>
											<LinkReactions
												link={virtualRow}
												reaction={localReaction}
												supabaseClient={supabaseClient}
											/>
										</div>
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
