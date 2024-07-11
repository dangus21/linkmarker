import { deleteLink } from "@/hooks";
import type { Database } from "@/lib/types";
import { useLinkGlobalState } from "@/state";
import type { SupabaseClient } from "@supabase/supabase-js";

import { XMarkIcon } from "@heroicons/react/20/solid";
import { twMerge } from "tailwind-merge";

// million-ignore
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
	if (!canDeleteLink && !isAdmin) {
		return (
			<div className="relative flex h-1/3 w-16 items-center justify-center sm:h-full sm:w-20 flex-grow" />
		);
	}

	return (
		<div
			onMouseDown={() =>
				deleteLink({
					id: link,
					supabaseClient,
					setLinks,
					currentUser: user,
				})
			}
			className={twMerge(
				"relative flex h-1/3 w-16 items-center justify-center sm:h-full sm:w-20 flex-grow cursor-pointer hover:bg-red-900/20",
			)}
		>
			<span>
				<XMarkIcon
					className={twMerge("s:w-10 h-8 w-8 sm:h-10 text-red-500")}
					aria-hidden="true"
				/>
			</span>
		</div>
	);
}

export { LinkDelete };
