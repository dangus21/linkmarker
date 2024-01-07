import { useUserGlobalState } from "@/state";
import { ONE_MB_SIZE } from "@/utils";
import Image from "next/image";
import { ChangeEvent } from "react";

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
					fileName: file.name,
				});
				globalUserState.setModified(true);
			}
		}
	}

	return (
		<div className="bg-grey-lighter flex items-center justify-center">
			<label className="hover:bg-blue flex w-full cursor-pointer flex-col items-center px-4 py-6 uppercase tracking-wide hover:text-slate-400 sm:rounded-lg sm:px-10">
				{globalUserState.avatar.img ? (
					<div className="overflow-hidden rounded-full hover:opacity-70">
						<Image
							className="aspect-square h-[150px] w-[150px]"
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
							className="h-8 w-8"
							fill="currentColor"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20"
						>
							<title>Profile pic</title>
							<path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
						</svg>
						<span className="mt-2 text-base leading-normal text-gray-300">
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
}

export { ProfileImage };
