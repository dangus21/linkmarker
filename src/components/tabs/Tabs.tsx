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
		{ id: TABS.PRIVATE, name: "Private" },
		{ id: TABS.ARCHIVED, name: "Archived" },
	];

	return (
		<div className="sticky top-[63px] z-10 flex h-12 w-full place-content-center items-center bg-gray-900">
			<nav className="flex justify-center space-x-4" aria-label="Tabs">
				{tabs.map((tab, index: TABS) => (
					<div
						onMouseDown={() => {
							if (ownershipFilter !== index) {
								setOwnershipFilter(index);
								setCurrentTab(index);
							}
						}}
						key={tab.name}
						className={classNames(
							tab.id === currentTab
								? "bg-gray-700  hover:bg-gray-600"
								: "hover:bg-gray-700",
							"cursor-pointer select-none rounded-md px-3 py-2 text-sm font-medium text-gray-100",
						)}
						aria-current={
							tab.id === currentTab ? "page" : undefined
						}
					>
						{tab.name}
					</div>
				))}
			</nav>
		</div>
	);
}

export { Tabs };
