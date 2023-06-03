import { Database } from "@/lib/types";
import { User, useLinkGlobalState, useUserGlobalState } from "@/state";
import { createLink } from "@/hooks";
import { useEffect } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

import { isLink } from "@/utils";
import { useRouter } from "next/router";

import { Button } from "../button";
import { NewLinkDeletable, NewLinkPublic, NewLinkShareCombo, NewLinkTitle, NewLinkUrl } from "./parts";

function NewLink({ users }: { users: User[] }) {
	const supabaseClient = useSupabaseClient<Database>();
	const globalUserState = useUserGlobalState();
	const globalLinkState = useLinkGlobalState();

	const isLinkShareable = globalLinkState.new.is_shareable;

	const router = useRouter();
	const isFromShareUI = Object.keys(router.query).some(queryEl => ["text", "url", "title"].includes(queryEl));

	useEffect(() => {
		if (
			isFromShareUI &&
			!("origin" in globalLinkState.new) &&
			(router.query.text || router.query.url)
		) {
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

	const isSubmitButtonDisabled = (
		!globalLinkState.new.title ||
		!globalLinkState.new.origin || (
			globalLinkState.new.is_shareable &&
			globalLinkState.new.share_with?.length === 0
		)
	);

	return (
		<div className="flex min-h-full flex-col justify-center sm:px-6 lg:px-8">
			<div className="sm:mx-auto sm:w-full sm:max-w-md">
				<h2 className="text-gray-100 mt-6 text-center text-3xl font-bold tracking-tight">
					Link Information
				</h2>
			</div>
			<div className="px-4 mt-6 mx-auto w-full max-w-md">
				<div className="bg-gray-800 px-10 py-4 sm:shadow rounded-md sm:rounded-lg">
					<div className="py-6">
						<div className="grid gap-10">
							<NewLinkTitle />
							<NewLinkUrl />
							<NewLinkDeletable />
							<NewLinkPublic />
							{
								isLinkShareable && (
									<NewLinkShareCombo users={users} />
								)
							}
						</div>

						<div className="mt-12">
							<Button
								onClick={
									() =>
										createLink({
											supabaseClient,
											userState: globalUserState,
											link: globalLinkState.new,
											router
										})
								}
								type="submit"
								className={isSubmitButtonDisabled ? "bg-gray-900/30 hover:bg-gray-900/30 text-gray-700 cursor-not-allowed" : ""}
							>
								Mark Link
							</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export { NewLink };
