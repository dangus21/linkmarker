import { EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid";
import { LinkParts } from "./LinkParts";

function LinkSeenToggle({
	toggleSeenStatus,
	opened,
}: {
	toggleSeenStatus: () => Promise<void>;
	opened: boolean;
}) {
	const VisibilityIcon = !opened ? EyeIcon : EyeSlashIcon;

	return <LinkParts onMouseDown={toggleSeenStatus} icon={VisibilityIcon} />;
}

export { LinkSeenToggle };
