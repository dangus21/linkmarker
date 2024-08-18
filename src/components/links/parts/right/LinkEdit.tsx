import { PencilIcon } from "@heroicons/react/20/solid";
import { LinkParts } from "./LinkParts";

function LinkEdit({
	isAdmin,
	toggleEdit,
	invalidation,
}: {
	isAdmin: boolean;
	invalidation?: boolean[];
	toggleEdit: ({
		title,
		shouldCancel,
	}: { title?: string; shouldCancel: boolean }) => void;
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
