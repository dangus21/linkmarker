function useToggle() {
	return (
		toggle: string | undefined,
		Component: React.ReactElement,
		additionalToggles?: [boolean],
	) => {
		if (toggle === "off") {
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
