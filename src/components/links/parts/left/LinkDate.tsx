import { CalendarIcon } from "@heroicons/react/20/solid";
import { dateFormatter } from "@/utils";

function LinkDate({ postedDate }: { postedDate: string }) {
	return (
		<div className="grid grid-cols-[1fr_25px] sm:mt-[7px] sm:grid-cols-[1fr_minmax(auto,_max-content)_35px]">
			<CalendarIcon className="col-start-1 row-start-1 size-5 text-gray-400 sm:col-start-1 sm:mr-1" />
			<p className="col-start-2 row-start-1 text-sm text-gray-500 sm:col-start-2">
				<time dateTime={(postedDate ?? "").toString()}>
					{dateFormatter.format(new Date(postedDate ?? ""))}
				</time>
			</p>
		</div>
	);
}

export { LinkDate };
