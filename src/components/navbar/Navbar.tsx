
// import { BellIcon } from "@heroicons/react/24/outline";
import { PlusIcon } from "@heroicons/react/20/solid";

import { Disclosure } from "@headlessui/react";

import { Button } from "../button";
import { Filter } from "../filter";
import { NavbarLogo, NavbarProfile } from "./parts";
import { useRouter } from "next/router";

function Navbar() {
	const { push } = useRouter();

	return (
		<Disclosure as="nav" className="bg-gray-800 sticky top-0 z-20">
			<div className="px-4 sm:px-8 mx-auto max-w-7xl lg:px-8">
				<div className="flex h-16 justify-between">
					<div className="flex flex-row">
						<NavbarLogo />
					</div>
					<div className="flex items-center">
						<Filter />
					</div>
					<div className="flex items-center">
						<div className="flex-shrink-0">
							<Button
								onClick={() => push("/new")}
								type="button"
								className="w-auto mx-5 relative inline-flex items-center gap-x-1.5"
							>
								<PlusIcon
									className="-ml-0.5 h-5 w-5"
									aria-hidden="true"
								/>
								<p className="hidden md:block">New Link</p>
							</Button>
						</div>
						<div className="flex flex-shrink-0 items-center">
							<NavbarProfile />
						</div>
					</div>
				</div>
			</div>
		</Disclosure>
	);
}

export { Navbar };
