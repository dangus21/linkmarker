import {
	CheckCircleIcon,
	XCircleIcon
} from "@heroicons/react/20/solid";

function LinkOpenedStatus(
	{
		opened
	}:
		{
			opened: boolean;
		}
) {
	return (
		<p className="flex items-center">
			{opened ? (
				<>
					<span className="whitespace-nowrap">
						Opened
					</span>
					<span className="ml-3">
						<CheckCircleIcon className="h-5 w-5 flex-shrink-0 text-green-500" />
					</span>
				</>
			) : (
				<>
					<span className="whitespace-nowrap">
						Not Opened
					</span>
					<span className="ml-3">
						<XCircleIcon className="h-5 w-5 flex-shrink-0 self-center text-red-500" />
					</span>
				</>
			)}
		</p>
	);
};

export { LinkOpenedStatus };