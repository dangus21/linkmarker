import { EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid";

function LinkTitle(
	{
		title,
		isPublic,
		shareWith
	}:
		{
			title: string;
			isPublic: boolean;
			shareWith: string[];
		}
) {
	const VisibilityIcon = isPublic ? EyeIcon : EyeSlashIcon;

	return (
		<div className="max-w-auto sm:max-w-full">
			<p className="text-sm font-medium text-gray-300">
				{title}
			</p>
			<span className="inline-flex items-center text-xs text-gray-500">
				<VisibilityIcon className="h-3.5 flex-shrink-0 text-gray-400 mr-1" />
				{isPublic ? "Public" : "Private"}
				{shareWith.length > 0 && "/Shared"}
			</span>
		</div>
	);
};

export { LinkTitle };