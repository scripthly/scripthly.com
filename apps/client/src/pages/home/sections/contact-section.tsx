import { Box, Button, Stack, Typography } from "@mui/material";
import { LuMail } from "react-icons/lu";
import { PROFILE, SOCIAL_LINKS } from "../../../content/profile";

/**
 * Closing panel with the email address and profile links.
 * @returns Contact section.
 */
function ContactSection() {
	return (
		<Box
			component="section"
			id="contact"
			aria-labelledby="contact-title"
			sx={{
				display: "grid",
				gridTemplateColumns: { xs: "minmax(0, 1fr)", md: "minmax(0, 1fr) auto" },
				gap: 3,
				alignItems: "center",
				my: { xs: 5, md: 7 },
				p: { xs: 3, md: 5 },
				borderRadius: 4,
				border: 1,
				borderColor: (theme) => theme.alpha(theme.vars.palette.primary.main, 0.25),
				bgcolor: (theme) => theme.alpha(theme.vars.palette.primary.main, 0.07),
			}}
		>
			<Box>
				<Typography variant="h2" id="contact-title">
					Get in touch
				</Typography>

				<Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
					For work enquiries, email me. Phone number available on request.
				</Typography>
			</Box>

			<Stack spacing={1.5} sx={{ alignItems: { xs: "flex-start", md: "flex-end" } }}>
				<Button variant="contained" href={`mailto:${PROFILE.email}`} startIcon={<LuMail aria-hidden />}>
					{PROFILE.email}
				</Button>

				<Stack direction="row" useFlexGap sx={{ flexWrap: "wrap", gap: 1 }}>
					{SOCIAL_LINKS.filter((link) => !link.href.startsWith("mailto:")).map(({ label, href, icon: Icon }) => (
						<Button key={label} variant="outlined" href={href} target="_blank" rel="noopener noreferrer" startIcon={<Icon aria-hidden size={16} />}>
							{label}
						</Button>
					))}
				</Stack>
			</Stack>
		</Box>
	);
}

export default ContactSection;
