import type { TLink } from "@/state";

type TLinkLocal = {
	key: string;
	id: string;
	virtualRow: TLink;
	openOrArchiveLinkFn?: (
		status: boolean,
		op: "opened" | "archived",
	) => Promise<void>;
	left: React.ReactNode;
	right: JSX.Element;
};

function Link(props: TLinkLocal) {
	const Element = props.openOrArchiveLinkFn ? "a" : "div";
	return (
		<li key={props.key} className="flex justify-between hover:bg-gray-800">
			<Element
				{...(Element === "a"
					? {
							href: props.virtualRow.url!,
							target: "_blank",
							rel: "noreferrer",
						}
					: {})}
				onMouseDown={() => props.openOrArchiveLinkFn?.(true, "opened")}
				className="w-full cursor-pointer px-6 py-2"
			>
				{props.left}
			</Element>
			<div data-id="link_actions" className="flex flex-col sm:flex-row">
				{props.right}
			</div>
		</li>
	);
}

export { Link };
