import { ChangeEvent } from "react";
import Image from "next/image";

import { ONE_MB_SIZE } from "@/utils";
import { updateProfileInfo } from "@/hooks/updateProfileInfo";
import { useGlobalState } from "@/state";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

function NewLink() {
	const supabaseClient = useSupabaseClient();
	const globalUserState = useGlobalState(state => state.user);

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
			}
		}
	}

	return (
		<div className="flex min-h-full flex-col justify-center sm:px-6 lg:px-8">
			<div className="sm:mx-auto sm:w-full sm:max-w-md">
				<h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
					Account details
				</h2>
			</div>

			<div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md">
				<div className="bg-white py-4 px-4 shadow sm:rounded-lg sm:px-10">
					<div className="flex items-center justify-center bg-grey-lighter">
						<label className="w-full flex flex-col items-center px-4 py-6 bg-white sm:rounded-lg sm:px-10 tracking-wide uppercase cursor-pointer hover:bg-blue hover:text-slate-400">
							{globalUserState.avatar.img ? (
								<div className="rounded-full w-[150px] h-[150px] overflow-hidden hover:opacity-90">
									<Image
										quality={50}
										src={globalUserState.avatar.img || "/avatar_placeholder.png"}
										alt="Profile Picture"
										width={150}
										height={150}
									/>
								</div>
							) : (
								<svg
									className="w-8 h-8"
									fill="currentColor"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 20 20"
								>
									<path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
								</svg>
							)}
							<span className="mt-2 text-base leading-normal">
								Select a profile image
							</span>
							<input
								accept="image/jpg"
								type="file"
								className="hidden"
								onChange={handleFileRead}
							/>
						</label>
					</div>
					<div className="space-y-6">
						<div>
							<label
								htmlFor="username"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Username
							</label>
							<div className="mt-2">
								<input
									onChange={(e) => {
										globalUserState.setUserName(
											e.currentTarget.value
										);
									}}
									value={globalUserState.userName}
									type="text"
									required
									className="block pl-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>

						<div>
							<label
								htmlFor="email"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								E-mail
							</label>
							<div className="mt-2">
								<input
									onChange={(e) => {
										globalUserState.setEmail(
											e.currentTarget.value
										);
									}}
									value={globalUserState.email}
									id="email"
									name="email"
									type="email"
									autoComplete="email"
									required
									className="block pl-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>

						<div>
							<label
								htmlFor="password"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Password
							</label>
							<div className="mt-2">
								<input
									id="password"
									name="password"
									type="password"
									autoComplete="current-password"
									required
									className="block pl-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>

						<div>
							<button
								onClick={() => updateProfileInfo({ userState: globalUserState, supabaseClient })}
								type="submit"
								className="flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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
