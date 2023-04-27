import { Links, Navbar } from "@/components";
import { Tabs } from "@/components/tabs";
import SupaAuth from "@/components/supa_auth";

function Main() {
	return (
		<SupaAuth>
			<Navbar />
			<Tabs />
			<Links />
		</SupaAuth>
	);
}

export default Main;
