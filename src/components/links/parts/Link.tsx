import type { TLink } from "@/state";

type TLinkLocal = {
	key: string;
	id: string;
	virtualRow: TLink;
	openOrArchiveLinkFn?: (
		link: TLink,
		op: "opened" | "archived",
		status: boolean
	) => Promise<void>;
	left: React.ReactNode;
	right: JSX.Element;
};

function Link(props: TLinkLocal) {
	const { id, left, right, virtualRow, openOrArchiveLinkFn } = props;
	const Element = openOrArchiveLinkFn ? "a" : "div";
	return (
		<li key={id} className="flex justify-between hover:bg-gray-800">
			<Element
				{...(Element === "a"
					? {
							href: virtualRow.url!,
							target: "_blank",
							rel: "noreferrer"
						}
					: {})}
				onMouseDown={() =>
					openOrArchiveLinkFn?.(virtualRow, "opened", true)
				}
				className="w-full cursor-pointer px-6 py-2"
			>
				{left}
			</Element>
			<div data-id="link_actions" className="flex flex-col lg:flex-row">
				{right}
			</div>
		</li>
	);
}

export { Link };
