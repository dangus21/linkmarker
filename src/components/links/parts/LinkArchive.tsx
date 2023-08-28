import { ArchiveBoxArrowDownIcon } from "@heroicons/react/20/solid";
import { twMerge } from "tailwind-merge";

function LinkArchive(
	{
		toggleArchivedStatus,
		isArchivable,
	}: {
		toggleArchivedStatus: () => Promise<void>;
		isArchivable: boolean;

	}) {

	return (

		<div
			onClick={isArchivable ? toggleArchivedStatus : () => null}
			className={
				twMerge(
					"relative flex h-1/3 justify-center items-center sm:h-full w-16 sm:w-20 hover:bg-gray-800",
					isArchivable && "cursor-pointer"
				)
			}>
			<ArchiveBoxArrowDownIcon className={
				twMerge(
					"h-[1.67rem] w-[1.67rem] sm:h-8 s:w-8",
					isArchivable ?
						"text-gray-600" :
						"text-gray-400/10"
				)
			} />
		</div>
	);
}

export { LinkArchive };