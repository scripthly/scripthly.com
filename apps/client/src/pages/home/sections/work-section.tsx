import { Box } from "@mui/material";
import Section from "../../../components/section";
import { PROJECTS } from "../../../content/profile";
import ProjectCard from "../components/project-card";
import RobloxCard from "../components/roblox-card";

/**
 * Selected work as a grid of project cards, ending with a wide card for the Roblox games.
 * @returns Work section.
 */
function WorkSection() {
	return (
		<Section id="work" title="Selected work" description="Things I build and run, from Discord bots to Roblox games.">
			<Box
				component="ul"
				sx={{
					display: "grid",
					gridTemplateColumns: { xs: "minmax(0, 1fr)", sm: "repeat(2, minmax(0, 1fr))", md: "repeat(3, minmax(0, 1fr))" },
					gap: 2,
					m: 0,
					p: 0,
					listStyle: "none",
				}}
			>
				{PROJECTS.map((project) => (
					<ProjectCard key={project.name} project={project} />
				))}

				<RobloxCard />
			</Box>
		</Section>
	);
}

export default WorkSection;
