import { ArchiveBoxArrowDownIcon } from "@heroicons/react/20/solid";
import { LinkParts } from "./LinkParts";

function LinkArchive({
	isAdmin,
	toggleArchivedStatus,
	invalidation
}: {
	isAdmin: boolean;
	toggleArchivedStatus: () => Promise<void>;
	invalidation: boolean[];
}) {
	return (
		<LinkParts
			isAdmin={isAdmin}
			onMouseDown={toggleArchivedStatus}
			invalidation={invalidation}
			icon={ArchiveBoxArrowDownIcon}
		/>
	);
}

export { LinkArchive };
