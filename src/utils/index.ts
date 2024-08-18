import type { TLink } from "@/state";
import type { AuthUser } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

const ONE_MB_SIZE = 1048576;

const REACTIONS = {
	heart: "❤️",
	laughing: "😂",
	surprise: "😲",
	crying: "😭",
	angry: "😠",
	claping: "👏",
	vomit: "🤮",
} as const;

function isLink(url: string): boolean {
	if (!url) {
		return false;
	}
	const linkRegEx = url.match(
		/[(http(s)?)://(www.)?a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//]*)/,
	);

	return !!linkRegEx;
}

function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(" ");
}

const dateFormatter = new Intl.DateTimeFormat("pt-PT");

function useViewport() {
	const [width, setWidth] = useState(window.innerWidth);
	// Add a second state variable "height" and default it to the current window height
	const [height, setHeight] = useState(window.innerHeight);

	useEffect(() => {
		const handleWindowResize = () => {
			setWidth(window.innerWidth);
			// Set the height in state as well as the width
			setHeight(window.innerHeight);
		};

		window.addEventListener("resize", handleWindowResize);
		return () => window.removeEventListener("resize", handleWindowResize);
	}, []);

	// Return both the height and width
	return { width, height };
}

function extractTopLevelDomain(url: URL) {
	// Regular expression to match the top-level domain
	const topLevelDomainRegex = /(?:https?:\/\/)?(?:www\.)?([^.]+\.[a-z]+)/i;

	// Use the regex to extract the top-level domain
	const match = url.href.match(topLevelDomainRegex);

	if (match) {
		return match[1].split(".")[0]; // Extract the top-level domain
	}
	return null; // Return null if no top-level domain is found
}

function normalizeLinkTitle(param: string): string {
	return param
		.toLowerCase()
		.normalize("NFD")
		.replace(/\p{Diacritic}/gu, "");
}

function getLinkValues(
	user: AuthUser | null,
	link: Partial<TLink>,
	links: Partial<TLink>[],
) {
	const canDeleteLink =
		(user?.id === link.by || (user?.id !== link.id && link.is_deletable)) ??
		false;

	const userIsOwner = user?.id === link.by;

	const isLinkBeingEdited =
		links.filter((currentLink) => currentLink.id === link.id).length > 0;

	return {
		canDeleteLink,
		userIsOwner,
		isLinkBeingEdited,
	};
}

function parseEnvToggles(toggle: "off" | "on"): boolean {
	if (toggle === "off") {
		return false;
	}
	if (toggle === "on") {
		return true;
	}
	return false;
}

export {
	ONE_MB_SIZE,
	REACTIONS,
	dateFormatter,
	isLink,
	classNames,
	useViewport,
	extractTopLevelDomain,
	normalizeLinkTitle,
	getLinkValues,
	parseEnvToggles,
};
