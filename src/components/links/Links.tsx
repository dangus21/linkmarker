import { MapPinIcon, UsersIcon } from "@heroicons/react/20/solid";

import { updateLinkInfo } from "@/hooks";
import {
	TABS,
	type TLink,
	useLinkGlobalState,
	useLinkMultiEditState,
} from "@/state";
import { useUser } from "@supabase/auth-helpers-react";

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
import { supabase, useGetLinks } from "@/hooks/links";
import { useToggle } from "@/utils/useToggle";

function Links() {
	const user = useUser();
	const { width } = useViewport();
	const { renderToggle } = useToggle();
	const [isAdmin, setIsAdmin] = useState<boolean>(false);

	useGetLinks(user);

	const {
		values: currentLinks,
		update: updateLink,
		ownershipFilter,
		textFilter,
		loading,
	} = useLinkGlobalState();
	const { linksBeingEdited, setLinkForEdit } = useLinkMultiEditState();

	useEffect(() => {
		async function getUsers() {
			const { data, error } = await supabase
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
	}, [user?.id]);

	// TODO
	// useEffect(() => {
	// 	setTimeout(() => {
	// 		const activeTextarea = document.activeElement;
	// 		console.log("LOG ~ activeTextarea:", activeTextarea);
	// 	}, 50);
	// }, [linksBeingEdited]);

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
								});
							}

							function updateLinkTitle(title: string) {
								return updateLinkInfo({
									link: {
										title,
									},
									id: virtualRow.id,
									updateLink,
								});
							}

							function toggleEdit(shouldCancel: boolean) {
								if (!shouldCancel && isLinkBeingEdited) {
									updateLinkTitle(virtualRow.title);
								}
								setLinkForEdit(virtualRow.id);
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
									id={virtualRow.id}
									key={virtualRow.id}
									virtualRow={virtualRow as TLink}
									openOrArchiveLinkFn={
										!isLinkBeingEdited
											? openOrArchiveLinkFn
											: undefined
									}
									left={
										<>
											<LinkTitle
												id={virtualRow.id}
												edit={isLinkBeingEdited}
												isPublic={virtualRow.is_public}
												shareWith={
													virtualRow.share_with
												}
												title={virtualRow.title}
												toggleEdit={toggleEdit}
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
											{renderToggle(
												<LinkEdit
													isOwnLink={userIsOwner}
													toggleEdit={toggleEdit}
												/>,
												{
													toggle:
														isAdmin ||
														(userIsOwner &&
															process.env
																.NEXT_PUBLIC_TOGGLE_EDIT),
												},
											)}
											{renderToggle(
												<LinkSeenToggle
													opened={virtualRow.opened}
													toggleSeenStatus={() =>
														openOrArchiveLinkFn(
															!virtualRow.opened,
															"opened",
														)
													}
												/>,
												{
													toggle:
														isAdmin ||
														process.env
															.NEXT_PUBLIC_TOGGLE_SEEN,
												},
											)}
											{renderToggle(
												<LinkArchive
													isAdmin={isAdmin}
													isArchivable={userIsOwner}
													toggleArchivedStatus={() =>
														openOrArchiveLinkFn(
															true,
															"archived",
														)
													}
												/>,
												{
													toggle: process.env
														.NEXT_PUBLIC_TOGGLE_ARCHIVE,
													exceptions: [isAdmin],
													additionalToggles: [
														ownershipFilter !==
															TABS.ARCHIVED,
													],
												},
											)}
											{renderToggle(
												<LinkDelete
													isAdmin={isAdmin}
													canDeleteLink={
														canDeleteLink
													}
													link={virtualRow.id}
													user={user!.id}
												/>,
												{
													toggle: process.env
														.NEXT_PUBLIC_TOGGLE_DELETE,
													exceptions: [isAdmin],
												},
											)}
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
