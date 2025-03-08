import { CalendarIcon } from "@heroicons/react/20/solid";
import { dateFormatter } from "@/utils";

function LinkDate({ postedDate }: { postedDate: string }) {
	return (
		<div className="-mb-1 flex items-center">
			<div className="flex">
				<span className="relative mr-1 grid place-content-center">
					<CalendarIcon className="col-start-1 row-start-1 size-5 text-gray-400 sm:col-start-1 sm:mr-1" />
				</span>
				<p className="whitespace-nowrap text-sm text-gray-500">
					<time dateTime={(postedDate ?? "").toString()}>
						{dateFormatter.format(new Date(postedDate ?? ""))}
					</time>
				</p>
			</div>
		</div>
	);
}

export { LinkDate };
