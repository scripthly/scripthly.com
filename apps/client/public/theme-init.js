// Applies a saved light theme before first paint. A file rather than an inline script so the CSP can stay script-src 'self'.
try {
	if (localStorage.getItem("mui-mode") === "light") document.documentElement.classList.add("light");
} catch {
	// Storage can be blocked; the site then stays on the dark default.
}
