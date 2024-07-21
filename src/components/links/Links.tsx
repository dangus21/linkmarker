import { MapPinIcon, UsersIcon } from "@heroicons/react/20/solid";

import { updateLinkInfo, useGetLinks } from "@/hooks";
import type { Database } from "@/lib/types";
import {
	TABS,
	type TLink,
	useLinkGlobalState,
	useLinkMultiEditState,
} from "@/state";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";

import { getLinkValues, normalizeLinkTitle, useViewport } from "@/utils";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import {
	Link,
	LinkArchive,
	LinkDate,
	LinkDelete,
	LinkEdit,
	LinkOpenedStatus,
	LinkSeenToggle,
	LinkTitle,
} from "./parts";

import { LoadingSpinner, NewLinkButton } from "@/components";
import { useToggle } from "@/utils/useToggle";

function Links() {
	useGetLinks();
	const { width } = useViewport();
	const user = useUser();
	const renderToggle = useToggle();
	const supabaseClient = useSupabaseClient<Database>();
	const [isAdmin, setIsAdmin] = useState<boolean>(false);

	const {
		values: currentLinks,
		update: updateLink,
		ownershipFilter,
		textFilter,
		loading,
	} = useLinkGlobalState();

	useEffect(() => {
		async function getUsers() {
			const { data, error } = await supabaseClient
				.from("profiles")
				.select("is_admin")
				.eq("id", user?.id ?? "");
			if (error) {
				console.error({ usersError: error });
			} else {
				setIsAdmin(data[0].is_admin ?? false);
			}
		}
		getUsers();

		return () => {
			setIsAdmin(false);
		};
	}, [supabaseClient, user?.id]);

	const { linksBeingEdited, setLinkForEdit } = useLinkMultiEditState();

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

	const textFilterLinksList = !textFilter
		? ownershipLinksList
		: ownershipLinksList.filter((link) =>
				normalizeLinkTitle(link.title).includes(
					normalizeLinkTitle(textFilter),
				),
			);

	if (loading) {
		return <LoadingSpinner />;
	}

	const hasLength = textFilterLinksList.length;

	return (
		<div className="mx-auto flex w-full max-w-[81rem] justify-center">
			<div className="sm:pb-2 w-full sm:mx-10 sm:max-w-7xl">
				{width <= 630 && <NewLinkButton isMobile />}
				<ul
					role="list"
					className={twMerge(
						hasLength &&
							"divide-y-2 divide-black/30 border-2 border-black/30 sm:rounded-md",
						"max-h-[100vh] sm:max-h-[calc(100vh-8rem)] overflow-auto",
						"scrollbar scrollbar-track-gray-1000 scrollbar-thumb-[#1a2230]",
						"scrollbar-thin scrollbar-thumb-rounded-md hover:scrollbar-thumb-[#171e2b]",
					)}
				>
					{hasLength ? (
						textFilterLinksList.map((virtualRow) => {
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

							const {
								canDeleteLink,
								isLinkBeingEdited,
								userIsOwner,
							} = getLinkValues(
								user,
								virtualRow,
								linksBeingEdited,
							);

							return (
								<Link
									key={virtualRow.id}
									virtualRow={virtualRow as TLink}
									openOrArchiveLinkFn={openOrArchiveLinkFn}
									left={
										<>
											<LinkTitle
												edit={isLinkBeingEdited}
												isPublic={virtualRow.is_public}
												shareWith={
													virtualRow.share_with
												}
												title={virtualRow.title}
											/>
											<div className="grid sm:grid-cols-4 sm:items-center [&>div]:max-w-[20%] [&>div]:mt-3 mb-2">
												<LinkOpenedStatus
													opened={virtualRow.opened}
												/>
												<div className="-mb-1 flex items-center max-w-[40%]">
													<UsersIcon
														className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
														aria-hidden="true"
													/>
													<p className="mr-8 text-sm text-gray-500 md:mr-8">
														{virtualRow.who}
													</p>
												</div>
												<div className="-mb-1 flex items-center max-w-[40%]">
													<MapPinIcon
														className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
														aria-hidden="true"
													/>
													<p className="mr-8 text-sm text-gray-500 text-nowrap">
														{virtualRow.origin}
													</p>
												</div>
												<LinkDate
													postedDate={
														virtualRow.posted_date
													}
												/>
											</div>
										</>
									}
									right={
										<>
											{renderToggle({
												toggle: process.env
													.NEXT_PUBLIC_TOGGLE_ARCHIVE,
												component: (
													<LinkArchive
														isAdmin={isAdmin}
														isArchivable={
															userIsOwner
														}
														toggleArchivedStatus={() =>
															openOrArchiveLinkFn(
																true,
																"archived",
															)
														}
													/>
												),
												exceptions: [isAdmin],
												additionalToggles: [
													ownershipFilter !==
														TABS.ARCHIVED,
												],
											})}
											{renderToggle({
												toggle: process.env
													.NEXT_PUBLIC_TOGGLE_SEEN,
												component: (
													<LinkSeenToggle
														opened={
															virtualRow.opened
														}
														toggleSeenStatus={() =>
															openOrArchiveLinkFn(
																!virtualRow.opened,
																"opened",
															)
														}
													/>
												),
											})}
											{renderToggle({
												toggle: process.env
													.NEXT_PUBLIC_TOGGLE_DELETE,
												component: (
													<LinkDelete
														isAdmin={isAdmin}
														canDeleteLink={
															canDeleteLink
														}
														link={virtualRow.id}
														user={user!.id}
														supabaseClient={
															supabaseClient
														}
													/>
												),
												exceptions: [isAdmin],
											})}
											{renderToggle({
												toggle: process.env
													.NEXT_PUBLIC_TOGGLE_EDIT,
												component: (
													<LinkEdit
														toggleEditMode={() =>
															setLinkForEdit(
																virtualRow.id,
															)
														}
													/>
												),
											})}
										</>
									}
								/>
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
