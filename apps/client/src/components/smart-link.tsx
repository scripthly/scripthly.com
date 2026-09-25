import { Link, type LinkProps } from "@mui/material";
import { LuArrowRight, LuArrowUpRight } from "react-icons/lu";
import { Link as RouterLink } from "react-router";

type SmartLinkProps = Omit<LinkProps, "href"> & {
	href: string;
};

/**
 * Link that routes in-app for `/` paths and opens external URLs in a new tab, each with a matching arrow.
 * @param href Internal path or absolute URL.
 * @returns Anchor element.
 */
function SmartLink({ href, children, sx, ...props }: SmartLinkProps) {
	const linkSx = [{ display: "inline-flex", alignItems: "center", gap: 0.5 }, ...(Array.isArray(sx) ? sx : [sx])];

	if (href.startsWith("/")) {
		return (
			<Link component={RouterLink} to={href} sx={linkSx} {...props}>
				{children}

				<LuArrowRight aria-hidden size="0.95em" />
			</Link>
		);
	}

	return (
		<Link href={href} target="_blank" rel="noopener noreferrer" sx={linkSx} {...props}>
			{children}

			<LuArrowUpRight aria-hidden size="0.95em" />
		</Link>
	);
}

export default SmartLink;
