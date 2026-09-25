import { Button, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router";
import PageHeader from "../../components/page-header";
import { usePageTitle } from "../../hooks/use-page-title";

/**
 * Fallback for unknown routes with a way back home.
 * @returns 404 page.
 */
function NotFoundPage() {
	usePageTitle("Page not found");

	return (
		<PageHeader title="Page not found">
			<Typography variant="body1" color="text.secondary">
				There is nothing at this address. The link may be wrong, or the page may have moved.
			</Typography>

			<Button variant="contained" component={RouterLink} to="/" sx={{ mt: 4 }}>
				Back to the home page
			</Button>
		</PageHeader>
	);
}

export default NotFoundPage;
