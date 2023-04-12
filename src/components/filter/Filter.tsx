import { useLinkGlobalState } from "@/state";

function Filter() {
	const { setTextFilter } = useLinkGlobalState();

	return (
		<div className="mt-5 w-full">
			<nav className="relative flex flex-col justify-center w-96 mx-auto" aria-label="Text filter">
				<label
					htmlFor="textFilter"
					className="absolute -top-0 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900"
				>
					Filter links by text in title
				</label>
				<div className="mt-2">
					<input
						onChange={e => setTextFilter(e.target.value)}
						type="textFilter"
						name="textFilter"
						id="textFilter"
						className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
						placeholder="Text in title"
					/>
				</div>
			</nav>
		</div>
	);
}

export { Filter };
