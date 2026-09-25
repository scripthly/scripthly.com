import { Box } from "@mui/material";
import TechIcon from "../../../components/tech-icon";
import type { TechName } from "../../../content/tech";

type StackListProps = {
	items: TechName[];
};

/**
 * A project's tech stack as a row of logos; each names itself on hover and to screen readers.
 * @param items Technologies to list.
 * @returns Unordered list.
 */
function StackList({ items }: StackListProps) {
	return (
		<Box
			component="ul"
			aria-label="Built with"
			sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 1.5, m: 0, mt: 1.25, p: 0, listStyle: "none", fontSize: "1.125rem", lineHeight: 1.25 }}
		>
			{items.map((item) => (
				<Box key={item} component="li" sx={{ display: "flex" }}>
					<TechIcon name={item} labelled />
				</Box>
			))}
		</Box>
	);
}

export default StackList;
