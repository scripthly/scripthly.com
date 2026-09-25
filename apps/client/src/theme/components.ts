import type { Components, Theme } from "@mui/material/styles";

export const components: Components<Theme> = {
	MuiCssBaseline: {
		styleOverrides: (theme: Theme) => ({
			body: {
				textRendering: "optimizeLegibility",
				WebkitFontSmoothing: "antialiased",
				MozOsxFontSmoothing: "grayscale",
			},
			"::selection": {
				backgroundColor: theme.alpha(theme.vars.palette.primary.main, 0.3),
			},
			":focus-visible": {
				outline: `2px solid ${theme.vars.palette.primary.main}`,
				outlineOffset: 2,
			},
			img: {
				display: "block",
				maxWidth: "100%",
			},
			"@keyframes live-pulse": {
				"0%": { boxShadow: `0 0 0 0 ${theme.alpha(theme.vars.palette.success.main, 0.5)}` },
				"70%": { boxShadow: `0 0 0 6px ${theme.alpha(theme.vars.palette.success.main, 0)}` },
				"100%": { boxShadow: `0 0 0 0 ${theme.alpha(theme.vars.palette.success.main, 0)}` },
			},
			"@media (prefers-reduced-motion: reduce)": {
				"*, *::before, *::after": {
					animationDuration: "0.01ms !important",
					animationIterationCount: "1 !important",
					transitionDuration: "0.01ms !important",
				},
			},
		}),
	},
	MuiButton: {
		defaultProps: {
			disableElevation: true,
		},
		styleOverrides: {
			root: {
				borderRadius: 8,
				minHeight: 40,
				paddingInline: 16,
			},
			outlined: ({ theme }) => ({
				borderColor: theme.vars.palette.divider,
				color: theme.vars.palette.text.primary,
				"&:hover": {
					borderColor: theme.vars.palette.text.secondary,
					backgroundColor: "transparent",
				},
			}),
		},
	},
	MuiLink: {
		defaultProps: {
			underline: "hover",
		},
		styleOverrides: {
			root: {
				textUnderlineOffset: 3,
			},
		},
	},
	MuiPaper: {
		defaultProps: {
			variant: "outlined",
		},
		styleOverrides: {
			root: {
				backgroundImage: "none",
			},
			outlined: ({ theme }) => ({
				borderColor: theme.vars.palette.divider,
				borderRadius: 14,
			}),
		},
	},
	MuiTypography: {
		defaultProps: {
			variantMapping: {
				meta: "p",
			},
		},
	},
};
