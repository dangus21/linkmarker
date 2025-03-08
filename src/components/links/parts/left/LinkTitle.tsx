import { Input } from "@/components";
import { KeyboardEvent, useState } from "react";
import {
	LockClosedIcon,
	LockOpenIcon,
	ShareIcon
} from "@heroicons/react/20/solid";
import { TLink, useLinkGlobalState } from "@/state";

function LinkTitle({
	link,
	edit,
	toggleEdit
}: {
	link: TLink;
	edit: boolean;
	toggleEdit: ({
		link,
		isLinkBeingEdited,
		shouldCancel
	}: {
		link: Partial<TLink>;
		isLinkBeingEdited: boolean;
		shouldCancel: boolean;
	}) => void;
}) {
	const { title, is_public, share_with } = link;
	const [localTitle, setLocalTitle] = useState(title);
	const { update: updateLink } = useLinkGlobalState();
	const LockedIcon = is_public
		? LockOpenIcon
		: share_with.length
			? ShareIcon
			: LockClosedIcon;

	function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
		if ([event.code, event.key].includes("Escape")) {
			toggleEdit({
				link,
				isLinkBeingEdited: true,
				shouldCancel: true
			});
		}
		if ([event.code, event.key].includes("Enter")) {
			if (link?.title === localTitle) {
				toggleEdit({
					link,
					isLinkBeingEdited: true,
					shouldCancel: true
				});
			} else {
				toggleEdit({
					link: { ...link, title: localTitle },
					shouldCancel: false,
					isLinkBeingEdited: true
				});
				updateLink({
					...link,
					title: localTitle
				});
			}
		}
	}

	return (
		<div className="max-w-full sm:max-w-full">
			<p className="mb-2 mt-4 flex font-medium text-gray-300 sm:mt-2">
				<LockedIcon
					className="mr-2 mt-1 size-4 shrink-0 text-gray-600"
					aria-hidden="true"
				/>
				{edit ? (
					<Input
						focusOnMount
						onChange={(event) => {
							setLocalTitle(event.currentTarget.value);
						}}
						onKeyDown={handleKeyDown}
						id="textFilter"
						value={localTitle}
						className="-mt-1 bg-gray-950 pl-4"
					/>
				) : (
					title
				)}
			</p>
		</div>
	);
}

export { LinkTitle };
