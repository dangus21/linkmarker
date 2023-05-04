import { Navbar, Profile } from "@/components";
import { SupaAuth } from "@/components/supa_auth";

function ProfilePage() {
	return (
		<SupaAuth>
			<Navbar />
			<Profile />
		</SupaAuth>
	);
}

export default ProfilePage;
