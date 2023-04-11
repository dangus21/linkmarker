import { useLinkGlobalState } from "@/state";

function Filter() {
	const { setTextFilter } = useLinkGlobalState();

	return (
		<div className="mt-5 w-full">
			<nav className="flex flex-col justify-center w-96 mx-auto" aria-label="Text filter">
				<label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
				Filter links by text in title
				</label>
				<div className="mt-2">
					<input
						onChange={e => setTextFilter(e.target.value)}
						type="textFilter"
						name="textFilter"
						id="textFilter"
						className="px-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
						placeholder="Text in title"
					/>
				</div>
			</nav>
		</div>
	);
}

export { Filter };
