import { ArchiveBoxArrowDownIcon } from "@heroicons/react/20/solid";

function LinkArchive(
	{
		toggleArchivedStatus,
	}: {
		toggleArchivedStatus: () => Promise<void>;

	}) {

	return (

		<div
			onClick={toggleArchivedStatus}
			className="relative flex h-1/3 justify-center items-center sm:h-full w-16 sm:w-20 cursor-pointer hover:bg-gray-800">
			<ArchiveBoxArrowDownIcon className="h-[1.67rem] w-[1.67rem] sm:h-8 s:w-8 text-gray-600" />
		</div>
	);
}

export { LinkArchive };