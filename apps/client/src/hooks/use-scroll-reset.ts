import { useEffect } from "react";
import { useLocation } from "react-router";

/**
 * Scrolls to the top when the route changes, unless the URL targets an in-page anchor.
 */
export function useScrollReset() {
	const { pathname, hash } = useLocation();

	useEffect(() => {
		if (!hash) window.scrollTo(0, 0);
	}, [pathname, hash]);
}
