"use client";

import { useRouter } from "next/navigation";
import React, { useTransition } from "react"; // Import useTransition
import { twMerge } from "tailwind-merge"; // For dynamic styling

function NavbarLogo() {
	const router = useRouter();
	const [isPending, startTransition] = useTransition();

	const handleClick = () => {
		startTransition(() => {
			router.push("/links");
		});
	};

	return (
		<div
			className={twMerge(
				"mr-4 flex cursor-pointer",
				isPending && "opacity-75" // Example pending state style
			)}
			onMouseDown={handleClick}
		>
			<div className="flex items-center">
				<p className="hidden text-lg font-bold italic text-white sm:block">
					LinkMarker
				</p>
				<p className="text-lg font-bold italic text-white sm:hidden">
					LM
				</p>
			</div>
		</div>
	);
}

export { NavbarLogo };
