import { createTheme } from "@mui/material/styles";
import type {} from "@mui/material/themeCssVarsAugmentation";
import { components } from "./components";
import { darkPalette, lightPalette } from "./palette";
import { typography } from "./typography";

const theme = createTheme({
	cssVariables: {
		colorSchemeSelector: "class",
		nativeColor: true,
	},
	colorSchemes: {
		light: { palette: lightPalette },
		dark: { palette: darkPalette },
	},
	defaultColorScheme: "dark",
	shape: {
		borderRadius: 10,
	},
	typography,
	components,
});

export default theme;
