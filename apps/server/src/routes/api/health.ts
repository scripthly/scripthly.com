import type { Context } from "hono";

/**
 * Liveness probe for the container healthcheck.
 * @param c Hono request context.
 * @returns `{ status: "ok" }`.
 */
export function getHealth(c: Context) {
	return c.json({ status: "ok" });
}
