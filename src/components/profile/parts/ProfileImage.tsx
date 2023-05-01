import { ChangeEvent } from "react";
import { ONE_MB_SIZE } from "@/utils";
import { useUserGlobalState } from "@/state";
import Image from "next/image";

function ProfileImage() {
	const globalUserState = useUserGlobalState();

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
	);
};

export { ProfileImage };