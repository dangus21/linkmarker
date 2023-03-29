import { Fragment } from "react";

import { BellIcon } from "@heroicons/react/24/outline";
import { PlusIcon } from "@heroicons/react/20/solid";

import { Disclosure, Popover, Transition } from "@headlessui/react";

import { Database } from "@/lib/types";
import { useRouter } from "next/router";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useUserGlobalState } from "@/state";
import Image from "next/image";

function Navbar() {
	const supabaseClient = useSupabaseClient<Database>();

	const { push } = useRouter();
	const globalUserState = useUserGlobalState();

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
		<Disclosure as="nav" className="bg-gray-800">
			<div className="px-8 mx-auto max-w-7xl lg:px-8">
				<div className="flex h-16 justify-between">
					<div className="flex flex-row">
						<div className="flex mr-5" onClick={() => push("/")}>
							<div className="flex items-center space-x-4">
								<p className="text-white italic font-bold text-lg cursor-pointer">
									LinkMarker
								</p>
							</div>
						</div>
					</div>
					<div className="flex items-center">
						<div className="flex-shrink-0">
							<button
								onClick={() => push("/new")}
								type="button"
								className="relative inline-flex items-center gap-x-1.5 rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
							>
								<PlusIcon
									className="-ml-0.5 h-5 w-5"
									aria-hidden="true"
								/>
								<p className="hidden md:block">New Link</p>
							</button>
						</div>
						<div className="flex flex-shrink-0 items-center">
							<button
								type="button"
								className="rounded-full bg-gray-800 mx-5 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
							>
								<span className="sr-only">
									View notifications
								</span>
								<BellIcon
									className="h-6 w-6"
									aria-hidden="true"
								/>
							</button>

							<Popover className="relative">
								<Popover.Button className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
									<div className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
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
										<div className="w-screen max-w-sm flex-auto rounded bg-white py-2 text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
											{userNavigation.map((item) => (
												<div
													key={item.name}
													onClick={item.action}
													className="cursor-pointer text-center relative py-2 hover:bg-gray-100/90"
												>
													<a className="font-semibold text-gray-900">
														{item.name}
														<span className="absolute inset-0" />
													</a>
												</div>
											))}
										</div>
									</Popover.Panel>
								</Transition>
							</Popover>
							<div className="hidden md:flex h-full place-items-center space-x-4 px-4">
								<div
									onClick={() => push("/profile")}
									className="text-white text-lg cursor-pointer"
								>
									{globalUserState.userName}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Disclosure>
	);
}

export { Navbar };
