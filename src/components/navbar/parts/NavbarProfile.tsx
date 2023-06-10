import { Fragment } from "react";

import { Database } from "@/lib/types";
import { useRouter } from "next/router";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useUserGlobalState } from "@/state";

import { Popover, Transition } from "@headlessui/react";
import { twMerge } from "tailwind-merge";
import Image from "next/image";

function NavbarProfile() {
	const supabaseClient = useSupabaseClient<Database>();
	const globalUserState = useUserGlobalState();
	const { push } = useRouter();

	const userNavigation = [
		{
			name: "Profile",
			action: () => push("/profile")
		},
		{
			name: "Sign out",
			action: () => supabaseClient.auth.signOut()
		}
	];
	return (
		<Popover className="relative pt-2">
			<Popover.Button
				className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900"
			>
				<div
					className={
						twMerge(
							"flex rounded-full bg-gray-800 text-sm focus:outline-none",
							"focus:ring-2 focus:ring-gray-700 focus:ring-offset-2",
							"focus:ring-offset-gray-800"
						)
					}
				>
					<div className="h-10 w-10 rounded-full overflow-hidden hover:opacity-90">
						<Image
							className="h-10 aspect-square"
							quality={50}
							src={
								globalUserState.avatar
									.img ||
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
				<Popover.Panel className="absolute right-0 sm:-right-8 z-10 flex max-w-[15rem] px-4">
					<div
						className={
							twMerge(
								"w-screen max-w-sm flex-auto rounded bg-gray-900 outline outline-1 outline-back",
								"py-2 text-sm leading-6 shadow-xl ring-1 ring-gray-900/5"
							)
						}>
						{userNavigation.map((item) => (
							<div
								key={item.name}
								onClick={item.action}
								className="cursor-pointer text-center relative py-2 hover:bg-gray-800/90"
							>
								<a className="font-semibold text-gray-100">
									{item.name}
									<span className="absolute inset-0" />
								</a>
							</div>
						))}
					</div>
				</Popover.Panel>
			</Transition>
		</Popover>
	);
}

export { NavbarProfile };