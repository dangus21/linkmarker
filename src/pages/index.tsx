import { Auth } from "@/components/auth";
import { supabase } from "@/hooks/links";

function Main() {
	return <Auth />;
}

export default Main;

export async function getServerSideProps() {
	const {
		data: { user }
	} = await supabase.auth.getUser();

	return {
		props: { user }
	};
}
