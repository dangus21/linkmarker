import { LinkParts } from "./LinkParts";
import { PencilIcon } from "@heroicons/react/20/solid";

function LinkEdit({
	isAdmin,
	toggleEdit,
	invalidation
}: {
	isAdmin: boolean;
	invalidation?: boolean[];
	toggleEdit: ({
		title,
		shouldCancel
	}: {
		title?: string;
		shouldCancel: boolean;
	}) => void;
}) {
	return (
		<LinkParts
			isAdmin={isAdmin}
			onMouseDown={() => toggleEdit({ shouldCancel: false })}
			invalidation={invalidation}
			icon={PencilIcon}
		/>
	);
}

export { LinkEdit };
