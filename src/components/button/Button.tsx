import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import { twMerge } from "tailwind-merge";

function Button(
	{
		children,
		type,
		className,
		isDisabled,
		...buttonProps
	}:
		DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
			children?: React.ReactNode;
			type?: "button" | "submit" | "reset" | undefined;
			className?: string;
			isDisabled?: boolean;
		}
) {
	return (
		<button
			type={type ?? "button"}
			className={
				twMerge(
					"flex w-full justify-center rounded-md  py-2 px-3 text-sm",
					"font-semibold shadow-sm bg-gray-900 hover:bg-gray-900/70",
					"focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2","focus-visible:outline-gray-500 text-white border border-black",
					className ?? ""
				)}
			{...buttonProps}
		>
			{children}
		</button>
	);
};

export { Button };