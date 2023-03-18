import { Input } from "@/components";
import {
	LockClosedIcon,
	LockOpenIcon,
	ShareIcon
} from "@heroicons/react/20/solid";
import { useLinkGlobalState } from "@/state";
import { useState } from "react";

function LinkTitle({
	id,
	title,
	isPublic,
	shareWith,
	edit,
	toggleEdit
}: {
	id: string;
	title: string;
	isPublic: boolean;
	shareWith: string[];
	edit: boolean;
	toggleEdit: ({
		title,
		shouldCancel
	}: {
		title?: string;
		shouldCancel: boolean;
	}) => void;
}) {
	const [localTitle, setLocalTitle] = useState(title);
	const { values, update: updateLink } = useLinkGlobalState();
	const currentLink = values.find((value) => value.id === id);
	const LockedIcon = isPublic
		? LockOpenIcon
		: shareWith.length
			? ShareIcon
			: LockClosedIcon;

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
						onKeyDown={(key) => {
							if (key.code === "Escape") {
								toggleEdit({ shouldCancel: true });
							}
							if (key.code === "Enter") {
								if (currentLink?.title === localTitle) {
									toggleEdit({ shouldCancel: true });
								} else {
									toggleEdit({
										shouldCancel: false,
										title: localTitle
									});
									updateLink({
										...currentLink,
										title: localTitle
									});
								}
							}
						}}
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
