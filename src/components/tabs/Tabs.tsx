import { TABS, useLinkGlobalState } from "@/state";
import { classNames } from "@/utils";
import { useState } from "react";

function Tabs() {
	const { ownershipFilter, setOwnershipFilter } = useLinkGlobalState();

	const [currentTab, setCurrentTab] = useState<TABS>(TABS.ALL);

	const tabs = [
		{ id: TABS.ALL, name: "All" },
		{ id: TABS.MINE, name: "Mine" },
		{ id: TABS.SHARED, name: "Shared" },
		{ id: TABS.PRIVATE, name: "Private" }
	];

	return (
		<div className="h-12 w-full sticky top-[63px] bg-white z-10 flex items-center place-content-center">
			<nav className="flex space-x-4 justify-center" aria-label="Tabs">
				{tabs.map((tab, index: TABS) => (
					<div
						onClick={() => {
							if (ownershipFilter !== index) {
								setOwnershipFilter(index);
								setCurrentTab(index);
							}
						}}
						key={tab.name}
						className={classNames(
							tab.id === currentTab ?
								"bg-gray-200 text-gray-800 hover:bg-gray-300" :
								"text-gray-600 hover:text-gray-800 hover:bg-gray-100",
							"rounded-md px-3 py-2 text-sm font-medium cursor-pointer select-none"
						)}
						aria-current={tab.id === currentTab ? "page" : undefined}
					>
						{tab.name}
					</div>
				))}
			</nav>
		</div>
	);
};

export { Tabs };
