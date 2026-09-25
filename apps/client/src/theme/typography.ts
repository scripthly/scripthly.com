import type { TypographyVariantsOptions } from "@mui/material/styles";

export const SANS_FONT = '"Geist Variable", system-ui, -apple-system, "Segoe UI", sans-serif';

export const typography: TypographyVariantsOptions = {
	fontFamily: SANS_FONT,
	fontSize: 15,
	h1: {
		fontSize: "clamp(2.5rem, 7vw, 4.25rem)",
		fontWeight: 600,
		letterSpacing: "-0.04em",
		lineHeight: 1.02,
	},
	h2: {
		fontSize: "clamp(1.5rem, 3vw, 1.875rem)",
		fontWeight: 600,
		letterSpacing: "-0.03em",
		lineHeight: 1.2,
	},
	h3: {
		fontSize: "1.125rem",
		fontWeight: 600,
		letterSpacing: "-0.015em",
		lineHeight: 1.35,
	},
	subtitle1: {
		fontSize: "clamp(1.125rem, 2.4vw, 1.375rem)",
		fontWeight: 400,
		letterSpacing: "-0.015em",
		lineHeight: 1.45,
	},
	body1: {
		fontSize: "1rem",
		lineHeight: 1.7,
	},
	body2: {
		fontSize: "0.9375rem",
		lineHeight: 1.65,
	},
	button: {
		fontWeight: 500,
		letterSpacing: 0,
		textTransform: "none",
	},
	meta: {
		fontSize: "0.8125rem",
		fontWeight: 400,
		letterSpacing: 0,
		lineHeight: 1.6,
		fontVariantNumeric: "tabular-nums",
	},
};
