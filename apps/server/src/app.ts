import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { serveStatic } from "@hono/node-server/serve-static";
import { type Context, Hono, type Next } from "hono";
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

/**
 * Marks images as cross-origin so other sites can embed them.
 * @param c Hono request context.
 * @param next Next handler in the chain.
 */
async function allowImageEmbeds(c: Context, next: Next) {
	await next();
	c.header("Cross-Origin-Resource-Policy", "cross-origin");
	c.header("Access-Control-Allow-Origin", "*");
}

/**
 * Sets a static file's cache lifetime: a year for hashed assets, a day for other files and revalidation for HTML.
 * @param path File path on disk.
 * @param c Hono request context.
 */
function setCacheHeaders(path: string, c: Context) {
	c.header("Cache-Control", path.endsWith(".html") ? CACHE_REVALIDATE : path.includes("/assets/") ? CACHE_IMMUTABLE : CACHE_PUBLIC);
}

/**
 * Answers unmatched paths with a JSON 404 for the API, a plain 404 for missing files, or the app shell for client routes.
 * @param c Hono request context.
 * @returns 404 response or the index page.
 */
function handleNotFound(c: Context) {
	if (c.req.path.startsWith("/api/")) {
		return c.json({ error: "Not found" }, 404);
	}

	if (!indexHtml || STATIC_ASSET_EXT.test(c.req.path)) {
		return c.text("Not found", 404);
	}

	c.header("Cache-Control", CACHE_REVALIDATE);
	return c.html(indexHtml);
}

/**
 * Logs an unhandled error and responds with a generic 500.
 * @param error Error thrown by a handler.
 * @param c Hono request context.
 * @returns JSON error response.
 */
function handleError(error: Error, c: Context) {
	logging.error("Server", `${c.req.method} ${c.req.path} failed: ${formatError(error)}`);
	return c.json({ error: "Internal server error" }, 500);
}

export const app = new Hono();

app.use(compress());

// ? Registered before secureHeaders so its cross-origin CORP wins for images other sites embed.
app.use("/images/*", allowImageEmbeds);

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
	app.use("/*", serveStatic({ root: CONFIG.CLIENT_DIST, onFound: setCacheHeaders }));
	logging.info("Server", `Serving client from ${CONFIG.CLIENT_DIST}`);
} else {
	logging.warn("Server", `No client build at ${CONFIG.CLIENT_DIST}, serving the API only`);
}

app.notFound(handleNotFound);
app.onError(handleError);
