import { Box, Paper, Typography } from "@mui/material";
import SmartLink from "../../../components/smart-link";
import type { Project } from "../../../content/profile";
import StackList from "./stack-list";

type ProjectCardProps = {
	project: Project;
	mark?: React.ReactNode;
	children?: React.ReactNode;
};

/**
 * Project logo, or its icon or first letter in a neutral circle when it has no logo.
 * @param project Project to draw the mark for.
 * @returns 44px mark.
 */
function ProjectMark({ project }: Pick<ProjectCardProps, "project">) {
	if (project.logo) {
		return <Box component="img" src={project.logo} alt="" width={44} height={44} sx={{ flexShrink: 0, objectFit: "cover", borderRadius: "50%" }} />;
	}

	const Icon = project.icon;

	return (
		<Box
			aria-hidden
			sx={{
				display: "grid",
				placeItems: "center",
				flexShrink: 0,
				width: 44,
				height: 44,
				borderRadius: "50%",
				bgcolor: "action.selected",
				color: "text.secondary",
				fontWeight: 600,
			}}
		>
			{Icon ? <Icon size={20} /> : project.name.charAt(0)}
		</Box>
	);
}

/**
 * One project in the work grid; the whole card is clickable when the project has a link.
 * @param project Project to show.
 * @param mark Replaces the project's logo in the header.
 * @param children Extra content shown under the summary.
 * @returns List item card.
 */
function ProjectCard({ project, mark, children }: ProjectCardProps) {
	return (
		<Paper
			component="li"
			sx={{
				position: "relative",
				display: "flex",
				flexDirection: "column",
				p: 2.5,
				transition: "border-color 0.2s ease",
				...(project.href ? { "&:hover": { borderColor: "text.secondary" } } : {}),
			}}
		>
			<Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
				{mark ?? <ProjectMark project={project} />}

				<Box sx={{ minWidth: 0 }}>
					<Typography variant="h3">
						{project.href ? (
							<SmartLink href={project.href} color="inherit" underline="none" sx={{ "&::after": { content: '""', position: "absolute", inset: 0 } }}>
								{project.name}
							</SmartLink>
						) : (
							project.name
						)}
					</Typography>

					<Typography variant="meta" color="text.secondary">
						{project.period}
					</Typography>
				</Box>
			</Box>

			<Typography variant="body2" sx={{ mt: 2 }}>
				{project.summary}
			</Typography>

			{children ? <Box sx={{ mt: 2 }}>{children}</Box> : null}

			<Box sx={{ mt: "auto", pt: 2 }}>
				<Typography variant="body2" color="text.secondary">
					{project.role}
				</Typography>

				<StackList items={project.stack} />
			</Box>
		</Paper>
	);
}

export default ProjectCard;
