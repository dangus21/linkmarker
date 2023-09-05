import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/20/solid";

function LinkOpenedStatus({ opened }: { opened: boolean }) {
	return (
		<div className="-mb-1 flex items-center">
			{opened ? (
				<div className="flex flex-row sm:flex-row-reverse">
					<span className="relative mr-1 grid place-content-center sm:-mr-1 sm:ml-2">
						<CheckCircleIcon className="h-5 w-5 text-green-500" />
					</span>
					<p className="whitespace-nowrap text-sm text-gray-500">
						Opened
					</p>
				</div>
			) : (
				<div className="flex flex-row sm:flex-row-reverse">
					<span className="relative mr-1 grid place-content-center sm:ml-1">
						<XCircleIcon className="h-5 w-5 text-red-500" />
					</span>
					<p className="whitespace-nowrap text-sm text-gray-500">
						Not Opened
					</p>
				</div>
			)}
		</div>
	);
}

export { LinkOpenedStatus };
