import { twMerge } from "tailwind-merge";

function LinkParts({
	isAdmin,
	invalidation,
	icon: Icon,
	onMouseDown,
	iconCss,
	containerCss,
}: {
	isAdmin: boolean;
	invalidation?: boolean[];
	icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
	onMouseDown: (shouldCancel: boolean) => void;
	iconCss?: string;
	containerCss?: string;
}) {
	const hasPermissions =
		!isAdmin && invalidation?.every((val) => val === true);

	return (
		<div
			onMouseDown={() => (hasPermissions ? null : onMouseDown(false))}
			className={twMerge(
				hasPermissions ? "pointer-events-none opacity-20" : "",
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
