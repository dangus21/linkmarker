import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import {
	useSession,
	useSupabaseClient,
	useUser
} from "@supabase/auth-helpers-react";

import { useGetProfileInfo } from "@/hooks";

import { Database } from "@/lib/types";
import { Links, Navbar } from "@/components";
import Head from "next/head";

// import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
// import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs"; import ogs from "open-graph-scraper";
;

// export async function getServerSideProps(ctx: GetServerSidePropsContext) {
// 	const supabase = createServerSupabaseClient<Database>(ctx);
// 	const {
// 		data: { session }
// 	} = await supabase.auth.getSession();

// 	const { data } = await supabase
// 		.from("links")
// 		.select()
// 		.or(`shareWith.cs.{${session?.user.id ?? ""}},or(isPublic.eq.true),or(by.eq.${session?.user.id ?? ""})`)
// 		.order("postedDate", { ascending: false });

// 	const linksOGSOptions = (data ?? []).map(
// 		entry => ogs({
// 			url: entry.url ?? "",
// 			customMetaTags: [{
// 				multiple: false, // is there more than one of these tags on a page (normally this is false)
// 				property: "hostname", // meta tag name/property attribute
// 				fieldName: "hostnameMetaTag" // name of the result variable
// 			}]
// 		}).then(ogs => ogs.result)
// 	);

// 	const result = await Promise.allSettled(linksOGSOptions).then(vals => vals.map(val => ({
// 		value: !("value" in val) ? "" :
// 			val.value ?
// 				Array.isArray(val.value.ogImage) ?
// 					val.value?.ogImage[0] :
// 					typeof val.value.ogImage === "object" ?
// 						val.value.ogImage?.url :
// 						val.value.ogImage : ""
// 	})));

// 	return {
// 		props: {
// 			links: data || [],
// 			ogs: result
// 		}
// 	};
// }

// function Main(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
function Main() {
	const supabaseClient = useSupabaseClient<Database>();
	const session = useSession();
	const user = useUser();

	useGetProfileInfo();

	return (
		<>
			<Head>
				<title>Linkmarker</title>
			</Head>
			<div>
				{!session || !user ? (
					<div
						className="text-white h-screen w-screen flex justify-center items-center bg-neutral-900 [&>div]:w-96"
					>
						<Auth
							supabaseClient={supabaseClient}
							appearance={{ theme: ThemeSupa }}
							theme="dark"
							providers={[]}
						/>
					</div>
				) : (
					<>
						<Navbar />
						<Links />
					</>
				)}
			</div>
		</>
	);
}

export default Main;
