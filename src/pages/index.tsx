import { Links, Navbar } from "@/components";
import { SupaAuth } from "@/components/supa_auth";
import { Tabs } from "@/components/tabs";

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
