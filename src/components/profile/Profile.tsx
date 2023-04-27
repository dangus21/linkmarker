import { ChangeEvent } from "react";
import Image from "next/image";

import { Button } from "../button";
import { Database } from "@/lib/types";
import { Input } from "../input";
import { ONE_MB_SIZE, classNames } from "@/utils";
import { Switch } from "@headlessui/react";
import { updateProfileInfo } from "@/hooks";
import { useRouter } from "next/router";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useUserGlobalState } from "@/state";

function Profile() {
	const supabaseClient = useSupabaseClient<Database>();
	const globalUserState = useUserGlobalState();
	const { push } = useRouter();

	async function handleFileRead(event: ChangeEvent<HTMLInputElement>) {
		const file = event?.target?.files?.[0];
		if (file) {
			if (file?.size > ONE_MB_SIZE * 2) {
				alert("File is too big!");
			} else {
				globalUserState.setAvatar({
					img: URL.createObjectURL(file),
					file,
					fileName: file.name
				});
				globalUserState.setModified(true);
			}
		}
	}

	return (
		<div className="flex min-h-full flex-col justify-center sm:px-6 lg:px-8">
			<div className="sm:mx-auto sm:w-full sm:max-w-md">
				<h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-300">
					Account details
				</h2>
			</div>

			<div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md">
				<div className="bg-gray-800 py-4 px-4 shadow sm:rounded-lg sm:px-10">
					<div className="flex items-center justify-center bg-grey-lighter">
						<label className="w-full flex flex-col items-center px-4 py-6 sm:rounded-lg sm:px-10 tracking-wide uppercase cursor-pointer hover:bg-blue hover:text-slate-400">
							{globalUserState.avatar.img ? (
								<div className="rounded-full overflow-hidden hover:opacity-70">
									<Image
										className="w-[150px] h-[150px] aspect-square"
										src={
											globalUserState.avatar.img ||
											"/avatar_placeholder.png"
										}
										alt="Profile Picture"
										width={150}
										height={150}
									/>
								</div>
							) : (
								<>
									<svg
										className="w-8 h-8"
										fill="currentColor"
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20"
									>
										<path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
									</svg>
									<span className="text-gray-300 mt-2 text-base leading-normal">
										Select a profile image
									</span>
								</>

							)}
							<input
								type="file"
								className="hidden"
								onChange={(e) => handleFileRead(e)}
							/>
						</label>
					</div>
					<div className="space-y-6">
						<div>
							<label
								htmlFor="username"
								className="block text-sm font-medium leading-6 text-gray-300"
							>
								Username
							</label>
							<div className="mt-2">
								<Input
									onChange={(event) => {
										globalUserState.setUserName(event.currentTarget.value);
										globalUserState.setModified(true);
									}}
									value={globalUserState.userName}
									id="username"
									required
								/>
							</div>
						</div>

						<div className="relative">
							<label
								htmlFor="name"
								className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-300"
							>

							</label>
							<Switch.Group as="div" className="flex items-center justify-between">
								<span className="flex flex-grow flex-col">
									<Switch.Label as="span" className="text-sm font-medium leading-6 text-gray-300" passive>
										Should your profile be public?
									</Switch.Label>
								</span>
								<Switch
									checked={globalUserState.is_public || false}
									onChange={(checked) => globalUserState.setis_public(checked)}
									className={classNames(
										globalUserState.is_public ? "bg-indigo-600" : "bg-gray-200",
										"relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
									)}
								>
									<span
										aria-hidden="true"
										className={classNames(
											globalUserState.is_public ? "translate-x-5" : "translate-x-0",
											"pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
										)}
									/>
								</Switch>
							</Switch.Group>
						</div>

						<div>
							<Button
								onClick={() => {
									updateProfileInfo({
										userState: globalUserState,
										supabaseClient
									});
									push("/");
								}}
								type="submit"
							>
								Submit
							</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export { Profile };
