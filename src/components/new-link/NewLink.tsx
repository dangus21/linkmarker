import { createLink } from "@/hooks";
import { type User, useLinkGlobalState, useUserGlobalState } from "@/state";
import { useEffect } from "react";

import { isLink, parseEnvToggles } from "@/utils";
import { useRouter } from "next/router";

import { Button } from "@/components";
import {
	NewLinkDeletable,
	NewLinkPublic,
	NewLinkShareCombo,
	NewLinkTitle,
	NewLinkUrl,
} from "./parts";

function NewLink({ users }: { users: User[] }) {
	const globalUserState = useUserGlobalState();
	const globalLinkState = useLinkGlobalState();

	const isLinkShareable = globalLinkState.new.is_shareable;

	const { query, push } = useRouter();
	const isFromShareUI = Object.keys(query).some((queryEl) =>
		["text", "url", "title"].includes(queryEl),
	);

	useEffect(() => {
		if (
			isFromShareUI &&
			!("origin" in globalLinkState.new) &&
			(query.text || query.url)
		) {
			const isTextQueryLink = isLink(query.text as string);

			globalLinkState.create({
				origin:
					((isTextQueryLink ? query.text : query.url) as string) ||
					"",
			});
		}

		if (isFromShareUI && !("title" in globalLinkState.new) && query.title) {
			const isTextQueryLink = isLink(query.title as string);

			globalLinkState.create({
				title: !isTextQueryLink ? (query.title as string) : "",
			});
		}
	}, [isFromShareUI, query, globalLinkState]);

	// useEffect(() => {
	// 	return () => globalLinkState.resetNewLink;
	// }, []);

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
							{parseEnvToggles(
								process.env.NEXT_PUBLIC_TOGGLE_DELETE_ON_CREATE,
							) && <NewLinkDeletable />}
							<NewLinkPublic />
							{isLinkShareable && (
								<NewLinkShareCombo users={users} />
							)}
						</div>

						<div className="mt-12">
							<Button
								onMouseDown={() => {
									createLink({
										userState: globalUserState,
										link: globalLinkState.new,
										push,
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
