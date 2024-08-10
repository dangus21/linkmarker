import { PencilIcon } from "@heroicons/react/20/solid";
import { LinkParts } from "./LinkParts";

function LinkEdit({
	isOwnLink,
	toggleEdit,
}: {
	isOwnLink: boolean;
	toggleEdit: (shouldCancel: boolean) => void;
}) {
	return (
		<LinkParts
			onMouseDown={() => toggleEdit(false)}
			invalidation={!isOwnLink}
			icon={PencilIcon}
		/>
	);
}

export { LinkEdit };
