import { InputHTMLAttributes } from "react";
import { classNames } from "@/utils";

function Input(
	{
		fn,
		id,
		css,
		placeHolder,
		value,
		...inputParams
	}:
	InputHTMLAttributes<HTMLInputElement> & {
			fn: (filter: string) => void;
			id?: string;
			css?: string;
			placeHolder?: string;
			value?: string;
		}
) {
	return (
		<input
			{...inputParams}
			onChange={e => fn(e.currentTarget.value)}
			type={id}
			name={id}
			id={id}
			className={classNames(
				css ?? "",
				"bg-gray-900 block w-full rounded-md border-0 py-1.5 px-2 text-gray-100 ring-1 ring-inset ring-black placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6 focus-visible:outline focus-visible:outline-1 focus-visible:outline-black"
			)}
			placeholder={placeHolder}
			value={value}
		/>
	);
};

export { Input };