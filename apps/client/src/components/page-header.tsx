import { Box, Typography } from "@mui/material";

type PageHeaderProps = {
	title: string;
	children?: React.ReactNode;
};

/**
 * Opening block for an inner page: the page's h1 and an optional intro.
 * @param title Page heading.
 * @param children Intro content under the heading.
 * @returns Header section.
 */
function PageHeader({ title, children }: PageHeaderProps) {
	return (
		<Box component="section" aria-labelledby="page-title" sx={{ pt: { xs: 6, md: 10 }, pb: { xs: 5, md: 7 }, maxWidth: 720 }}>
			<Typography variant="h1" id="page-title" sx={{ fontSize: "clamp(2.25rem, 5.5vw, 3.25rem)" }}>
				{title}
			</Typography>

			{children ? <Box sx={{ mt: 3 }}>{children}</Box> : null}
		</Box>
	);
}

export default PageHeader;
