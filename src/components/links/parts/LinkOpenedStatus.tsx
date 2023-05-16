import {
	CheckCircleIcon,
	XCircleIcon
} from "@heroicons/react/20/solid";

function LinkOpenedStatus(
	{
		opened,
		toggleOpened
	}:
		{
			opened: boolean;
			toggleOpened: () => Promise<void>;
		}
) {
	return (
		<p className="flex items-center">
			{opened ? (
				<>
					<span className="whitespace-nowrap text-gray-500">
						Opened
					</span>
					<span className="ml-3 relative z-50" onClick={toggleOpened}>
						<CheckCircleIcon className="h-5 w-5 flex-shrink-0 text-green-500" />
					</span>
				</>
			) : (
				<>
					<span className="whitespace-nowrap text-gray-500">
						Not Opened
					</span>
					<span className="ml-3 relative z-50" onClick={toggleOpened}>
						<XCircleIcon className="h-5 w-5 flex-shrink-0 self-center text-red-500" />
					</span>
				</>
			)}
		</p>
	);
};

export { LinkOpenedStatus };