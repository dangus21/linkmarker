import { Switch } from "@headlessui/react";
import { twMerge } from "tailwind-merge";
import { useLinkGlobalState } from "@/state";

function NewLinkDeletable() {
	const globalLinkState = useLinkGlobalState();
	const isLinkDeletable = globalLinkState.new.is_deletable;

	return (
		<div className="relative">
			<Switch.Group
				as="div"
				className="flex items-center justify-between"
			>
				<span className="flex flex-grow flex-col">
					<Switch.Label
						as="span"
						className="text-sm font-medium leading-6 text-gray-300"
						passive
					>
						Is this link deletable by others?
					</Switch.Label>
				</span>
				<Switch
					checked={isLinkDeletable || false}
					onChange={(checked) => {
						globalLinkState.create({
							is_deletable: checked,
						});
					}}
					className={twMerge(
						isLinkDeletable ? "bg-slate-700" : "bg-slate-400",
						"relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer",
						"rounded-full border-2 border-transparent transition-colors",
						"duration-200 ease-in-out focus:outline-none focus:ring-2",
						"focus:ring-slate-600 focus:ring-offset-2",
					)}
				>
					<span
						aria-hidden="true"
						className={twMerge(
							isLinkDeletable ? "translate-x-5" : "translate-x-0",
							"pointer-events-none inline-block h-5 w-5 transform",
							"rounded-full bg-slate-100 shadow ring-0 transition",
							"duration-200 ease-in-out",
						)}
					/>
				</Switch>
			</Switch.Group>
		</div>
	);
}

export { NewLinkDeletable };
