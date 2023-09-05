import { Input } from "@/components/input";
import { useUserGlobalState } from "@/state";

function ProfileUsername() {
	const globalUserState = useUserGlobalState();

	return (
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
	);
}

export { ProfileUsername };
