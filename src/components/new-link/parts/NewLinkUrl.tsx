import { Input } from "@/components/input";
import { useLinkGlobalState } from "@/state";

function NewLinkUrl() {
	const globalLinkState = useLinkGlobalState();

	return (
		<div className="relative">
			<label
				htmlFor="name"
				className="absolute -top-6 left-2 inline-block px-1 text-xs font-medium text-gray-300"
			>
				Url
			</label>
			<Input
				id="url"
				placeHolder="https://www.tiktok.com/@tiktok"
				value={globalLinkState.new.origin || ""}
				onChange={(event) => globalLinkState.create({
					origin: event.currentTarget.value
				})}
			/>
		</div>
	);
};

export { NewLinkUrl };