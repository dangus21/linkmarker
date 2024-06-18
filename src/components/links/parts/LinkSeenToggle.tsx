import { EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid";

function LinkSeenToggle({
	toggleSeenStatus,
	opened,
}: {
	toggleSeenStatus: () => Promise<void>;
	opened: boolean;
}) {
	const VisibilityIcon = !opened ? EyeIcon : EyeSlashIcon;
	return (
		<div
			onMouseDown={toggleSeenStatus}
			className="relative flex h-1/3 w-16 cursor-pointer items-center justify-center hover:bg-gray-800 sm:h-full sm:w-20 flex-grow"
		>
			<VisibilityIcon className="s:w-8 h-[1.67rem] w-[1.67rem] text-gray-600 sm:h-8" />
		</div>
	);
}

export { LinkSeenToggle };
