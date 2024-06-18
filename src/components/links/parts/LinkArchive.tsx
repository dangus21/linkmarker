import { ArchiveBoxArrowDownIcon } from "@heroicons/react/20/solid";
import { twMerge } from "tailwind-merge";

function LinkArchive({
	toggleArchivedStatus,
	isArchivable,
}: {
	toggleArchivedStatus: () => Promise<void>;
	isArchivable: boolean;
}) {
	return (
		<div
			onMouseDown={isArchivable ? toggleArchivedStatus : () => null}
			className={twMerge(
				"relative flex h-1/3 w-16 items-center justify-center sm:h-full sm:w-20 flex-grow",
				isArchivable && "cursor-pointer hover:bg-gray-800",
			)}
		>
			<ArchiveBoxArrowDownIcon
				className={twMerge(
					"s:w-8 h-[1.67rem] w-[1.67rem] sm:h-8",
					isArchivable ? "text-gray-600" : "text-gray-400/10",
				)}
			/>
		</div>
	);
}

export { LinkArchive };
