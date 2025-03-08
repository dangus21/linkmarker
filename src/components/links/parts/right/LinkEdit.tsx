import { LinkParts } from "./LinkParts";
import { PencilIcon } from "@heroicons/react/20/solid";
import { TLink } from "@/state";

function LinkEdit({
	link,
	isAdmin,
	toggleEdit,
	invalidation
}: {
	link: TLink;
	isAdmin: boolean;
	invalidation?: boolean[];
	toggleEdit: ({
		link,
		shouldCancel
	}: {
		link: Partial<TLink>;
		shouldCancel: boolean;
	}) => void;
}) {
	return (
		<LinkParts
			isAdmin={isAdmin}
			onMouseDown={() => toggleEdit({ link, shouldCancel: false })}
			invalidation={invalidation}
			icon={PencilIcon}
		/>
	);
}

export { LinkEdit };
