import { Button } from "../button";
import { PlusIcon } from "@heroicons/react/20/solid";
import { twMerge } from "tailwind-merge";
import { useRouter } from "next/router";

function NewLinkButton({ isMobile }: { isMobile?: boolean }) {
	const { push } = useRouter();

	return (
		<Button
			onClick={() => push("/new")}
			isMobile={isMobile}
			type="button"
			className={twMerge(
				"relative mx-5 inline-flex items-center gap-x-1.5",
				isMobile
					? "fixed -right-1 bottom-2 z-[99] h-16 w-16 rounded-full border-2 bg-gray-600"
					: "w-auto",
			)}
		>
			<PlusIcon
				className={twMerge("-ml-0.5", isMobile ? "h-8 w-8" : "h-5 w-5")}
				aria-hidden="true"
			/>
			<p className="hidden md:block">New Link</p>
		</Button>
	);
}

export { NewLinkButton };
