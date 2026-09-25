import { Box } from "@mui/material";
import { TECH, type Tech, type TechName } from "../content/tech";

type TechIconProps = {
	name: TechName;
	labelled?: boolean;
};

/**
 * A technology's logo in its brand colour, or the text colour for brands without one.
 * @param name Technology from the tech registry.
 * @param labelled Whether the logo stands alone and needs its own accessible name and hover title.
 * @returns Inline icon one line box tall.
 */
function TechIcon({ name, labelled = false }: TechIconProps) {
	const tech: Tech = TECH[name];
	const Icon = tech.icon;

	return (
		<Box
			component="span"
			{...(labelled ? { role: "img", "aria-label": name, title: name } : { "aria-hidden": true })}
			sx={(theme) => ({
				// ? One line box tall, so the logo lines up with the first line when a long name wraps.
				display: "inline-flex",
				alignItems: "center",
				height: "1lh",
				flexShrink: 0,
				color: tech.colorOnDark ?? tech.color ?? "inherit",
				...theme.applyStyles("light", { color: tech.colorOnLight ?? tech.color ?? "inherit" }),
			})}
		>
			<Icon size="1.15em" aria-hidden />
		</Box>
	);
}

export default TechIcon;
