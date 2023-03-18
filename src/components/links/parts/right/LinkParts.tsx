import { twMerge } from "tailwind-merge";
import { validateIsLeftClick } from "@/utils";

function LinkParts({
	isAdmin,
	invalidation,
	icon: Icon,
	onMouseDown,
	iconCss,
	containerCss
}: {
	isAdmin: boolean;
	invalidation?: boolean[];
	icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
	onMouseDown: (shouldCancel: boolean) => void;
	iconCss?: string;
	containerCss?: string;
}) {
	const hasNoPermissions =
		!isAdmin && invalidation?.every((val) => val === true);

	return (
		<div
			onMouseDown={(event) =>
				validateIsLeftClick(event)
					? hasNoPermissions
						? null
						: onMouseDown(false)
					: null
			}
			className={twMerge(
				hasNoPermissions ? "pointer-events-none opacity-20" : "",
				"relative flex h-1/3 w-16 flex-grow cursor-pointer items-center justify-center hover:bg-gray-900/50 sm:h-full sm:w-20",
				containerCss
			)}
		>
			<Icon
				className={twMerge(
					"s:w-8 h-[1.67rem] w-[1.67rem] text-gray-600 sm:h-8",
					iconCss
				)}
			/>
		</div>
	);
}

export { LinkParts };
