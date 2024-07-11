import { createLink } from "@/hooks";
import type { Database } from "@/lib/types";
import { type User, useLinkGlobalState, useUserGlobalState } from "@/state";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect } from "react";

import { isLink } from "@/utils";
import { useRouter } from "next/router";

import { Button } from "@/components";
import { useToggle } from "@/utils/useToggle";
import {
	NewLinkDeletable,
	NewLinkPublic,
	NewLinkShareCombo,
	NewLinkTitle,
	NewLinkUrl,
} from "./parts";

function NewLink({ users }: { users: User[] }) {
	const supabaseClient = useSupabaseClient<Database>();
	const globalUserState = useUserGlobalState();
	const globalLinkState = useLinkGlobalState();
	const toggle = useToggle();

	const isLinkShareable = globalLinkState.new.is_shareable;

	const router = useRouter();
	const isFromShareUI = Object.keys(router.query).some((queryEl) =>
		["text", "url", "title"].includes(queryEl),
	);

	useEffect(() => {
		if (
			isFromShareUI &&
			!("origin" in globalLinkState.new) &&
			(router.query.text || router.query.url)
		) {
			const isTextQueryLink = isLink(router.query.text as string);

			globalLinkState.create({
				origin:
					((isTextQueryLink
						? router.query.text
						: router.query.url) as string) || "",
			});
		}

		if (
			isFromShareUI &&
			!("title" in globalLinkState.new) &&
			router.query.title
		) {
			const isTextQueryLink = isLink(router.query.title as string);

			globalLinkState.create({
				title: !isTextQueryLink ? (router.query.title as string) : "",
			});
		}
	}, [isFromShareUI, router.query, globalLinkState]);

	const isSubmitButtonDisabled =
		!globalLinkState.new.title ||
		!globalLinkState.new.origin ||
		(globalLinkState.new.is_shareable &&
			globalLinkState.new.share_with?.length === 0);

	return (
		<div className="flex min-h-full flex-col justify-center sm:px-6 lg:px-8">
			<div className="sm:mx-auto sm:w-full sm:max-w-md">
				<h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-100">
					Link Information
				</h2>
			</div>
			<div className="mx-auto mt-6 w-full max-w-md px-4">
				<div className="rounded-md bg-gray-800 px-10 py-4 sm:rounded-lg sm:shadow">
					<div className="py-6">
						<div className="grid gap-10">
							<NewLinkTitle />
							<NewLinkUrl />
							{toggle({
								toggle: process.env
									.NEXT_PUBLIC_TOGGLE_DELETE_ON_CREATE,
								component: <NewLinkDeletable />,
							})}
							<NewLinkPublic />
							{isLinkShareable && (
								<NewLinkShareCombo users={users} />
							)}
						</div>

						<div className="mt-12">
							<Button
								onMouseDown={() => {
									createLink({
										supabaseClient,
										userState: globalUserState,
										link: globalLinkState.new,
										router,
									});
									globalLinkState.resetNewLink();
								}}
								type="submit"
								className={
									isSubmitButtonDisabled
										? "cursor-not-allowed bg-gray-900/30 text-gray-700 hover:bg-gray-900/30"
										: ""
								}
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
