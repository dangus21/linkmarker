type Toggle = Record<
	keyof typeof TOGGLE_OPTIONS,
	(typeof TOGGLE_STATE)[keyof typeof TOGGLE_STATE]
>;

const TOGGLE_STATE = {
	ON: "on",
	OFF: "off",
} as const;

const TOGGLE_OPTIONS = {
	ARCHIVE: "ARCHIVE",
	SEEN: "SEEN",
	REACTIONS: "REACTIONS",
	DELETE: "DELETE",
} as const;

const TOGGLES: Toggle = {
	ARCHIVE: "on",
	SEEN: "off",
	REACTIONS: "off",
	DELETE: "on",
};

function useToggle() {
	return (
		toggle: keyof typeof TOGGLE_OPTIONS,
		Component: React.ReactElement,
		additionalToggles?: [boolean],
	) => {
		if (TOGGLES[toggle] === "off") {
			return null;
		}

		if (
			additionalToggles &&
			additionalToggles.length > 0 &&
			additionalToggles?.every(Boolean)
		) {
			return Component;
		}

		if (!additionalToggles) {
			return Component;
		}
	};
}

export { useToggle };
