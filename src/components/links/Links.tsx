
import { CalendarIcon, CheckCircleIcon, MapPinIcon, UsersIcon, XCircleIcon } from "@heroicons/react/20/solid";
import { Database } from "@/lib/types";
import { updateLinkInfo } from "@/hooks/updateLinkInfo";
import { useGetLinks } from "@/hooks/useGetLinks";
import { useGlobalState } from "@/state";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

function Links() {
	const supabase = useSupabaseClient<Database>();

	useGetLinks();

	const { values: availableLinks } = useGlobalState(state => state.links);
	const dateFormatter = new Intl.DateTimeFormat("pt-PT");

	return (
		<div className="mt-6 mx-auto max-w-7xl overflow-hidden bg-white shadow sm:rounded-md" >
			<ul role="list" className="divide-y divide-gray-200">
				{availableLinks.map((link) => (
					<li
						key={link.id}
						onClick={() => updateLinkInfo({
							supabase,
							link: { origin: "tiktok" },
							id: link.id
						})}
					>
						<a href="#" className="block hover:bg-gray-100">
							<div className="px-4 py-4 sm:px-6">
								<div className="flex items-center justify-between">
									<p className="truncate text-sm font-medium text-indigo-600">{link.title}</p>
									<p className="flex items-center">
										{
											link.opened ?
												<>
													<span className="whitespace-nowrap">Opened</span>
													<span className="ml-3">
														<CheckCircleIcon className="mr-3 h-5 w-5 flex-shrink-0 text-green-500" />
													</span>
												</> :
												<>
													<span className="whitespace-nowrap">Not Open</span>
													<span className="ml-3">
														<XCircleIcon className="mr-3 h-5 w-5 flex-shrink-0 self-center text-red-500" />
													</span>
												</>
										}
									</p>
								</div>
								<div className="mt-2 sm:flex sm:justify-between">
									<div className="sm:flex">
										<p className="flex items-center text-sm text-gray-500">
											<UsersIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
											{link.who}
										</p>
										<p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
											<MapPinIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
											{link.origin}
										</p>
									</div>
									<div className="mt-2 mr-3 flex items-center text-sm text-gray-500 sm:mt-0">
										<CalendarIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
										<p>
											<time dateTime={link.postedDate.toString()}>
												{dateFormatter.format(new Date(link.postedDate))}
											</time>
										</p>
									</div>
								</div>
							</div>
						</a>
					</li>
				))
				}
			</ul >
		</div >

	);
};

export { Links };