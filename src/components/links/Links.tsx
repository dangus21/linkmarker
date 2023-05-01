import {
	MapPinIcon,
	UsersIcon
} from "@heroicons/react/20/solid";

import { Database } from "@/lib/types";
import { TABS, useLinkGlobalState } from "@/state";
import { updateLinkInfo, useGetLinks } from "@/hooks";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";

import {
	LinkDate,
	LinkDelete,
	LinkOpenedStatus,
	LinkReactions,
	LinkTitle
} from "./parts";
import { REACTIONS } from "@/utils";

function Links() {
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

	const ownershipLinksList = ownershipFilter === TABS.ALL ?
		currentLinks :
		currentLinks.filter(link => {
			if (ownershipFilter === TABS.MINE) {
				return link.by === user?.id && link.share_with.length === 0;
			} else if (ownershipFilter === TABS.SHARED) {
				return link.share_with.length > 0;
			} else if (ownershipFilter === TABS.PRIVATE) {
				return !link.is_public;
			}
			return true;
		});

	const textFilterLinksList = textFilter.length === 0 ?
		ownershipLinksList :
		ownershipLinksList.filter(link => {
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

	if (loading) {
		return (
			<div className="w-full h-screen flex justify-center">
				<div
					className="text-white mt-14 inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
					role="status">
					<span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
				</div>
			</div>
		);
	}

	return (
		<div className="w-full flex justify-center">
			{textFilterLinksList.length > 0 ? (
				<div className="sm:mx-10 sm:max-w-7xl border-2 border-black border- sm:shadow sm:rounded-md w-full">
					<ul role="list" className="divide-y-2 divide-black">
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
									<div className="flex justify-between divide-x-2 divide-black">
										<a
											target="_blank"
											href={link.url!}
											onClick={openLinkFn}
											onAuxClick={openLinkFn}
											className="px-2 py-2 sm:px-6 w-full hover:bg-gray-800 cursor-pointer"
										>
											<div className="flex flex-col sm:flex-row sm:items-center justify-between">
												<LinkTitle
													isPublic={link.is_public}
													shareWith={link.share_with}
													title={link.title}
												/>
												<LinkOpenedStatus
													opened={link.opened}
												/>
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
												<LinkDate
													postedDate={link.posted_date}
												/>
											</div>
										</a>
										<div className="flex flex-col sm:flex-row justify-evenly sm:justify-between divide-y-2 sm:divide-x-2 divide-black sm:divide-y-0">
											<LinkDelete
												canDeleteLink={canDeleteLink}
												linkId={link.id}
												userId={user!.id}
												supabaseClient={supabaseClient}
											/>
											<LinkReactions
												link={link}
												reaction={localReaction}
												supabaseClient={supabaseClient}
											/>
										</div>
									</div>
								</li>
							);
						})}
					</ul>
				</div>

			) : (
				<h2 className="p-10 text-gray-100 text-center">
					Nothing to see here, yet.
				</h2>
			)}
		</div>
	);
}

export { Links };
