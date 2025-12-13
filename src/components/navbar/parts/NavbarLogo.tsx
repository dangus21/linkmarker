import { useNavigate } from "@tanstack/react-router";

function NavbarLogo() {
	const push = useNavigate();

	return (
		<div className="mr-4 flex" onMouseDown={() => push({ to: "/links" })}>
			<div className="flex items-center">
				<p className="hidden cursor-pointer text-lg font-bold text-white italic sm:block">
					LinkMarker
				</p>
				<p className="cursor-pointer text-lg font-bold text-white italic sm:hidden">
					LM
				</p>
			</div>
		</div>
	);
}

export { NavbarLogo };
