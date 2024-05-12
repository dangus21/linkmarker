import { dateFormatter } from "@/utils";
import { CalendarIcon } from "@heroicons/react/20/solid";

function LinkDate({ postedDate }: { postedDate: string }) {
	return (
		<div className="flex items-center text-sm text-gray-500">
			<p>
				<time dateTime={(postedDate ?? "").toString()}>
					{dateFormatter.format(new Date(postedDate ?? ""))}
				</time>
			</p>
			<span className="relative mr-1 grid place-content-center sm:-mr-1 sm:ml-2">
				<CalendarIcon
					className="h-5 w-5 text-gray-400"
					aria-hidden="true"
				/>
			</span>
		</div>
	);
}

export { LinkDate };
