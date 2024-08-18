import type React from "react";

function useToggle() {
	function renderToggle(
		component: React.ReactElement,
		props?: {
			toggle?: boolean;
			exceptions?: boolean[];
			debug?: boolean;
			id?: string;
		},
	) {
		if (
			props?.exceptions &&
			props?.exceptions.length > 0 &&
			props?.exceptions.every(Boolean)
		) {
			return component;
		}

		if (!props?.toggle) {
			return null;
		}

		return component;
	}
	return { renderToggle };
}

export { useToggle };
