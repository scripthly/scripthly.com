import { serve } from "@hono/node-server";
import { app } from "./app.ts";
import { CONFIG } from "./config.ts";
import logging, { formatError } from "./util/logging.util.ts";
import { logRoutes } from "./util/route-tracker.util.ts";

process.on("unhandledRejection", (reason) => {
	logging.error("Server", `Unhandled rejection: ${formatError(reason)}`);
});

logRoutes();

const server = serve({ fetch: app.fetch, port: CONFIG.PORT }, (info) => {
	logging.info("Server", `Listening on http://localhost:${info.port} (${CONFIG.IS_DEV ? "development" : "production"})`);
});

/**
 * Stops accepting connections, then exits once open requests finish.
 * @param signal Signal that triggered the shutdown.
 */
function shutdown(signal: NodeJS.Signals) {
	logging.info("Server", `${signal} received, shutting down`);
	server.close(() => process.exit(0));
	setTimeout(() => process.exit(1), 5_000).unref();
}

process.once("SIGINT", shutdown);
process.once("SIGTERM", shutdown);
