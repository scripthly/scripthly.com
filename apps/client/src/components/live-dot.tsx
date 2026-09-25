import { Box } from "@mui/material";

type LiveDotProps = {
	active: boolean;
};

/**
 * Status dot for a live count: pulsing green while anyone is online, grey otherwise.
 * @param active Whether the count is above zero.
 * @returns Decorative dot.
 */
function LiveDot({ active }: LiveDotProps) {
	return (
		<Box
			component="span"
			aria-hidden
			sx={{
				display: "inline-block",
				flexShrink: 0,
				width: 8,
				height: 8,
				borderRadius: "50%",
				bgcolor: active ? "success.main" : "text.disabled",
				animation: active ? "live-pulse 2s ease-out infinite" : "none",
			}}
		/>
	);
}

export default LiveDot;
