import { Database } from "@/lib/types";
import { createLink, useGetPublicProfiles } from "@/hooks";
import { useEffect } from "react";
import { useLinkGlobalState, useUserGlobalState } from "@/state";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

import { Switch } from "@headlessui/react";
import { isLink } from "@/utils";
import { useRouter } from "next/router";
;

function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(" ");
}

function NewLink() {
	const supabaseClient = useSupabaseClient<Database>();
	const globalUserState = useUserGlobalState();
	const globalLinkState = useLinkGlobalState();

	const isLinkPublic = globalLinkState.new.isPublic;
	const isLinkShareable = globalLinkState.new.isShareable;

	useGetPublicProfiles(isLinkShareable);

	const router = useRouter();
	const isFromShareUI = Object.keys(router.query).some(queryEl => ["text", "url", "title"].includes(queryEl));

	useEffect(() => {
		if (isFromShareUI && !("origin" in globalLinkState.new) && (router.query.text || router.query.url)) {
			const isTextQueryLink = isLink(router.query.text as string);
			globalLinkState.create({
				origin: (isTextQueryLink ? router.query.text : router.query.url) as string || ""
			});
		}
		if (isFromShareUI && !("title" in globalLinkState.new) && router.query.title) {
			const isTextQueryLink = isLink(router.query.title as string);
			globalLinkState.create({
				title: !isTextQueryLink ? router.query.title as string : ""
			});
		}
	}, [isFromShareUI, router.query, globalLinkState]);

	const isSubmitButtonDisabled = !globalLinkState.new.title || !globalLinkState.new.origin;

	return (
		<div className="flex min-h-full flex-col justify-center sm:px-6 lg:px-8">
			<div className="sm:mx-auto sm:w-full sm:max-w-md">
				<h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
					Link Information
				</h2>
			</div>
			<div className="mt-6 mx-auto w-full max-w-md">
				<div className="bg-white px-10 py-4 sm:shadow sm:rounded-lg">
					<div className="py-6">
						<div className="grid gap-10">
							<div className="relative">
								<label
									htmlFor="name"
									className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900"
								>
									Title
								</label>
								<input
									onChange={(e) => {
										globalLinkState.create({
											title: e.currentTarget.value
										});
									}}
									value={globalLinkState.new.title || ""}
									type="text"
									name="name"
									id="name"
									className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									placeholder="How the link will display"
								/>
							</div>
							<div className="relative">
								<label
									htmlFor="name"
									className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900"
								>
									Url
								</label>
								<input
									onChange={(e) => {
										globalLinkState.create({
											origin: e.currentTarget.value
										});
									}}
									value={globalLinkState.new.origin || ""}
									type="text"
									name="name"
									id="name"
									className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									placeholder="https://www.tiktok.com/@tiktok"
								/>
							</div>
							<div className="relative">
								<label
									htmlFor="name"
									className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900"
								>

								</label>
								<Switch.Group as="div" className="flex items-center justify-between">
									<span className="flex flex-grow flex-col">
										<Switch.Label as="span" className="text-sm font-medium leading-6 text-gray-900" passive>
											Is this link public?
										</Switch.Label>
									</span>
									<Switch
										checked={isLinkPublic}
										onChange={(checked) => {
											globalLinkState.create({
												isPublic: checked
											});
										}} className={classNames(
											isLinkPublic ? "bg-indigo-600" : "bg-gray-200",
											"relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
										)}
									>
										<span
											aria-hidden="true"
											className={classNames(
												isLinkPublic ? "translate-x-5" : "translate-x-0",
												"pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
											)}
										/>
									</Switch>
								</Switch.Group>
							</div>
							{
								false && (
									<>
										<div className="relative">
											<Switch.Group as="div" className="flex items-center justify-between">
												<span className="flex flex-grow flex-col">
													<Switch.Label as="span" className="text-sm font-medium leading-6 text-gray-900" passive>
														Is this link shareable?
													</Switch.Label>
												</span>
												<Switch
													checked={isLinkShareable}
													onChange={(checked) => {
														globalLinkState.create({
															isShareable: checked
														});
													}} className={classNames(
														isLinkShareable ? "bg-indigo-600" : "bg-gray-200",
														"relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
													)}
												>
													<span
														aria-hidden="true"
														className={classNames(
															isLinkShareable ? "translate-x-5" : "translate-x-0",
															"pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
														)}
													/>
												</Switch>
											</Switch.Group>
										</div>
									</>
								)
							}
						</div>
						<div className="mt-12">
							<button
								disabled={ isSubmitButtonDisabled }
								onClick={() =>
									createLink({
										supabaseClient,
										userState: globalUserState,
										link: globalLinkState.new
									})
								}
								type="submit"
								className={classNames("flex w-full justify-center rounded-md  py-2 px-3 text-sm font-semibold text-white shadow-sm", !isSubmitButtonDisabled ? "bg-indigo-600 hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" : "bg-neutral-300" )}
							>
								Submit
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export { NewLink };
