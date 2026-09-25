import { Box } from "@mui/material";
import { Outlet } from "react-router";
import { useScrollReset } from "../hooks/use-scroll-reset";
import PageContainer from "./page-container";
import SiteFooter from "./site-footer";
import SiteHeader from "./site-header";

/**
 * Shared shell for every route: a patterned backdrop behind the top of the page, header, content and footer.
 * @returns Layout element.
 */
function SiteLayout() {
	useScrollReset();

	return (
		<Box sx={{ position: "relative", isolation: "isolate", minHeight: "100dvh", display: "flex", flexDirection: "column" }}>
			<Box
				aria-hidden
				sx={(theme) => {
					const layers = (dots: number, tint: number) =>
						[
							`radial-gradient(circle at 1px 1px, ${theme.alpha(theme.vars.palette.text.primary, dots)} 1px, transparent 0)`,
							`radial-gradient(ellipse 60% 70% at 90% 0%, ${theme.alpha(theme.vars.palette.primary.main, tint)}, transparent 70%)`,
						].join(", ");

					return {
						position: "absolute",
						top: 0,
						left: 0,
						right: 0,
						zIndex: -1,
						height: { xs: 560, md: 700 },
						pointerEvents: "none",
						backgroundImage: layers(0.2, 0.24),
						backgroundSize: "22px 22px, 100% 100%",
						maskImage: "linear-gradient(to bottom, #000 30%, transparent)",
						...theme.applyStyles("light", { backgroundImage: layers(0.14, 0.16) }),
					};
				}}
			/>

			<SiteHeader />

			<Box component="main" sx={{ flex: 1 }}>
				<PageContainer>
					<Outlet />
				</PageContainer>
			</Box>

			<SiteFooter />
		</Box>
	);
}

export default SiteLayout;
