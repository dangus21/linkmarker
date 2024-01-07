// import { BellIcon } from "@heroicons/react/24/outline";

import { Disclosure } from "@headlessui/react";

import { useViewport } from "@/utils";
import { Filter } from "../filter";
import { NewLinkButton } from "../newLinkButton/NewLinkButton";
import { NavbarLogo, NavbarProfile } from "./parts";

function Navbar() {
	const { width } = useViewport();
	return (
		<Disclosure as="nav" className="sticky top-0 z-20 bg-gray-800">
			<div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-8">
				<div className="flex h-16 justify-between">
					<div className="flex flex-row">
						<NavbarLogo />
					</div>
					<div className="flex items-center">
						<Filter />
					</div>
					<div className="flex items-center">
						{width > 630 && <NewLinkButton />}
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
