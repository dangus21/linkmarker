const ONE_MB_SIZE = 1048576;

const REACTIONS = {
	heart: "❤️",
	laughing: "😂",
	surprise: "😲",
	crying: "😭",
	angry: "😠",
	claping: "👏",
	vomit: "🤮"
} as const;

function isLink(url: string) {
	const linkRegEx = url.match(/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//]*)/);

	return !!linkRegEx;
}

export { ONE_MB_SIZE, REACTIONS, isLink };
