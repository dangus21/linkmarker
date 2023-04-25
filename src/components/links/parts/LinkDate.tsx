import { CalendarIcon } from "@heroicons/react/20/solid";
import { dateFormatter } from "@/utils";

function LinkDate(
	{
		postedDate
	 }:
	{
		postedDate: string;
	}
) {
	return (
		<div className="flex items-center text-sm text-gray-500">
			<p>
				<time
					dateTime={(
						postedDate ??
						""
					).toString()}
				>
					{dateFormatter.format(
						new Date(
							postedDate ??
							""
						)
					)}
				</time>
			</p>
			<CalendarIcon
				className="ml-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
				aria-hidden="true"
			/>
		</div>
	);
};

export { LinkDate };