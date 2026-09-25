import { Box, IconButton, Stack, Typography } from "@mui/material";
import { PROFILE, SOCIAL_LINKS } from "../content/profile";
import PageContainer from "./page-container";

/**
 * Site footer with copyright and social links.
 * @returns Footer element.
 */
function SiteFooter() {
	return (
		<Box component="footer" sx={{ mt: { xs: 4, md: 6 }, borderTop: 1, borderColor: "divider" }}>
			<PageContainer sx={{ py: 3, display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 2 }}>
				<Typography variant="meta" color="text.secondary">
					© {new Date().getFullYear()} {PROFILE.name}
				</Typography>

				<Stack component="ul" direction="row" spacing={0.5} sx={{ m: 0, p: 0, listStyle: "none", mr: -1 }}>
					{SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
						<li key={label}>
							<IconButton
								component="a"
								href={href}
								target={href.startsWith("mailto:") ? undefined : "_blank"}
								rel="noopener noreferrer"
								aria-label={label}
								title={label}
								sx={{ color: "text.secondary", "&:hover": { color: "text.primary" } }}
							>
								<Icon size={18} />
							</IconButton>
						</li>
					))}
				</Stack>
			</PageContainer>
		</Box>
	);
}

export default SiteFooter;
