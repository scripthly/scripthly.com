import { useEffect } from "react";

const SITE_NAME = "scripthly";

/**
 * Sets `document.title` to the page title followed by the site name.
 * @param pageTitle Page-specific title shown before the site name.
 */
export function usePageTitle(pageTitle: string) {
	useEffect(() => {
		document.title = `${pageTitle} · ${SITE_NAME}`;
	}, [pageTitle]);
}
