import { ArchiveBoxArrowDownIcon } from "@heroicons/react/20/solid";
import { twMerge } from "tailwind-merge";

function LinkArchive({
	toggleArchivedStatus,
	isArchivable,
	isAdmin,
}: {
	toggleArchivedStatus: () => Promise<void>;
	isArchivable: boolean;
	isAdmin: boolean;
}) {
	if (!isArchivable && !isAdmin) {
		return (
			<div className="relative flex h-1/3 w-16 items-center justify-center sm:h-full sm:w-20 flex-grow" />
		);
	}
	return (
		<div
			onMouseDown={toggleArchivedStatus}
			className={twMerge(
				"relative flex h-1/3 w-16 items-center justify-center sm:h-full sm:w-20 flex-grow cursor-pointer hover:bg-gray-900/50",
			)}
		>
			<ArchiveBoxArrowDownIcon
				className={twMerge(
					"s:w-8 h-[1.67rem] w-[1.67rem] sm:h-8 text-gray-600",
				)}
			/>
		</div>
	);
}

export { LinkArchive };
