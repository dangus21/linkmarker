import { LockClosedIcon, LockOpenIcon } from "@heroicons/react/20/solid";

function LinkTitle({
	title,
	isPublic,
	shareWith,
}: {
	title: string;
	isPublic: boolean;
	shareWith: string[];
}) {
	const LockedIcon = isPublic ? LockOpenIcon : LockClosedIcon;

	return (
		<div className="max-w-auto sm:max-w-full">
			<p className="mb-2 font-medium text-gray-300">{title}</p>
			<p className="inline-flex text-sm text-gray-500">
				<LockedIcon
					className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
					aria-hidden="true"
				/>
				{isPublic ? "Public" : "Private"}
				{shareWith.length > 0 && "/Shared"}
			</p>
		</div>
	);
}

export { LinkTitle };
