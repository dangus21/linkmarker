import { ArchiveBoxArrowDownIcon } from "@heroicons/react/20/solid";
import { LinkParts } from "./LinkParts";

function LinkArchive({
	toggleArchivedStatus,
	isAdmin,
	isArchivable,
}: {
	toggleArchivedStatus: () => Promise<void>;
	isAdmin: boolean;
	isArchivable: boolean;
}) {
	return (
		<LinkParts
			onMouseDown={toggleArchivedStatus}
			invalidation={!isArchivable && !isAdmin}
			icon={ArchiveBoxArrowDownIcon}
		/>
	);
}

export { LinkArchive };
