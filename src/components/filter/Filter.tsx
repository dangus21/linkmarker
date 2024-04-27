import { Input } from "@/components";
import { useLinkGlobalState } from "@/state";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";

function Filter() {
	const { setTextFilter } = useLinkGlobalState();

	return (
		<div className="flex w-full -mr-2 place-content-center items-center">
			<nav
				className="relative mx-auto flex flex-col justify-center sm:w-96 md:w-2/3"
				aria-label="Text filter"
			>
				<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
					<MagnifyingGlassIcon
						className="h-5 w-5 text-gray-400"
						aria-hidden="true"
					/>
				</div>
				<Input
					onChange={(event) =>
						setTextFilter(event.currentTarget.value)
					}
					id="textFilter"
					placeHolder="Filter links by title"
					className="pl-10"
				/>
			</nav>
		</div>
	);
}

export { Filter };
