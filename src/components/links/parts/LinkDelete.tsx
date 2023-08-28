import { Database } from "@/lib/types";
import { SupabaseClient } from "@supabase/supabase-js";
import { deleteLink } from "@/hooks";
import { useLinkGlobalState } from "@/state";

import { XMarkIcon } from "@heroicons/react/20/solid";
import { twMerge } from "tailwind-merge";

// million-ignore
function LinkDelete(
	{
		canDeleteLink,
		link,
		user,
		supabaseClient
	}:
		{
			canDeleteLink: boolean;
			link: string;
			user: string;
			supabaseClient: SupabaseClient<Database>;
		}
) {
	const { set: setLinks } = useLinkGlobalState();

	return (
		<div
			onClick={() => canDeleteLink ?
				deleteLink({
					id: link,
					supabaseClient,
					setLinks,
					currentUser: user
				}) :
				() => null
			}
			className={
				twMerge(
					"relative sm:h-full w-16 sm:w-20 flex h-1/3 justify-center items-center",
					canDeleteLink && "cursor-pointer hover:bg-red-900/20"
				)
			}
		>
			<span>
				<XMarkIcon
					className={
						twMerge(
							"h-8 w-8 sm:h-10 s:w-10",
							canDeleteLink ?
								"text-red-500" :
								"text-gray-400/10"
						)
					}
					aria-hidden="true"
				/>
			</span>
		</div>
	);
}

export { LinkDelete };