import { useRouter } from "next/router";

function NavbarLogo() {
	const { push } = useRouter();

	return (
		<div className="flex mr-4" onClick={() => push("/")}>
			<div className="flex items-center">
				<p className="hidden sm:block text-white italic font-bold text-lg cursor-pointer">
					LinkMarker
				</p>
				<p className="sm:hidden text-white italic font-bold text-lg cursor-pointer">
					LM
				</p>
			</div>
		</div>
	);
}

export { NavbarLogo };