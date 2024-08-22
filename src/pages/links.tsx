import { Links, Navbar } from "@/components";
import { Tabs } from "@/components/tabs";
import { useGetProfileInfo } from "@/hooks";

function Main() {
	useGetProfileInfo();

	return (
		<>
			<Navbar />
			<Tabs />
			<Links />
		</>
	);
}

export default Main;
