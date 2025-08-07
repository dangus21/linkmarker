import { Input } from "@/components";
import { KeyboardEvent, useState } from "react";
import { TLink, useLinkGlobalState } from "@/state";
import { classNames } from "@/utils";

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
	if (!edit) {
		return;
	}

	const { url } = link;
	const [localLink, setLocalLink] = useState(url);
	const { update: updateLink } = useLinkGlobalState();

	function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
		if ([event.code, event.key].includes("Escape")) {
			toggleEdit({
				link,
				isLinkBeingEdited: true,
				shouldCancel: true
			});
		}
		if ([event.code, event.key].includes("Enter")) {
			if (link?.url === localLink) {
				toggleEdit({
					link,
					isLinkBeingEdited: true,
					shouldCancel: true
				});
			} else {
				toggleEdit({
					link: { ...link, url: localLink },
					shouldCancel: false,
					isLinkBeingEdited: true
				});
				updateLink({
					...link,
					url: localLink
				});
			}
		}
	}

	return (
		<div className="max-w-full sm:max-w-full">
			<p className="mt-4 mb-2 ml-6 flex font-medium text-gray-300 sm:mt-2">
				<Input
					focusOnMount
					onChange={(event) => {
						setLocalLink(event.currentTarget.value);
					}}
					onKeyDown={handleKeyDown}
					id="textFilter"
					value={localLink}
					className="-mt-1 bg-gray-950 pl-4"
					placeHolder="Link url"
				/>
			</p>
		</div>
	);
}

export { LinkTitle as LinkLink };
