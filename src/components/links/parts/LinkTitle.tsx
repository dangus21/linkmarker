import { Input } from "@/components";
import {
	LockClosedIcon,
	LockOpenIcon,
	ShareIcon,
} from "@heroicons/react/20/solid";

function LinkTitle({
	title,
	isPublic,
	shareWith,
	edit,
}: {
	title: string;
	isPublic: boolean;
	shareWith: string[];
	edit: boolean;
}) {
	const LockedIcon = isPublic
		? LockOpenIcon
		: shareWith.length
			? ShareIcon
			: LockClosedIcon;

	return (
		<div className="max-w-full sm:max-w-full">
			<p className="mb-2 mt-4 sm:mt-2 font-medium text-gray-300 flex">
				<LockedIcon
					className="mt-1 mr-2 h-4 w-4 flex-shrink-0 text-gray-600"
					aria-hidden="true"
				/>
				{edit ? (
					<Input
						onChange={(event) =>
							console.log(event.currentTarget.value)
						}
						id="textFilter"
						value={title}
						className="pl-4 -mt-1"
					/>
				) : (
					title
				)}
			</p>
		</div>
	);
}

export { LinkTitle };
