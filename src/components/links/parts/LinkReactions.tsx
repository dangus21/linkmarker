import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";

import { Database } from "@/lib/types";
import { FaceSmileIcon } from "@heroicons/react/20/solid";
import { REACTIONS } from "@/utils";
import { SupabaseClient } from "@supabase/auth-helpers-react";
import { TLink, useLinkGlobalState } from "@/state";
import { updateLinkInfo } from "@/hooks";

function LinkReactions(
	{
		link,
		reaction,
		supabaseClient
	}:
		{
			link: TLink;
			reaction: string;
			supabaseClient: SupabaseClient<Database>;
		}
) {
	const { update: updateLink } = useLinkGlobalState();

	return (
		<Popover className="relative h-1/2 sm:h-auto">
			<Popover.Button className="h-full w-16 sm:w-20 hover:bg-gray-100">
				{link.reaction &&
					reaction ? (
						<span className="text-xl sm:text-2xl">
							{reaction}
						</span>
					) : (
						<span className="grid place-items-center">
							<FaceSmileIcon
								className="h-8 w-8 sm:h-10 s:w-10 text-gray-300"
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
				<Popover.Panel className="absolute -right-[100%] sm:right-1/2 z-10 flex max-w-[18rem] -translate-x-1/2 sm:-translate-x-1/4 px-4">
					{({ close }) => (
						<div className="w-auto flex-auto rounded bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5 flex flex-row">
							{Object.entries(
								REACTIONS
							).map(
								([
									key,
									icon
								]) => (
									<div
										onClick={() => {
											updateLinkInfo(
												{
													link: {
														reaction:
															key
													},
													id: link.id,
													supabaseClient,
													updateLink
												}
											);
											close();
										}}
										key={
											key
										}
										className={`cursor-pointer text-center relative hover:bg-gray-200/90 ${link.reaction ===
											key &&
											"bg-neutral-100"
										}`}
									>
										<p className="font-semibold text-gray-900 text-lg sm:text-2xl p-3">
											{
												icon
											}
											<span className="absolute inset-0" />
										</p>
									</div>
								)
							)}
						</div>
					)}
				</Popover.Panel>
			</Transition>
		</Popover>
	);
};

export { LinkReactions };