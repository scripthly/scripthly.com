import { ROBLOX_GAMES, type RobloxGamesResponse, type RobloxGameStats } from "@scripthly/shared/roblox-games";
import { fetchUniverseId, fetchUniverses } from "../api/roblox.api.ts";
import logging, { formatError } from "../util/logging.util.ts";

const CACHE_TTL_MS = 60_000;
const RETRY_AFTER_FAILURE_MS = 30_000;

// ? A place never moves universe, so these are resolved once per process.
const universeIdByPlace = new Map<number, number>();

let cached: { value: RobloxGamesResponse; expiresAt: number } | null = null;
let inflight: Promise<RobloxGamesResponse> | null = null;

/**
 * Fetches fresh stats for every portfolio game from Roblox.
 * @returns Stats in portfolio order, skipping any game Roblox did not return.
 */
async function loadStats(): Promise<RobloxGamesResponse> {
	const placeIds = ROBLOX_GAMES.map((game) => game.placeId);

	await Promise.all(
		placeIds
			.filter((placeId) => !universeIdByPlace.has(placeId))
			.map(async (placeId) => {
				universeIdByPlace.set(placeId, await fetchUniverseId(placeId));
			}),
	);

	const universes = await fetchUniverses(placeIds.map((placeId) => universeIdByPlace.get(placeId)!));
	const universeById = new Map(universes.map((universe) => [universe.id, universe]));

	const games = placeIds.flatMap((placeId): RobloxGameStats[] => {
		const universe = universeById.get(universeIdByPlace.get(placeId)!);
		if (!universe) return [];

		return [{ placeId, visits: universe.visits, playing: universe.playing, favorites: universe.favoritedCount, createdAt: universe.created }];
	});

	return { games, updatedAt: new Date().toISOString() };
}

/**
 * Returns cached portfolio stats, refreshing them from Roblox once the cache expires.
 * @returns Latest stats, or the last good copy when Roblox is failing.
 */
export async function getRobloxGameStats(): Promise<RobloxGamesResponse> {
	if (cached && cached.expiresAt > Date.now()) return cached.value;

	inflight ??= loadStats()
		.then((value) => {
			cached = { value, expiresAt: Date.now() + CACHE_TTL_MS };
			return value;
		})
		.finally(() => {
			inflight = null;
		});

	try {
		return await inflight;
	} catch (error) {
		if (!cached) throw error;

		// ? Serve the stale copy and back off so an outage is not retried on every request.
		logging.warn("Roblox", `Refresh failed, serving stats from ${cached.value.updatedAt}: ${formatError(error)}`);
		cached.expiresAt = Date.now() + RETRY_AFTER_FAILURE_MS;
		return cached.value;
	}
}
