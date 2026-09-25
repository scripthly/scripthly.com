import { Box, Typography } from "@mui/material";
import Section from "../../../components/section";
import TechLabel from "../../../components/tech-label";
import { SKILL_GROUPS, techInGroup } from "../../../content/tech";

/**
 * Every technology from the registry in short columns by area, each beside its logo.
 * @returns Skills section.
 */
function SkillsSection() {
	return (
		<Section id="skills" title="Skills & tools" description="What I reach for day to day.">
			<Box
				sx={{
					display: "grid",
					gridTemplateColumns: { xs: "repeat(2, minmax(0, 1fr))", sm: "repeat(3, minmax(0, 1fr))", lg: "repeat(6, minmax(0, 1fr))" },
					gap: { xs: 3, md: 4 },
				}}
			>
				{SKILL_GROUPS.map((group) => (
					<Box key={group}>
						<Typography variant="body2" component="h3" color="text.secondary" sx={{ fontWeight: 500 }}>
							{group}
						</Typography>

						<Box component="ul" sx={{ display: "grid", rowGap: 1.25, m: 0, mt: 1.5, p: 0, listStyle: "none" }}>
							{techInGroup(group).map((item) => (
								<Typography key={item} component="li" variant="body2" sx={{ fontWeight: 500, minWidth: 0 }}>
									<TechLabel name={item} />
								</Typography>
							))}
						</Box>
					</Box>
				))}
			</Box>
		</Section>
	);
}

export default SkillsSection;
