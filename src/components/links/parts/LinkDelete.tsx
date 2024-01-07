import { deleteLink } from "@/hooks";
import { Database } from "@/lib/types";
import { useLinkGlobalState } from "@/state";
import { SupabaseClient } from "@supabase/supabase-js";

import { XMarkIcon } from "@heroicons/react/20/solid";
import { twMerge } from "tailwind-merge";

// million-ignore
function LinkDelete({
	canDeleteLink,
	link,
	user,
	supabaseClient,
}: {
	canDeleteLink: boolean;
	link: string;
	user: string;
	supabaseClient: SupabaseClient<Database>;
}) {
	const { set: setLinks } = useLinkGlobalState();

	return (
		<div
			onMouseDown={() =>
				canDeleteLink
					? deleteLink({
							id: link,
							supabaseClient,
							setLinks,
							currentUser: user,
					  })
					: () => null
			}
			className={twMerge(
				"relative flex h-1/3 w-16 items-center justify-center sm:h-full sm:w-20",
				canDeleteLink && "cursor-pointer hover:bg-red-900/20",
			)}
		>
			<span>
				<XMarkIcon
					className={twMerge(
						"s:w-10 h-8 w-8 sm:h-10",
						canDeleteLink ? "text-red-500" : "text-gray-400/10",
					)}
					aria-hidden="true"
				/>
			</span>
		</div>
	);
}

export { LinkDelete };
