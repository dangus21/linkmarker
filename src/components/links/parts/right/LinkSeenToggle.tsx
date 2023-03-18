import { EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid";
import { LinkParts } from "./LinkParts";

function LinkSeenToggle({
	isAdmin,
	toggleSeenStatus,
	invalidation,
	opened
}: {
	isAdmin: boolean;
	toggleSeenStatus: () => Promise<void>;
	invalidation?: boolean[];
	opened: boolean;
}) {
	const VisibilityIcon = !opened ? EyeIcon : EyeSlashIcon;

	return (
		<LinkParts
			isAdmin={isAdmin}
			invalidation={invalidation}
			onMouseDown={toggleSeenStatus}
			icon={VisibilityIcon}
		/>
	);
}

export { LinkSeenToggle };
