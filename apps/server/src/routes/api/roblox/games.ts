import type { Context } from "hono";
import { getRobloxGameStats } from "../../../services/roblox-stats.service.ts";
import logging, { formatError } from "../../../util/logging.util.ts";

/**
 * Live visit, favourite and player counts for every portfolio game.
 * @param c Hono request context.
 * @returns Stats payload, or 502 when Roblox is unreachable and nothing is cached.
 */
export async function getGames(c: Context) {
	try {
		const stats = await getRobloxGameStats();

		c.header("Cache-Control", "public, max-age=60");
		return c.json(stats);
	} catch (error) {
		logging.error("Roblox", `Failed to fetch game stats: ${formatError(error)}`);
		return c.json({ error: "Failed to fetch Roblox game stats" }, 502);
	}
}
