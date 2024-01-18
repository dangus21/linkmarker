import { Fragment } from "react";

import { Database } from "@/lib/types";
import { useUserGlobalState } from "@/state";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";

import { Popover, Transition } from "@headlessui/react";
import Image from "next/image";
import { twMerge } from "tailwind-merge";

function NavbarProfile() {
	const supabaseClient = useSupabaseClient<Database>();
	const globalUserState = useUserGlobalState();
	const { push } = useRouter();

	const userNavigation = [
		{
			name: "Profile",
			action: () => push("/profile"),
		},
		{
			name: "Sign out",
			action: () => supabaseClient.auth.signOut(),
		},
	];
	return (
		<Popover className="relative pt-2">
			<Popover.Button className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
				<div
					className={twMerge(
						"flex rounded-full bg-gray-800 text-sm focus:outline-none",
						"focus:ring-2 focus:ring-gray-700 focus:ring-offset-2",
						"focus:ring-offset-gray-800",
					)}
				>
					<div className="h-10 w-10 overflow-hidden rounded-full hover:opacity-90">
						<Image
							className="aspect-square h-10"
							quality={50}
							src={
								globalUserState.avatar.img ||
								"/avatar_placeholder.png"
							}
							alt="Profile Picture"
							width={250}
							height={250}
						/>
					</div>
				</div>
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
				<Popover.Panel className="absolute right-0 z-10 flex max-w-[15rem] px-4 sm:-right-8 ">
					<div
						className={twMerge(
							"w-screen max-w-sm flex-auto rounded bg-gray-900 shadow-[0px_10px_18px_21px_#00000024,0px_3px_8px_0px_#00000024,0px_3px_8px_0px_#00000024,0px_3px_8px_0px_#00000024,0px_3px_8px_0px_#00000024,0px_3px_8px_0px_#00000024,0px_3px_8px_0px_#00000024,0px_3px_8px_0px_#00000024,0px_3px_8px_0px_#00000024]",
							"py-2 text-sm outline-back outline outline-1 divide-y divide-black",
						)}
					>
						{userNavigation.map((item) => (
							<div
								key={item.name}
								onMouseDown={item.action}
								className="relative cursor-pointer py-2 text-center hover:bg-gray-800/90"
							>
								<div className="font-semibold text-gray-100">
									{item.name}
									<span className="absolute inset-0" />
								</div>
							</div>
						))}
					</div>
				</Popover.Panel>
			</Transition>
		</Popover>
	);
}

export { NavbarProfile };
