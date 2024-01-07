import { Switch } from "@headlessui/react";

import { useLinkGlobalState } from "@/state";
import { twMerge } from "tailwind-merge";

function NewLinkPublic() {
	const globalLinkState = useLinkGlobalState();

	const isLinkPublic = globalLinkState.new.is_public;
	const isLinkShareable = globalLinkState.new.is_shareable;

	return (
		<>
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
							Is this link public?
						</Switch.Label>
					</span>
					<Switch
						checked={isLinkPublic || false}
						onChange={(checked) => {
							globalLinkState.create({
								is_public: checked,
								...(checked && { share_with: [] }),
								...(checked && { is_shareable: false }),
							});
						}}
						className={twMerge(
							isLinkPublic ? "bg-slate-700" : "bg-slate-400",
							"relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer",
							"rounded-full border-2 border-transparent transition-colors",
							"duration-200 ease-in-out focus:outline-none focus:ring-2",
							"focus:ring-slate-600 focus:ring-offset-2",
						)}
					>
						<span
							aria-hidden="true"
							className={twMerge(
								isLinkPublic
									? "translate-x-5"
									: "translate-x-0",
								"pointer-events-none inline-block h-5 w-5 transform",
								"rounded-full bg-slate-100 shadow ring-0",
								"transition duration-200 ease-in-out",
							)}
						/>
					</Switch>
				</Switch.Group>
			</div>
			{!globalLinkState.new.is_public && (
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
								Is this link shareable?
							</Switch.Label>
						</span>
						<Switch
							checked={isLinkShareable || false}
							onChange={(checked) => {
								globalLinkState.create({
									is_shareable: checked,
									...(!checked && { share_with: [] }),
								});
							}}
							className={twMerge(
								isLinkShareable
									? "bg-slate-700"
									: "bg-slate-400",
								"relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer",
								"rounded-full border-2 border-transparent transition-colors",
								"duration-200 ease-in-out focus:outline-none focus:ring-2",
								"focus:ring-slate-600 focus:ring-offset-2",
							)}
						>
							<span
								aria-hidden="true"
								className={twMerge(
									isLinkShareable
										? "translate-x-5"
										: "translate-x-0",
									"pointer-events-none inline-block h-5 w-5 transform",
									"rounded-full bg-slate-100 shadow ring-0 transition",
									"duration-200 ease-in-out",
								)}
							/>
						</Switch>
					</Switch.Group>
				</div>
			)}
		</>
	);
}

export { NewLinkPublic };
