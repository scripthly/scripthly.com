import { Container, type SxProps, type Theme } from "@mui/material";
import { CONTENT_MAX_WIDTH } from "../theme/layout";

type PageContainerProps = {
	children: React.ReactNode;
	sx?: SxProps<Theme>;
};

/**
 * Centred column with the site's max width and side gutters.
 * @param children Content to constrain.
 * @param sx Extra styles merged onto the container.
 * @returns Container element.
 */
function PageContainer({ children, sx }: PageContainerProps) {
	return (
		<Container maxWidth={false} sx={[{ maxWidth: CONTENT_MAX_WIDTH }, ...(Array.isArray(sx) ? sx : [sx])]}>
			{children}
		</Container>
	);
}

export default PageContainer;
