import { dateFormatter } from "@/utils";
import { CalendarIcon } from "@heroicons/react/20/solid";

function LinkDate({ postedDate }: { postedDate: string }) {
	return (
		<div className="grid grid-cols-[1fr_25px_1fr] sm:grid-cols-[1fr_minmax(auto,_max-content)_35px] sm:mt-[7px]">
			<CalendarIcon className="h-5 w-5 text-gray-400 mr-1 col-start-2 sm:col-start-3 row-start-2 sm:mr-2 sm:ml-2" />
			<p className="text-sm text-gray-500 col-start-3 sm:col-start-2 row-start-2">
				<time dateTime={(postedDate ?? "").toString()}>
					{dateFormatter.format(new Date(postedDate ?? ""))}
				</time>
			</p>
		</div>
	);
}

export { LinkDate };
