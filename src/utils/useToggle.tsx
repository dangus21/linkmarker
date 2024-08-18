import type React from "react";
import { useMemo } from "react";

function useToggle() {
	const renderToggle = useMemo(() => {
		return (
			component: React.ReactElement,
			props?: {
				toggle?: string | boolean | undefined;
				exceptions?: boolean[];
			},
		) => {
			if (
				props?.exceptions &&
				props?.exceptions.length > 0 &&
				props?.exceptions.every(Boolean)
			) {
				return component;
			}

			if (props?.toggle === "off" || props?.toggle === false) {
				return null;
			}

			return component;
		};
	}, []); // Empty dependency array as this function never needs to change

	return { renderToggle };
}

export { useToggle };
