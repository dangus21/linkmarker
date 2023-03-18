import { Fragment } from "react";
import { useRouter } from "next/navigation";
import { useUserGlobalState } from "@/state";

import {
	Popover,
	PopoverButton,
	PopoverPanel,
	Transition
} from "@headlessui/react";
import { supabase } from "@/hooks/links";
import { twMerge } from "tailwind-merge";
import { useLocalStorage } from "usehooks-ts";
import Image from "next/image";
import type { Session, User } from "@supabase/auth-js";

function NavbarProfile() {
	const [, , removeLocalUser] = useLocalStorage<User | null>("user", null);
	const [, , removeLocalSession] = useLocalStorage<Session | null>(
		"session",
		null
	);

	const globalUserState = useUserGlobalState();
	const { push } = useRouter();

	const userNavigation = [
		{
			name: "Profile",
			action: () => push("/profile")
		},
		{
			name: "Sign out",
			action: async () => {
				removeLocalSession();
				removeLocalUser();
				await supabase.auth.signOut();
				push("/");
			}
		}
	];
	return (
		<Popover className="relative ml-4 pt-2">
			<PopoverButton className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
				<div
					className={twMerge(
						"flex rounded-full bg-gray-800 text-sm focus:outline-none",
						"focus:ring-2 focus:ring-gray-700 focus:ring-offset-2",
						"focus:ring-offset-gray-800"
					)}
				>
					<div className="size-10 overflow-hidden rounded-full hover:opacity-90">
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
				<PopoverPanel className="absolute right-0 z-10 flex max-w-60 px-4 sm:-right-8">
					<div
						className={twMerge(
							"w-screen max-w-sm flex-auto rounded bg-gray-900",
							"shadow-[0px_10px_18px_21px_#00000024,0px_3px_8px_0px_#00000024,0px_3px_8px_0px_#00000024,0px_3px_8px_0px_#00000024,0px_3px_8px_0px_#00000024,0px_3px_8px_0px_#00000024,0px_3px_8px_0px_#00000024,0px_3px_8px_0px_#00000024,0px_3px_8px_0px_#00000024]",
							"outline-back divide-y divide-black py-2 text-sm outline outline-1 outline-black"
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
