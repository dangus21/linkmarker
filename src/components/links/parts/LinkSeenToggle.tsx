import { EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid";

function LinkSeenToggle(
	{
		toggleSeenStatus,
		opened
	}: {
		toggleSeenStatus: () => Promise<void>;
		opened: boolean;

	}) {
	const VisibilityIcon = !opened ? EyeIcon : EyeSlashIcon;
	return (

		<div
			onClick={toggleSeenStatus}
			className="relative flex h-1/3 justify-center items-center sm:h-full w-16 sm:w-20 cursor-pointer hover:bg-gray-800">
			<VisibilityIcon className="h-[1.67rem] w-[1.67rem] sm:h-8 s:w-8 text-gray-600" />
		</div>
	);
}

export { LinkSeenToggle };