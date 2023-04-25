import { Database } from "@/lib/types";
import { SupabaseClient } from "@supabase/supabase-js";
import { classNames } from "@/utils";
import { deleteLink } from "@/hooks";
import { useLinkGlobalState } from "@/state";

import { XMarkIcon } from "@heroicons/react/20/solid";

// eslint-disable-next-line @typescript-eslint/no-empty-function
const no_op = () => { };

function LinkDelete(
	{
		canDeleteLink,
		linkId,
		userId,
		supabaseClient
	}:
		{
			canDeleteLink: boolean;
			linkId: string;
			userId: string;
			supabaseClient: SupabaseClient<Database>;
		}
) {
	const { set: setLinks } = useLinkGlobalState();

	return (
		<div
			onClick={() => canDeleteLink ?
				deleteLink({
					id: linkId,
					supabaseClient,
					setLinks,
					currentUser: userId
				}) :
				no_op
			}
			className={
				classNames(
					"relative flex-auto sm:h-full w-16 sm:w-20 grid place-content-center",
					canDeleteLink ? "cursor-pointer hover:bg-red-200" : ""
				)
			}
		>
			<span>
				<XMarkIcon
					className={
						classNames(
							"h-8 w-8 sm:h-10 s:w-10",
							canDeleteLink ?
								"text-red-500" :
								"text-gray-400"
						)
					}
					aria-hidden="true"
				/>
			</span>
		</div>
	);
};

export { LinkDelete };