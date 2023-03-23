import { Fragment } from "react";

import { BellIcon } from "@heroicons/react/24/outline";
import { PlusIcon } from "@heroicons/react/20/solid";

import { Disclosure, Menu, Transition } from "@headlessui/react";

import { classNames } from "@/utils";
import { useGlobalState } from "@/state";
import { useRouter } from "next/router";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import Image from "next/image";

function Navbar() {
	const supabaseClient = useSupabaseClient();

	const { push } = useRouter();
	const globalUserState = useGlobalState(state => state.user);

	const userNavigation = [
		{
			name: "Your Profile",
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
								<p className="text-white italic font-bold text-lg cursor-pointer">LinkMarker</p>
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
						<div className="ml-4 flex flex-shrink-0 items-center">
							<button
								type="button"
								className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
							>
								<span className="sr-only">
									View notifications
								</span>
								<BellIcon
									className="h-6 w-6"
									aria-hidden="true"
								/>
							</button>

							<Menu as="div" className="relative ml-3 flex place-items-center">
								<Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
									<span className="sr-only">
										Open user menu
									</span>
									<div className="h-10 w-10 rounded-full overflow-hidden hover:opacity-90">
										<Image
											className="h-10"
											quality={50}
											src={globalUserState.avatar.img || "/avatar_placeholder.png"}
											alt="Profile Picture"
											width={250}
											height={250}
										/>
									</div>
								</Menu.Button>
								<div className="hidden md:flex h-full place-items-center space-x-4 px-4">
									<p className="text-white text-lg cursor-pointer">
										{globalUserState.userName}
									</p>
								</div>
								<Transition
									as={Fragment}
									enter="transition ease-out duration-200"
									enterFrom="transform opacity-0 scale-95"
									enterTo="transform opacity-100 scale-100"
									leave="transition ease-in duration-75"
									leaveFrom="transform opacity-100 scale-100"
									leaveTo="transform opacity-0 scale-95"
								>
									<Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
										{userNavigation.map((item) => (
											<Menu.Item key={item.name}>
												{({ active }) => (
													<a
														onClick={
															item.action
																? item.action
																: undefined
														}
														className={classNames(
															active
																? "bg-gray-100"
																: "",
															"block px-4 py-2 text-sm text-gray-700"
														)}
													>
														{item.name}
													</a>
												)}
											</Menu.Item>
										))}
									</Menu.Items>
								</Transition>
							</Menu>
						</div>
					</div>
				</div>
			</div>
		</Disclosure>
	);
}

export { Navbar };
