import { type InputHTMLAttributes, useLayoutEffect, useRef } from "react";
import { twMerge } from "tailwind-merge";

function Input({
	id,
	className,
	placeHolder,
	value,
	focusOnMount,
	...inputProps
}: InputHTMLAttributes<HTMLInputElement> & {
	id?: string;
	className?: string;
	placeHolder?: string;
	value?: string;
	focusOnMount?: boolean;
}) {
	const inputRef = useRef<HTMLInputElement | null>(null);
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useLayoutEffect(() => {
		if (focusOnMount && inputRef.current) {
			inputRef.current?.focus();
		}
	}, []);

	return (
		<input
			ref={inputRef}
			type={id}
			name={id}
			id={id}
			className={twMerge(
				"block w-full rounded-md border-0 bg-gray-900 px-2 py-1.5 text-gray-100 ring-1 ring-inset ring-black placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black focus-visible:outline focus-visible:outline-1 focus-visible:outline-black sm:text-sm sm:leading-6",
				className ?? "",
			)}
			placeholder={placeHolder}
			value={value}
			{...inputProps}
		/>
	);
}

export { Input };
