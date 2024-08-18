import { Links, Navbar } from "@/components";
import { Tabs } from "@/components/tabs";
import { useGetProfileInfo } from "@/hooks";
import { useSession, useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function Main() {
	const session = useSession();
	const user = useUser();
	const { push } = useRouter();
	useGetProfileInfo({ user, session });
	useEffect(() => {
		if (!user || !session) push("/");
	}, [user, session, push]);

	return (
		<>
			<Navbar />
			<Tabs />
			<Links />
		</>
	);
}

export default Main;
