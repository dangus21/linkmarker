import { deleteLink } from "@/hooks";
import type { Database } from "@/lib/types";
import { useLinkGlobalState } from "@/state";
import type { SupabaseClient } from "@supabase/supabase-js";

import { XMarkIcon } from "@heroicons/react/20/solid";
import { LinkParts } from "./LinkParts";

function LinkDelete({
	canDeleteLink,
	link,
	user,
	supabaseClient,
	isAdmin,
}: {
	canDeleteLink: boolean;
	link: string;
	user: string;
	supabaseClient: SupabaseClient<Database>;
	isAdmin: boolean;
}) {
	const { set: setLinks } = useLinkGlobalState();

	return (
		<LinkParts
			onMouseDown={() =>
				deleteLink({
					id: link,
					supabaseClient,
					setLinks,
					currentUser: user,
				})
			}
			invalidation={!canDeleteLink && !isAdmin}
			icon={XMarkIcon}
			iconCss="s:w-10 h-8 w-8 sm:h-10 text-red-500"
			containerCss="hover:bg-red-900/20"
		/>
	);
}

export { LinkDelete };
