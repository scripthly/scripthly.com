import type { Hono } from "hono";
import { mountRouter, registerRoute } from "../../util/route-tracker.util.ts";
import { getHealth } from "./health.ts";
import robloxRoutes from "./roblox/index.ts";

/**
 * Mounts every `/api/*` route on the root app.
 * @param app Root Hono app.
 */
export function mountApiRoutes(app: Hono) {
	registerRoute(app, "get", "/api/health", getHealth);
	mountRouter(app, "/api/roblox", robloxRoutes);
}
