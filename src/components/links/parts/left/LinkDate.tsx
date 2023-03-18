import { CalendarIcon } from "@heroicons/react/20/solid";
import { dateFormatter } from "@/utils";

function LinkDate({ postedDate }: { postedDate: string }) {
	return (
		<div className="grid grid-cols-[1fr_25px_1fr] sm:mt-[7px] sm:grid-cols-[1fr_minmax(auto,_max-content)_35px]">
			<CalendarIcon className="col-start-2 row-start-2 mr-1 size-5 text-gray-400 sm:col-start-3 sm:mx-2" />
			<p className="col-start-3 row-start-2 text-sm text-gray-500 sm:col-start-2">
				<time dateTime={(postedDate ?? "").toString()}>
					{dateFormatter.format(new Date(postedDate ?? ""))}
				</time>
			</p>
		</div>
	);
}

export { LinkDate };
