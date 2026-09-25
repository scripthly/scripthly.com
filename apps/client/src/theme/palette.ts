import type { PaletteOptions } from "@mui/material/styles";

/** Sky blue brand accent; the light scheme uses a deeper shade for text contrast. */
export const BRAND_BLUE = "#77ccff";

export const darkPalette: PaletteOptions = {
	primary: {
		main: BRAND_BLUE,
		light: "#a8ddff",
		dark: "#4db3eb",
		contrastText: "#061018",
	},
	success: {
		main: "#4ade80",
	},
	background: {
		default: "#0a1019",
		paper: "#101926",
	},
	text: {
		primary: "#edf2f8",
		secondary: "#93a3b8",
		disabled: "#56657a",
	},
	divider: "rgba(147, 163, 184, 0.16)",
};

export const lightPalette: PaletteOptions = {
	primary: {
		main: "#0969a8",
		light: "#3a8fc7",
		dark: "#07548a",
		contrastText: "#ffffff",
	},
	success: {
		main: "#16a34a",
	},
	background: {
		default: "#fafaf9",
		paper: "#ffffff",
	},
	text: {
		primary: "#16181d",
		secondary: "#5d6470",
		disabled: "#a3a8b1",
	},
	divider: "rgba(22, 24, 29, 0.1)",
};
