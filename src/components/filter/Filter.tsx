import { useLinkGlobalState } from "@/state";

function Filter() {
	const { setTextFilter } = useLinkGlobalState();

	return (
		<div className="h-16 w-full flex items-center place-content-center">
			<nav className="relative flex flex-col justify-center sm:w-96 mx-auto" aria-label="Text filter">
				<input
					onChange={e => setTextFilter(e.target.value)}
					type="textFilter"
					name="textFilter"
					id="textFilter"
					className="block w-full rounded-md border-0 py-1 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
					placeholder="Filter links by title"
				/>
			</nav>
		</div>
	);
}

export { Filter };
