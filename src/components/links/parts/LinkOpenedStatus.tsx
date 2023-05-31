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
		<div className="flex items-center -mb-1">
			{opened ? (
				<div className="flex flex-row sm:flex-row-reverse">
					<span className="mr-1 sm:ml-2 sm:-mr-1 relative grid place-content-center">
						<CheckCircleIcon className="h-5 w-5 text-green-500" />
					</span>
					<p className="whitespace-nowrap text-gray-500 text-sm">
						Opened
					</p>
				</div>
			) : (
				<div className="flex flex-row sm:flex-row-reverse">
					<span className="mr-1 sm:ml-1 relative grid place-content-center">
						<XCircleIcon className="h-5 w-5 text-red-500" />
					</span>
					<p className="whitespace-nowrap text-gray-500 text-sm">
						Not Opened
					</p>
				</div>
			)}
		</div>
	);
};

export { LinkOpenedStatus };