import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Combobox } from "@headlessui/react";
import { twMerge } from "tailwind-merge";
import { useLinkGlobalState, useUserGlobalState } from "@/state";

function NewLinkShareCombo() {
	const globalLinkState = useLinkGlobalState();
	const globalUserState = useUserGlobalState();

	const productionUsers = globalUserState.usersList
		? process.env.NODE_ENV === "production"
			? Array.from(globalUserState.usersList)
					.filter(
						([, user]) =>
							user.id !== "6550a93e-69c4-45ae-870e-c45f47586ceb"
					)
					.map(([, user]) => user)
			: Array.from(globalUserState.usersList).map(([, user]) => user)
		: [];

	const publicUsers = productionUsers?.filter(
		(user) => user.id !== globalUserState.id
	);

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
				<Combobox.Label className="block text-sm leading-6 font-medium text-gray-300">
					To whom?
				</Combobox.Label>
				<div className="relative mt-2">
					<Combobox.Input
						className={twMerge(
							"block w-full rounded-md border-0 bg-gray-900",
							"py-1.5 pl-4 text-gray-100 ring-1 ring-inset",
							"ring-black placeholder:text-gray-400 focus:ring-2",
							"focus:ring-black focus:ring-inset sm:text-sm",
							"focus-visible:outline-1 focus-visible:outline-black",
							"focus-visible:outline sm:leading-6"
						)}
						placeholder="Single or multiple user"
						displayValue={(person: Record<string, string>[]) => {
							return person
								.map((user) => user?.username)
								.join(", ");
						}}
					/>
					<Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
						<ChevronUpDownIcon
							className="size-5 text-gray-400"
							aria-hidden="true"
						/>
					</Combobox.Button>

					{publicUsers.length > 0 && (
						<Combobox.Options
							className={twMerge(
								"absolute z-10 mt-1 max-h-56 w-full overflow-auto",
								"rounded-md bg-gray-900 py-1 text-base shadow-lg",
								"ring-opacity-5 ring-1 ring-black focus:outline-none sm:text-sm"
							)}
						>
							{publicUsers.map((user) => (
								<Combobox.Option
									key={user.id}
									value={user}
									className={({ active }) =>
										twMerge(
											active
												? "bg-gray-950"
												: "text-gray-900",
											"relative cursor-default py-2 pr-9 pl-3 text-white select-none"
										)
									}
								>
									{({ active, selected }) => (
										<>
											<div className="flex items-center">
												<span
													className={twMerge(
														"ml-3 truncate",
														selected
															? "font-semibold"
															: ""
													)}
												>
													{user.username}
												</span>
											</div>
											{selected && (
												<span
													className={twMerge(
														active
															? "text-white"
															: "text-gray-600",
														"absolute inset-y-0 right-0 flex items-center pr-4"
													)}
												>
													<CheckIcon
														className="size-5"
														aria-hidden="true"
													/>
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
}

export { NewLinkShareCombo };
