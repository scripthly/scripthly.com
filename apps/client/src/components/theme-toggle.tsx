import { IconButton } from "@mui/material";
import { useColorScheme } from "@mui/material/styles";
import { LuMoon, LuSun } from "react-icons/lu";

/**
 * Switches between the light and dark themes; MUI remembers the choice in local storage.
 * @returns Icon button, or nothing until the saved mode is known.
 */
function ThemeToggle() {
	const { mode, setMode } = useColorScheme();

	if (!mode) return null;

	const isDark = mode === "dark";
	const label = isDark ? "Switch to light theme" : "Switch to dark theme";

	return (
		<IconButton onClick={() => setMode(isDark ? "light" : "dark")} aria-label={label} title={label} sx={{ color: "text.secondary", "&:hover": { color: "text.primary" } }}>
			{isDark ? <LuSun size={18} /> : <LuMoon size={18} />}
		</IconButton>
	);
}

export default ThemeToggle;
