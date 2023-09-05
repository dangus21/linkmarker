import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";

import { Database } from "@/lib/types";
import { FaceSmileIcon } from "@heroicons/react/20/solid";
import { REACTIONS, classNames } from "@/utils";
import { SupabaseClient } from "@supabase/auth-helpers-react";
import { TLink, useLinkGlobalState } from "@/state";
import { updateLinkInfo } from "@/hooks";

function LinkReactions({
	link,
	reaction,
	supabaseClient,
}: {
	link: TLink;
	reaction: string;
	supabaseClient: SupabaseClient<Database>;
}) {
	const { update: updateLink } = useLinkGlobalState();

	return (
		<Popover className="relative flex h-1/3 sm:h-full">
			<Popover.Button className="h-full w-16 hover:bg-gray-800 sm:w-20">
				{link.reaction && reaction ? (
					<span className="text-xl sm:text-2xl">{reaction}</span>
				) : (
					<span className="grid place-items-center">
						<FaceSmileIcon
							className="s:w-10 h-8 w-8 text-gray-600 sm:h-10"
							aria-hidden="true"
						/>
					</span>
				)}
			</Popover.Button>
			<Transition
				as={Fragment}
				enter="transition ease-out duration-200"
				enterFrom="opacity-0 translate-y-1"
				enterTo="opacity-100 translate-y-0"
				leave="transition ease-in duration-150"
				leaveFrom="opacity-100 translate-y-0"
				leaveTo="opacity-0 translate-y-1"
			>
				<Popover.Panel className="absolute right-1 top-14 z-50 flex sm:right-1/2 sm:top-16">
					{({ close }) => (
						<div className="flex w-auto flex-auto flex-row rounded bg-gray-700 text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
							{Object.entries(REACTIONS).map(([key, icon]) => (
								<div
									onClick={() => {
										updateLinkInfo({
											link: {
												reaction: key,
											},
											id: link.id,
											supabaseClient,
											updateLink,
										});
										close();
									}}
									key={key}
									className={classNames(
										"relative cursor-pointer text-center hover:bg-gray-600",
										link.reaction === key
											? "bg-gray-800"
											: "",
									)}
								>
									<p className="p-3 text-lg font-semibold text-gray-900 sm:text-2xl">
										{icon}
										<span className="absolute inset-0" />
									</p>
								</div>
							))}
						</div>
					)}
				</Popover.Panel>
			</Transition>
		</Popover>
	);
}

export { LinkReactions };
