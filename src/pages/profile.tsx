import { Navbar, Profile } from "@/components";
import { useGetProfileInfo } from "@/hooks";
import { useSession, useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function ProfilePage() {
	const session = useSession();
	const user = useUser();
	const { push } = useRouter();
	useGetProfileInfo();
	useEffect(() => {
		if (!user || !session) push("/");
	}, [user, session, push]);

	return (
		<>
			<Navbar />
			<Profile />
		</>
	);
}

export default ProfilePage;
