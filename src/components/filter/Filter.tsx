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
				<input
					onChange={e => setTextFilter(e.target.value)}
					type="textFilter"
					name="textFilter"
					id="textFilter"
					className="bg-gray-900 block w-full rounded-md border-0 py-1.5 pl-10 text-gray-100 ring-1 ring-inset ring-black placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6 focus-visible:outline focus-visible:outline-1 focus-visible:outline-black"
					placeholder="Filter links by title"
				/>
			</nav>
		</div>
	);
}

export { Filter };
