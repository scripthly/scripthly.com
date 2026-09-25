import "@mui/material/styles";
import "@mui/material/Typography";

declare module "@mui/material/styles" {
	interface TypographyVariants {
		meta: React.CSSProperties;
	}

	interface TypographyVariantsOptions {
		meta?: React.CSSProperties;
	}
}

declare module "@mui/material/Typography" {
	interface TypographyPropsVariantOverrides {
		meta: true;
	}
}
