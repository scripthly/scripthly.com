import { Box } from "@mui/material";
import type { TechName } from "../content/tech";
import TechIcon from "./tech-icon";

type TechLabelProps = {
	name: TechName;
};

/**
 * A technology's name with its logo beside it.
 * @param name Technology from the tech registry.
 * @returns Inline label.
 */
function TechLabel({ name }: TechLabelProps) {
	return (
		<Box component="span" sx={{ display: "inline-flex", alignItems: "flex-start", gap: 0.75 }}>
			<TechIcon name={name} />

			{name}
		</Box>
	);
}

export default TechLabel;
