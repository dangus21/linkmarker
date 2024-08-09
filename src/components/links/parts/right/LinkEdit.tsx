import { PencilIcon } from "@heroicons/react/20/solid";
import { LinkParts } from "./LinkParts";

function LinkEdit({
	isOwnLink,
	toggleEditMode,
}: {
	isOwnLink: boolean;
	toggleEditMode: () => void;
}) {
	return (
		<LinkParts
			onMouseDown={toggleEditMode}
			invalidation={!isOwnLink}
			icon={PencilIcon}
		/>
	);
}

export { LinkEdit };
