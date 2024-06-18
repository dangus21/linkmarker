import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/20/solid";
import { twMerge } from "tailwind-merge";

function LinkOpenedStatus({ opened }: { opened: boolean }) {
	const OpenCloseIcon = opened ? CheckCircleIcon : XCircleIcon;
	return (
		<div className="-mb-1 flex items-center">
			<div className="flex flex-row sm:flex-row">
				<span className="relative mr-1 grid place-content-center">
					<OpenCloseIcon
						className={twMerge(
							"h-5 w-5",
							opened ? "text-green-500/70" : "text-red-500/70",
						)}
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
