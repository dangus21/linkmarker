import { useUserGlobalState } from "@/state";
import { useRouter } from "next/router";
import { Fragment } from "react";

import { supabase } from "@/hooks/links";
import {
	Popover,
	PopoverButton,
	PopoverPanel,
	Transition,
} from "@headlessui/react";
import Image from "next/image";
import { twMerge } from "tailwind-merge";

function NavbarProfile() {
	const globalUserState = useUserGlobalState();
	const { push } = useRouter();

	const userNavigation = [
		{
			name: "Profile",
			action: () => push("/profile"),
		},
		{
			name: "Sign out",
			action: () => supabase.auth.signOut(),
		},
	];
	return (
		<Popover className="relative pt-2 ml-4">
			<PopoverButton className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
				<div
					className={twMerge(
						"flex rounded-full bg-gray-800 text-sm focus:outline-none",
						"focus:ring-2 focus:ring-gray-700 focus:ring-offset-2",
						"focus:ring-offset-gray-800",
					)}
				>
					<div className="h-10 w-10 overflow-hidden rounded-full hover:opacity-90">
						<Image
							quality={50}
							src={
								globalUserState.avatar.img ||
								"/avatar_placeholder.png"
							}
							alt="Profile Picture"
							width={200}
							height={160}
							sizes="(max-width: 768px) 100vw,(max-width: 1200px) 50vw,33vw"
						/>
					</div>
				</div>
			</PopoverButton>
			<Transition
				as={Fragment}
				enter="transition ease-out duration-200"
				enterFrom="opacity-0 translate-y-1"
				enterTo="opacity-100 translate-y-0"
				leave="transition ease-in duration-150"
				leaveFrom="opacity-100 translate-y-0"
				leaveTo="opacity-0 translate-y-1"
			>
				<PopoverPanel className="absolute right-0 z-10 flex max-w-[15rem] px-4 sm:-right-8 ">
					<div
						className={twMerge(
							"w-screen max-w-sm flex-auto rounded bg-gray-900",
							"shadow-[0px_10px_18px_21px_#00000024,0px_3px_8px_0px_#00000024,0px_3px_8px_0px_#00000024,0px_3px_8px_0px_#00000024,0px_3px_8px_0px_#00000024,0px_3px_8px_0px_#00000024,0px_3px_8px_0px_#00000024,0px_3px_8px_0px_#00000024,0px_3px_8px_0px_#00000024]",
							"py-2 text-sm outline-back outline outline-1 outline-black divide-y divide-black",
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
				</PopoverPanel>
			</Transition>
		</Popover>
	);
}

export { NavbarProfile };
