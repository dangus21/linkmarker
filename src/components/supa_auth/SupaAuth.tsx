import type { ReactNode } from "react";

import { useSession, useUser } from "@supabase/auth-helpers-react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

import { LoadingSpinner } from "@/components";
import { useGetProfileInfo } from "@/hooks";
import { supabase } from "@/hooks/links";
import { useUserGlobalState } from "@/state";
import Head from "next/head";
import { twMerge } from "tailwind-merge";

function SupaAuth({ children }: { children: ReactNode }) {
	const session = useSession();
	const user = useUser();

	useGetProfileInfo({ user, session });
	const globalUserState = useUserGlobalState();

	return (
		<div className="min-h-screen bg-gray-900">
			<Head>
				<title>Linkmarker</title>
			</Head>
			{!session || !user ? (
				<>
					<div
						className={twMerge(
							"relative z-10 flex flex-col",
							"flex h-screen w-screen text-white",
							"items-center justify-center ",
							"[&>div]:w-[30rem] [&>div]:bg-neutral-900",
							"[&>div]:rounded-lg [&>div]:px-6 [&>div]:py-4",
						)}
					>
						<p className="font-mono text-[4rem]">Linkmarker</p>
						<Auth
							dark
							theme="dark"
							supabaseClient={supabase}
							appearance={{ theme: ThemeSupa }}
							providers={["google", "facebook"]}
							socialLayout="vertical"
						/>
					</div>
					<div id="bg" className="fixed top-0 let-0 z-0">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							version="1.1"
							width="1920"
							height="1080"
							preserveAspectRatio="none"
							viewBox="0 0 1920 1080"
						>
							<title>bg</title>
							<g
								mask="url(&quot;#SvgjsMask1047&quot;)"
								fill="none"
							>
								<rect
									width="1920"
									height="1080"
									x="0"
									y="0"
									fill="rgba(33, 33, 33, 1)"
								/>
								<path
									d="M1379.81 7.55 a306.3 306.3 0 1 0 612.6 0 a306.3 306.3 0 1 0 -612.6 0z"
									fill="rgba(21, 21, 21, 0.4)"
									className="triangle-float2"
								/>
								<path
									d="M1748.44,389.127C1843.615,397.446,1954.182,386.425,2001.809,303.605C2049.357,220.921,1995.508,124.814,1947.995,42.109C1900.223,-41.047,1844.306,-134.803,1748.44,-137.43C1649.729,-140.135,1570.555,-58.95,1529.001,30.629C1493.404,107.367,1517.536,192.989,1561.699,265.138C1603.508,333.441,1668.661,382.154,1748.44,389.127"
									fill="rgba(21, 21, 21, 0.4)"
									className="triangle-float1"
								/>
								<path
									d="M541.83 846.06 a229.26 229.26 0 1 0 458.52 0 a229.26 229.26 0 1 0 -458.52 0z"
									fill="rgba(21, 21, 21, 0.4)"
									className="triangle-float3"
								/>
								<path
									d="M646.21 507.88 a188.83 188.83 0 1 0 377.66 0 a188.83 188.83 0 1 0 -377.66 0z"
									fill="rgba(21, 21, 21, 0.4)"
									className="triangle-float1"
								/>
								<path
									d="M203.09315071413252 192.75913203846272L193.8794981385821 16.9521678511459 18.072533951265285 26.165820426696314 27.286186526815698 201.97278461401316z"
									fill="rgba(21, 21, 21, 0.4)"
									className="triangle-float3"
								/>
								<path
									d="M114.09237799816665 172.9573151315131L58.095985684815986-146.39341643794208-162.16412377768486 31.969703354575728z"
									fill="rgba(21, 21, 21, 0.4)"
									className="triangle-float1"
								/>
								<path
									d="M1194.375,553.364C1243.806,551.055,1281.502,516.101,1308.197,474.434C1337.925,428.032,1366.453,372.915,1341.441,323.81C1314.829,271.565,1253.007,250.903,1194.375,250.975C1135.885,251.047,1076.88,273.346,1047.933,324.171C1019.233,374.562,1029.293,437.134,1060.517,486.002C1089.342,531.116,1140.896,555.862,1194.375,553.364"
									fill="rgba(21, 21, 21, 0.4)"
									className="triangle-float1"
								/>
								<path
									d="M1317.019435271302 226.50062754355935L1476.9178419325149 206.86757189258827 1367.5190551254518-23.163510273745885z"
									fill="rgba(21, 21, 21, 0.4)"
									className="triangle-float3"
								/>
								<path
									d="M519.6663010907512 330.01904565830665L345.41812562230245 229.4168146457967 244.81589460979257 403.6649901142454 419.06407007824123 504.2672211267553z"
									fill="rgba(21, 21, 21, 0.4)"
									className="triangle-float1"
								/>
								<path
									d="M751.2241269881902 92.15610474715167L598.4302321634349 318.68236944137465 977.7503916824131 244.94999957190697z"
									fill="rgba(21, 21, 21, 0.4)"
									className="triangle-float3"
								/>
								<path
									d="M352.73215182208776 275.15389030716875L273.49653605881133 418.09872506245665 495.6769865773756 354.3895060704452z"
									fill="rgba(21, 21, 21, 0.4)"
									className="triangle-float3"
								/>
								<path
									d="M1536.2759745752712 293.8044503130509L1465.6084671940725 75.60487764576408 1328.8714147988244 222.23741413543377z"
									fill="rgba(21, 21, 21, 0.4)"
									className="triangle-float2"
								/>
								<path
									d="M543.646,994.245C617.208,996.19,691.643,971.225,731.244,909.201C773.8,842.55,782.091,754.422,739.18,687.999C698.97,625.756,617.745,619.478,543.646,618.81C467.859,618.126,381.343,619.695,341.906,684.416C301.48,750.76,330.089,834.608,372.481,899.713C410.599,958.255,473.812,992.398,543.646,994.245"
									fill="rgba(21, 21, 21, 0.4)"
									className="triangle-float1"
								/>
								<path
									d="M1886.791,463.793C1980.653,458.81,2062.253,401.105,2105.594,317.7C2145.731,240.459,2130.967,150.891,2089.021,74.617C2045.178,-5.106,1977.744,-77.844,1886.791,-80.162C1792.614,-82.562,1715.608,-16.183,1665.887,63.835C1612.596,149.598,1574.855,254.901,1623.672,343.287C1673.66,433.793,1783.543,469.275,1886.791,463.793"
									fill="rgba(21, 21, 21, 0.4)"
									className="triangle-float2"
								/>
								<path
									d="M1087.414201274895 980.4405851815588L1191.8786094841025 1204.4652315331396 1311.4388476264758 875.9761769723513z"
									fill="rgba(21, 21, 21, 0.4)"
									className="triangle-float2"
								/>
								<path
									d="M342.0303872615263 263.2491693531492L478.8884756247055 400.1072577163284 615.7465639878847 126.39108098997002z"
									fill="rgba(21, 21, 21, 0.4)"
									className="triangle-float3"
								/>
								<path
									d="M728.0823397752197 741.4371533189358L552.8014054997911 974.0428094779306 785.407061658786 1149.3237437533592 960.6879959342145 916.7180875943643z"
									fill="rgba(21, 21, 21, 0.4)"
									className="triangle-float1"
								/>
								<path
									d="M1014.1561082550631 1010.8994170798533L875.2965633572564 913.6689169900395 778.0660632674427 1052.528461887846 916.9256081652494 1149.75896197766z"
									fill="rgba(21, 21, 21, 0.4)"
									className="triangle-float1"
								/>
								<path
									d="M1943.960066552608 861.0080140584234L1858.2755796954298 648.3481835311113 1732.1468592790216 804.1041817307383z"
									fill="rgba(21, 21, 21, 0.4)"
									className="triangle-float1"
								/>
								<path
									d="M-121.68 176.94 a343.06 343.06 0 1 0 686.12 0 a343.06 343.06 0 1 0 -686.12 0z"
									fill="rgba(21, 21, 21, 0.4)"
									className="triangle-float2"
								/>
							</g>
							<defs>
								<mask id="SvgjsMask1047">
									<rect
										width="1920"
										height="1080"
										fill="#ffffff"
									/>
								</mask>
							</defs>
						</svg>
					</div>
				</>
			) : globalUserState.hasAvatar && !globalUserState.avatar.img ? (
				<div className="pt-[7rem]">
					<LoadingSpinner />
				</div>
			) : (
				children
			)}
		</div>
	);
}

export { SupaAuth };
