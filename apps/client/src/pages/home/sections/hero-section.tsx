import { Box, Button, Stack, Typography } from "@mui/material";
import { LuBriefcase, LuMail, LuMapPin } from "react-icons/lu";
import { SiGithub } from "react-icons/si";
import { PROFILE } from "../../../content/profile";

/**
 * Opening section: name, what I do and how to get in touch.
 * @returns Hero section.
 */
function HeroSection() {
	return (
		<Box component="section" aria-labelledby="hero-title" sx={{ maxWidth: 760, pt: { xs: 7, md: 12 }, pb: { xs: 3, md: 5 } }}>
			<Typography variant="h1" id="hero-title">
				{PROFILE.name}
			</Typography>

			<Typography variant="subtitle1" component="p" sx={{ mt: 3 }}>
				{PROFILE.headline}
			</Typography>

			<Typography variant="body1" color="text.secondary" sx={{ mt: 1.5 }}>
				{PROFILE.summary}
			</Typography>

			<Stack direction="row" useFlexGap sx={{ flexWrap: "wrap", gap: 1.5, mt: 4 }}>
				<Button variant="contained" href={`mailto:${PROFILE.email}`} startIcon={<LuMail aria-hidden />}>
					Email me
				</Button>

				<Button variant="outlined" href={PROFILE.github} target="_blank" rel="noopener noreferrer" startIcon={<SiGithub aria-hidden />}>
					GitHub
				</Button>
			</Stack>

			<Stack
				component="ul"
				direction="row"
				useFlexGap
				sx={{
					flexWrap: "wrap",
					columnGap: 3,
					rowGap: 1,
					m: 0,
					mt: 3,
					p: 0,
					listStyle: "none",
					color: "text.secondary",
					"& > li": { display: "flex", alignItems: "center", gap: 1 },
				}}
			>
				<Typography component="li" variant="body2">
					<LuMapPin aria-hidden />

					{PROFILE.location}
				</Typography>

				<Typography component="li" variant="body2">
					<LuBriefcase aria-hidden />

					{PROFILE.employment}
				</Typography>
			</Stack>
		</Box>
	);
}

export default HeroSection;
