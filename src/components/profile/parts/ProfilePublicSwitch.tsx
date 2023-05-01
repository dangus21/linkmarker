import { Switch } from "@headlessui/react";
import { twMerge } from "tailwind-merge";
import { useUserGlobalState } from "@/state";

function ProfilePublicSwitch() {
	const globalUserState = useUserGlobalState();

	return (
		<div className="relative">
			<label
				htmlFor="name"
				className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-300"
			>

			</label>
			<Switch.Group as="div" className="flex items-center justify-between">
				<span className="flex flex-grow flex-col">
					<Switch.Label as="span" className="text-sm font-medium leading-6 text-gray-300" passive>
						Should your profile be public?
					</Switch.Label>
				</span>
				<Switch
					checked={globalUserState.is_public || false}
					onChange={(checked) => globalUserState.setis_public(checked)}
					className={
						twMerge(
							globalUserState.is_public ? "bg-indigo-600" : "bg-gray-200",
							"relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer",
							"rounded-full border-2 border-transparent transition-colors",
							"duration-200 ease-in-out focus:outline-none focus:ring-2",
							"focus:ring-indigo-600 focus:ring-offset-2"
						)
					}
				>
					<span
						aria-hidden="true"
						className={
							twMerge(
								globalUserState.is_public ? "translate-x-5" : "translate-x-0",
								"pointer-events-none inline-block h-5 w-5 transform rounded-full",
								"bg-white shadow ring-0 transition duration-200 ease-in-out"
							)
						}
					/>
				</Switch>
			</Switch.Group>
		</div>
	);
};

export { ProfilePublicSwitch };