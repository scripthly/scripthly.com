import { CssBaseline, ThemeProvider } from "@mui/material";
import { QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router";
import { queryClient } from "./lib/query-client";
import AppRoutes from "./routes";
import theme from "./theme";

/**
 * Root component: query cache, theme and router.
 * @returns App tree.
 */
function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider theme={theme} defaultMode="dark">
				<CssBaseline />

				<BrowserRouter>
					<AppRoutes />
				</BrowserRouter>
			</ThemeProvider>
		</QueryClientProvider>
	);
}

export default App;
