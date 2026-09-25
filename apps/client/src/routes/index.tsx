import { Route, Routes } from "react-router";
import SiteLayout from "../components/site-layout";
import GamesPage from "../pages/games/games";
import HomePage from "../pages/home/home";
import NotFoundPage from "../pages/not-found/not-found";

/**
 * Route table: every page renders inside the shared site layout.
 * @returns Routes element.
 */
function AppRoutes() {
	return (
		<Routes>
			<Route element={<SiteLayout />}>
				<Route index element={<HomePage />} />
				<Route path="games" element={<GamesPage />} />
				<Route path="*" element={<NotFoundPage />} />
			</Route>
		</Routes>
	);
}

export default AppRoutes;
