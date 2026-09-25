import { Box, Link } from "@mui/material";
import { Link as RouterLink, NavLink } from "react-router";
import { PROFILE } from "../content/profile";
import PageContainer from "./page-container";
import ThemeToggle from "./theme-toggle";

type NavItemProps = {
	to: string;
	children: React.ReactNode;
};

/**
 * Header navigation link; NavLink marks the current page with `aria-current`.
 * @param to Route path.
 * @param children Link label.
 * @returns Nav link element.
 */
function NavItem({ to, children }: NavItemProps) {
	return (
		<Link
			component={NavLink}
			to={to}
			end
			underline="none"
			sx={{
				px: 1.25,
				py: 0.75,
				borderRadius: 1,
				fontSize: "0.9375rem",
				fontWeight: 500,
				color: "text.secondary",
				transition: "color 0.15s ease",
				"&:hover": { color: "text.primary" },
				"&[aria-current='page']": { color: "text.primary" },
			}}
		>
			{children}
		</Link>
	);
}

/**
 * Site header with the handle and primary navigation.
 * @returns Header element.
 */
function SiteHeader() {
	return (
		<Box component="header" sx={{ borderBottom: 1, borderColor: "divider" }}>
			<PageContainer sx={{ display: "flex", alignItems: "center", gap: 1, height: 64 }}>
				<Link
					component={RouterLink}
					to="/"
					underline="none"
					color="text.primary"
					sx={{ display: "inline-flex", alignItems: "center", gap: 1.25, fontWeight: 600, letterSpacing: "-0.01em", borderRadius: 1 }}
				>
					<Box component="img" src="/images/logo.png" alt="" width={28} height={28} sx={{ borderRadius: "50%" }} />

					{PROFILE.handle}
				</Link>

				<Box component="nav" aria-label="Main" sx={{ ml: "auto", display: "flex", gap: 0.5 }}>
					<NavItem to="/">About</NavItem>
					<NavItem to="/games">Games</NavItem>
				</Box>

				<Box sx={{ mr: -1 }}>
					<ThemeToggle />
				</Box>
			</PageContainer>
		</Box>
	);
}

export default SiteHeader;
