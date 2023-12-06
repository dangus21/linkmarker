import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/20/solid";

function LinkOpenedStatus({ opened }: { opened: boolean }) {
	const OpenCloseIcon = opened ? CheckCircleIcon : XCircleIcon;
	return (
		<div className="-mb-1 flex items-center">
			<div className="flex flex-row sm:flex-row-reverse">
				<span className="relative mr-1 grid place-content-center sm:-mr-1 sm:ml-2">
					<OpenCloseIcon
						className={`h-5 w-5 ${
							opened ? "text-green-500" : "text-red-500"
						}`}
					/>
				</span>
				<p className="whitespace-nowrap text-sm text-gray-500">
					{opened ? "Opened" : "Not Open"}
				</p>
			</div>
		</div>
	);
}

export { LinkOpenedStatus };
