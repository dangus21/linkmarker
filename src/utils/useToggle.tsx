function useToggle() {
	return (
		component: React.ReactElement,
		{
			toggle,
			exceptions,
			additionalToggles,
		}: {
			toggle: string | boolean | undefined;
			exceptions?: boolean[];
			additionalToggles?: boolean[];
		},
	) => {
		let Component: React.ReactElement;

		if (exceptions && exceptions.length > 0 && exceptions.every(Boolean)) {
			Component = component;
			return Component;
		}

		if (toggle === "off" || toggle === false) {
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
