import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

function Button({
	children,
	type,
	className,
	isDisabled,
	...buttonProps
}: DetailedHTMLProps<
	ButtonHTMLAttributes<HTMLButtonElement>,
	HTMLButtonElement
> & {
	children?: ReactNode;
	type?: "button" | "submit" | "reset" | undefined;
	className?: string;
	isDisabled?: boolean;
}) {
	return (
		<button
			type={type ?? "button"}
			className={twMerge(
				"flex w-full justify-center rounded-md  py-2 px-3 text-sm",
				"bg-gray-900 font-semibold shadow-sm hover:bg-gray-900/70",
				"focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
				"border border-black text-white focus-visible:outline-gray-500",
				className ?? ""
			)}
			{...buttonProps}
		>
			{children}
		</button>
	);
}

export { Button };
