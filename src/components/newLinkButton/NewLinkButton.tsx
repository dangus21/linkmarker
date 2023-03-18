import { Button } from "@/components";
import { PlusIcon } from "@heroicons/react/20/solid";
import { twMerge } from "tailwind-merge";
import { useRouter } from "next/navigation";

function NewLinkButton({ isMobile }: { isMobile?: boolean }) {
	const { push } = useRouter();

	return (
		<Button
			onMouseDown={() => push("/new")}
			isMobile={isMobile}
			type="button"
			className={twMerge(
				"relative inline-flex items-center gap-x-1.5 whitespace-nowrap",
				isMobile
					? "fixed bottom-0 right-0 z-[99] h-14 w-14 rounded-lg border-2 bg-slate-950"
					: "w-auto"
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
