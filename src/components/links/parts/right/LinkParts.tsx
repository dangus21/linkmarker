import { twMerge } from "tailwind-merge";

function LinkParts({
	invalidation,
	icon: Icon,
	onMouseDown,
	iconCss,
	containerCss,
}: {
	invalidation?: boolean;
	icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
	onMouseDown: (shouldCancel: boolean) => void;
	iconCss?: string;
	containerCss?: string;
}) {
	if (invalidation) {
		return (
			<div className="relative flex h-1/3 w-16 items-center justify-center sm:h-full sm:w-20 flex-grow" />
		);
	}
	return (
		<div
			onMouseDown={() => onMouseDown(false)}
			className={twMerge(
				"relative flex h-1/3 w-16 items-center justify-center sm:h-full sm:w-20 flex-grow cursor-pointer hover:bg-gray-900/50",
				containerCss,
			)}
		>
			<Icon
				className={twMerge(
					"s:w-8 h-[1.67rem] w-[1.67rem] sm:h-8 text-gray-600",
					iconCss,
				)}
			/>
		</div>
	);
}

export { LinkParts };
