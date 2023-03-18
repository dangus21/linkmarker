import { deleteLink } from "@/hooks";
import { useLinkGlobalState } from "@/state";

import { LinkParts } from "./LinkParts";
import { XMarkIcon } from "@heroicons/react/20/solid";

function LinkDelete({
	canDeleteLink,
	link,
	user,
	isAdmin
}: {
	canDeleteLink: boolean;
	link: string;
	user: string | undefined;
	isAdmin: boolean;
	invalidation: boolean[];
}) {
	const { set: setLinks } = useLinkGlobalState();

	return (
		<LinkParts
			isAdmin={isAdmin}
			onMouseDown={() =>
				deleteLink({
					id: link,
					setLinks,
					currentUser: user
				})
			}
			invalidation={[!canDeleteLink && !isAdmin]}
			icon={XMarkIcon}
			iconCss="s:w-10 h-8 w-8 sm:h-10 text-red-500"
			containerCss="hover:bg-red-900/20"
		/>
	);
}

export { LinkDelete };
