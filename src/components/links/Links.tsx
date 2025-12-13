import { MapPinIcon, UsersIcon } from "@heroicons/react/20/solid";

import {
	TABS,
	type TLink,
	useLinkGlobalState,
	useLinkMultiEditState,
	useUserGlobalState
} from "@/state";
import { updateLinkInfo, useGetProfileInfo } from "@/hooks";
import type { User } from "@supabase/auth-helpers-react";

import {
	Link,
	LinkArchive,
	LinkDate,
	LinkDelete,
	LinkEdit,
	LinkOpenedStatus,
	LinkSeenToggle,
	LinkTitle
} from "./parts";
import {
	extractTopLevelDomain,
	getLinkValues,
	normalizeLinkTitle,
	parseEnvToggles
} from "@/utils";
import { twMerge } from "tailwind-merge";
import { useEffect, useState } from "react";

import { LoadingSpinner, Navbar, NewLinkButton } from "@/components";
import { supabase, useGetLinks } from "@/hooks/links";
import { useReadLocalStorage } from "usehooks-ts";
import { LinkLink } from "@/components/links/parts/left/LinkLink";
import { Tabs } from "../tabs";
import { useGetUsersList } from "@/hooks/profile";

function Links() {
	const user = useReadLocalStorage<User | null>("user");

	useGetProfileInfo();
	useGetUsersList();
	useGetLinks(user);

	const session = useReadLocalStorage("session");
	const [isAdmin, setIsAdmin] = useState<boolean>(false);

	const { values: currentLinks } = useLinkGlobalState();
	const { update: updateLink } = useLinkGlobalState();
	const { ownershipFilter } = useLinkGlobalState();
	const { textFilter } = useLinkGlobalState();

	const { usersList } = useUserGlobalState();

	const { linksBeingEdited } = useLinkMultiEditState();
	const { setLinkForEdit } = useLinkMultiEditState();

	function openOrArchiveLinkFn(
		id: string,
		op: "opened" | "archived",
		status: boolean
	) {
		return updateLinkInfo({
			link: {
				[op]: status
			},
			id,
			updateLink
		});
	}

	function toggleEdit({
		link,
		shouldCancel,
		isLinkBeingEdited
	}: {
		link: Partial<TLink>;
		shouldCancel: boolean;
		isLinkBeingEdited?: boolean;
	}) {
		if (!shouldCancel && isLinkBeingEdited && link) {
			const newLinkObj = new URL(link.url ?? "");

			const newOrigin =
				extractTopLevelDomain(newLinkObj) ?? "unknown origin";

			updateLinkInfo({
				link: {
					...link,
					origin: newOrigin
				},
				id: link.id ?? "",
				updateLink
			});
		}
		setLinkForEdit(link.id);
	}

	useEffect(() => {
		if (user || session) {
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
		}

		return () => {
			setIsAdmin(false);
		};
	}, [user?.id, session, user]);

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
					normalizeLinkTitle(textFilter)
				)
			);

	const hasLength = textFilterLinksList.length;

	const { loading } = useLinkGlobalState();

	if (loading) {
		return <LoadingSpinner />;
	}

	return (
		<>
			<Navbar />
			<Tabs />
			<div className="mx-auto flex w-full max-w-[81rem] justify-center">
				<div className="w-full sm:mx-10 sm:max-w-7xl sm:pb-2">
					<div className="visible md:invisible">
						<NewLinkButton isMobile />
					</div>
					<ul
						role="list"
						className={twMerge(
							hasLength &&
								"divide-y-2 divide-black/30 border-2 border-black/30 sm:rounded-md",
							"max-h-[100vh] overflow-auto sm:max-h-[calc(100vh-8rem)]",
							"scrollbar scrollbar-track-gray-1000 scrollbar-thumb-[#1a2230]",
							"scrollbar-thin scrollbar-thumb-rounded-md hover:scrollbar-thumb-[#171e2b]"
						)}
					>
						{hasLength ? (
							textFilterLinksList.map((filteredLink) => {
								const {
									canDeleteLink,
									isLinkBeingEdited,
									userIsOwner
								} = getLinkValues(
									user,
									filteredLink,
									linksBeingEdited
								);

								return (
									<Link
										id={filteredLink.id}
										key={filteredLink.id}
										virtualRow={filteredLink as TLink}
										openOrArchiveLinkFn={
											!isLinkBeingEdited
												? openOrArchiveLinkFn
												: undefined
										}
										left={
											<>
												<LinkTitle
													link={filteredLink}
													edit={isLinkBeingEdited}
													toggleEdit={toggleEdit}
												/>
												<LinkLink
													link={filteredLink}
													edit={isLinkBeingEdited}
													toggleEdit={toggleEdit}
												/>
												<div className="mb-2 grid lg:grid-cols-4 lg:items-center [&>div]:mt-3">
													<div className="min-w-24">
														<LinkOpenedStatus
															opened={
																filteredLink.opened
															}
														/>
													</div>
													<div className="-mb-1 flex max-w-full min-w-24 items-center">
														<UsersIcon
															className="mr-1.5 size-5 shrink-0 text-gray-400"
															aria-hidden="true"
														/>
														<p className="mr-8 w-full truncate text-sm text-gray-500 md:mr-8">
															{
																usersList?.get(
																	filteredLink.by
																)?.username
															}
														</p>
													</div>
													<div className="-mb-1 flex max-w-full min-w-24 items-center">
														<MapPinIcon
															className="mr-1.5 size-5 shrink-0 text-gray-400"
															aria-hidden="true"
														/>
														<p className="mr-8 w-full truncate text-sm text-nowrap text-gray-500">
															{
																filteredLink.origin
															}
														</p>
													</div>
													<div className="-mb-1 flex max-w-full min-w-24 items-center">
														<LinkDate
															postedDate={
																filteredLink.posted_date
															}
														/>
													</div>
												</div>
											</>
										}
										right={
											<>
												<LinkEdit
													link={filteredLink}
													isAdmin={isAdmin}
													invalidation={[
														!userIsOwner
													]}
													toggleEdit={toggleEdit}
												/>
												<LinkSeenToggle
													isAdmin={isAdmin}
													invalidation={[
														!userIsOwner,
														// ! because toggle is turned off
														!parseEnvToggles(
															process.env
																.NEXT_PUBLIC_TOGGLE_SEEN
														)
													]}
													opened={filteredLink.opened}
													toggleSeenStatus={() =>
														openOrArchiveLinkFn(
															filteredLink.id,
															"opened",
															!filteredLink.opened
														)
													}
												/>
												<LinkArchive
													isAdmin={isAdmin}
													invalidation={[
														!userIsOwner,
														parseEnvToggles(
															process.env
																.NEXT_PUBLIC_TOGGLE_ARCHIVE
														)
													]}
													toggleArchivedStatus={() =>
														openOrArchiveLinkFn(
															filteredLink.id,
															"archived",
															!filteredLink.archived
														)
													}
												/>
												<LinkDelete
													isAdmin={isAdmin}
													invalidation={[
														!userIsOwner,
														parseEnvToggles(
															process.env
																.NEXT_PUBLIC_TOGGLE_DELETE
														),
														canDeleteLink
													]}
													canDeleteLink={
														canDeleteLink
													}
													link={filteredLink.id}
													user={user?.id}
												/>
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
		</>
	);
}

export { Links };
