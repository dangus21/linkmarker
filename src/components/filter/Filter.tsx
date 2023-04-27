import { Input } from "../input";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { useLinkGlobalState } from "@/state";

function Filter() {
	const { setTextFilter } = useLinkGlobalState();

	return (
		<div className="h-16 w-full flex items-center place-content-center">
			<nav className="relative flex flex-col justify-center sm:w-96 mx-auto" aria-label="Text filter">
				<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
					<MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
				</div>
				<Input
					onChange={(event) => setTextFilter(event.currentTarget.value)}
					id="textFilter"
					placeHolder="Filter links by title"
					className="pl-10"
				/>
			</nav>
		</div>
	);
}

export { Filter };
