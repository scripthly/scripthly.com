import { Box, Typography } from "@mui/material";

type SectionProps = {
	id: string;
	title: string;
	description?: string;
	children: React.ReactNode;
};

/**
 * Page section with a heading and optional one-line intro above its content.
 * @param id Anchor id; the heading gets `${id}-title`.
 * @param title Section heading.
 * @param description Short line under the heading.
 * @param children Section content.
 * @returns Section element.
 */
function Section({ id, title, description, children }: SectionProps) {
	return (
		<Box component="section" id={id} aria-labelledby={`${id}-title`} sx={{ py: { xs: 5, md: 6 } }}>
			<Box sx={{ mb: { xs: 3, md: 4 } }}>
				<Typography variant="h2" id={`${id}-title`}>
					{title}
				</Typography>

				{description ? (
					<Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
						{description}
					</Typography>
				) : null}
			</Box>

			{children}
		</Box>
	);
}

export default Section;
