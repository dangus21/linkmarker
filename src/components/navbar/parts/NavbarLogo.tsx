import { useRouter } from "next/router";

function NavbarLogo() {
	const { push } = useRouter();

	return (
		<div className="mr-4 flex" onMouseDown={() => push("/links")}>
			<div className="flex items-center">
				<p className="hidden cursor-pointer text-lg font-bold italic text-white sm:block">
					LinkMarker
				</p>
				<p className="cursor-pointer text-lg font-bold italic text-white sm:hidden">
					LM
				</p>
			</div>
		</div>
	);
}

export { NavbarLogo };
