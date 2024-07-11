function useToggle() {
	return ({
		toggle,
		component,
		exceptions,
		additionalToggles,
	}: {
		toggle: string | undefined;
		component: React.ReactElement;
		exceptions?: boolean[];
		additionalToggles?: boolean[];
	}) => {
		let Component: React.ReactElement;

		if (exceptions && exceptions.length > 0 && exceptions.every(Boolean)) {
			Component = component;
			return Component;
		}

		if (toggle === "off") {
			return null;
		}

		if (
			additionalToggles &&
			additionalToggles.length > 0 &&
			additionalToggles?.every(Boolean)
		) {
			Component = component;
			return Component;
		}

		if (!additionalToggles) {
			Component = component;
			return Component;
		}
	};
}

export { useToggle };
