// ? Applies a saved light theme before first paint, from a file so the CSP can keep script-src 'self'.
try {
	if (localStorage.getItem("mui-mode") === "light") document.documentElement.classList.add("light");
} catch {
	// ? Storage can be blocked, which leaves the dark default.
}
