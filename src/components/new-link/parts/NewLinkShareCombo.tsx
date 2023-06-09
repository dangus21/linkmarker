import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Combobox } from "@headlessui/react";
import { User, useLinkGlobalState, useUserGlobalState } from "@/state";
import { twMerge } from "tailwind-merge";

function NewLinkShareCombo({ users }: { users: User[] }) {
	console.log("LOG ~ file: NewLinkShareCombo.tsx:7 ~ users:", users);
	const globalLinkState = useLinkGlobalState();
	const globalUserState = useUserGlobalState();

	const productionUsers = process.env.NODE_ENV === "production" ?
		users.filter(user => user.id !== "6550a93e-69c4-45ae-870e-c45f47586ceb") :
		users;

	const publicUsers = productionUsers.filter(user => user.id !== globalUserState.id);

	return (
		<div className="relative">
			<Combobox
				as="div"
				value={globalLinkState.new.share_with || []}
				onChange={(checked) => {
					globalLinkState.create({
						share_with: checked
					});
				}}
				multiple
			>
				<Combobox.Label className="block text-sm font-medium leading-6 text-gray-300">
					To whom?
				</Combobox.Label>
				<div className="relative mt-2">
					<Combobox.Input
						className={
							twMerge(
								"bg-gray-900 block w-full rounded-md border-0",
								"py-1.5 pl-4 text-gray-100 ring-1 ring-inset",
								"ring-black placeholder:text-gray-400 focus:ring-2",
								"focus:ring-inset focus:ring-black sm:text-sm",
								"focus-visible:outline-1 focus-visible:outline-black",
								"sm:leading-6 focus-visible:outline"
							)
						}
						placeholder="Single or multiple user"
						displayValue={(person: Record<string, string>[]) => {
							return person.map(user => user?.username).join(", ");
						}}
					/>
					<Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
						<ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
					</Combobox.Button>

					{publicUsers.length > 0 && (
						<Combobox.Options
							className={
								twMerge(
									"absolute z-10 mt-1 max-h-56 w-full overflow-auto",
									"rounded-md bg-gray-900 py-1 text-base shadow-lg",
									"ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
								)
							}>
							{publicUsers.map((user) => (
								<Combobox.Option
									key={user.id}
									value={user}
									className={({ active }) =>
										twMerge(
											active ? "bg-gray-950" : "text-gray-900",
											"relative cursor-default select-none py-2 pl-3 pr-9 text-white",
										)
									}
								>
									{({ active, selected }) => (
										<>
											<div className="flex items-center">
												<span className={
													twMerge(
														"ml-3 truncate",
														selected ? "font-semibold" : ""
													)
												}
												>
													{user.username}
												</span>
											</div>
											{selected && (
												<span
													className={twMerge(
														active ? "text-white" : "text-gray-600",
														"absolute inset-y-0 right-0 flex items-center pr-4",
													)}
												>
													<CheckIcon className="h-5 w-5" aria-hidden="true" />
												</span>
											)}
										</>
									)}
								</Combobox.Option>
							))}
						</Combobox.Options>
					)}
				</div>
			</Combobox>
		</div>
	);
};

export { NewLinkShareCombo };