import { Input } from "@/components/input";
import { useLinkGlobalState } from "@/state";

function NewLinkTitle({ markLink }: { markLink: () => void }) {
	const globalLinkState = useLinkGlobalState();

	return (
		<div className="relative">
			<label
				htmlFor="name"
				className="absolute -top-6 left-2 inline-block px-1 text-xs font-medium text-gray-300"
			>
				Title
			</label>
			<Input
				id="title"
				placeHolder="How the link will display"
				value={globalLinkState.new.title || ""}
				onChange={(event) =>
					globalLinkState.create({
						title: event.currentTarget.value
					})
				}
				onKeyDown={(key) => {
					if (key.code === "Enter") {
						markLink();
					}
				}}
			/>
		</div>
	);
}

export { NewLinkTitle };
