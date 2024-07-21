import type { TLink } from "@/state";

type TLinkLocal = {
	key: string;
	virtualRow: TLink;
	openOrArchiveLinkFn: (
		status: boolean,
		op: "opened" | "archived",
	) => Promise<void>;
	left: React.ReactNode;
	right: JSX.Element;
};

function Link(props: TLinkLocal) {
	return (
		<li key={props.key} className="flex justify-between hover:bg-gray-800">
			<a
				target="_blank"
				href={props.virtualRow.url!}
				onMouseDown={() => props.openOrArchiveLinkFn(true, "opened")}
				className="w-full cursor-pointer px-6 py-2"
				rel="noreferrer"
			>
				{props.left}
			</a>
			<div data-id="link_actions" className="flex flex-col sm:flex-row">
				{props.right}
			</div>
		</li>
	);
}

export { Link };
