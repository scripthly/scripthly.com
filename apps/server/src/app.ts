import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { serveStatic } from "@hono/node-server/serve-static";
import { Hono } from "hono";
import { compress } from "hono/compress";
import { secureHeaders } from "hono/secure-headers";
import { CONFIG } from "./config.ts";
import { mountApiRoutes } from "./routes/api/index.ts";
import logging, { formatError } from "./util/logging.util.ts";

const CACHE_IMMUTABLE = "public, max-age=31536000, immutable";
const CACHE_PUBLIC = "public, max-age=86400";
const CACHE_REVALIDATE = "no-cache";

/** Paths that look like files get a real 404 instead of the SPA shell. */
const STATIC_ASSET_EXT = /\.(?:avif|css|gif|ico|jpe?g|js|json|map|png|svg|txt|webp|woff2?|xml)$/i;

const indexPath = join(CONFIG.CLIENT_DIST, "index.html");
const indexHtml = existsSync(indexPath) ? await readFile(indexPath, "utf8") : null;

export const app = new Hono();

app.use(compress());

// ? Registered before secureHeaders so its cross-origin CORP wins for images other sites embed.
app.use("/images/*", async (c, next) => {
	await next();
	c.header("Cross-Origin-Resource-Policy", "cross-origin");
	c.header("Access-Control-Allow-Origin", "*");
});

app.use(
	secureHeaders({
		referrerPolicy: "strict-origin-when-cross-origin",
		contentSecurityPolicy: {
			defaultSrc: ["'self'"],
			baseUri: ["'self'"],
			connectSrc: ["'self'"],
			fontSrc: ["'self'"],
			formAction: ["'self'"],
			frameAncestors: ["'none'"],
			imgSrc: ["'self'", "data:"],
			objectSrc: ["'none'"],
			scriptSrc: ["'self'"],
			// ? Emotion injects the MUI styles as <style> tags at runtime.
			styleSrc: ["'self'", "'unsafe-inline'"],
		},
	}),
);

mountApiRoutes(app);

if (indexHtml) {
	app.use(
		"/*",
		serveStatic({
			root: CONFIG.CLIENT_DIST,
			onFound: (path, c) => {
				c.header("Cache-Control", path.endsWith(".html") ? CACHE_REVALIDATE : path.includes("/assets/") ? CACHE_IMMUTABLE : CACHE_PUBLIC);
			},
		}),
	);

	logging.info("Server", `Serving client from ${CONFIG.CLIENT_DIST}`);
} else {
	logging.warn("Server", `No client build at ${CONFIG.CLIENT_DIST}, serving the API only`);
}

app.notFound((c) => {
	if (c.req.path.startsWith("/api/")) {
		return c.json({ error: "Not found" }, 404);
	}

	if (!indexHtml || STATIC_ASSET_EXT.test(c.req.path)) {
		return c.text("Not found", 404);
	}

	c.header("Cache-Control", CACHE_REVALIDATE);
	return c.html(indexHtml);
});

app.onError((error, c) => {
	logging.error("Server", `${c.req.method} ${c.req.path} failed: ${formatError(error)}`);
	return c.json({ error: "Internal server error" }, 500);
});
